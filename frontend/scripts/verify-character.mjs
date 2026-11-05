import fs from 'node:fs/promises'
import assert from 'node:assert/strict'
import { AnimationMixer, Box3, Vector3 } from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

const raw = await fs.readFile(new URL('../public/models/businesswoman.glb', import.meta.url))
assert.equal(raw.readUInt32LE(8), raw.length, 'GLB length')
assert.ok(raw.length < 5_000_000, 'under 5 MB')
const size = raw.readUInt32LE(12)
const json = JSON.parse(raw.subarray(20, 20 + size).toString())
const bin = raw.subarray(28 + size)
assert.equal(json.asset.extras.license, 'CC0-1.0')
assert.deepEqual(json.animations.map(a => a.name), ['Walk', 'Idle'])
assert.equal(json.skins[0].joints.length, 14)
// Parse geometry, skin and clips with the real runtime loader. Images are omitted
// for this Node check; actual texture decoding / appearance needs a GPU browser.
json.images = []
json.textures = []
json.materials = json.materials.map(() => ({ pbrMetallicRoughness: { roughnessFactor: .8 } }))
json.buffers[0].uri = 'data:application/octet-stream;base64,' + bin.toString('base64')
globalThis.ProgressEvent ??= class ProgressEvent { constructor(type, fields) { this.type = type; Object.assign(this, fields) } }
const gltf = await new GLTFLoader().parseAsync(JSON.stringify(json), '')
gltf.scene.updateMatrixWorld(true)
const size3 = new Box3().setFromObject(gltf.scene).getSize(new Vector3())
assert.ok(size3.y > 1.6 && size3.y < 1.8, 'human scale')
const mixer = new AnimationMixer(gltf.scene)
const walk = mixer.clipAction(gltf.animations[0]).play()
const shin = gltf.scene.getObjectByName('LeftShin')
const before = shin.quaternion.clone()
mixer.update(.8)
assert.ok(before.angleTo(shin.quaternion) > .1, 'Walk deforms the skeleton')
const idle = mixer.clipAction(gltf.animations[1]).play()
walk.crossFadeTo(idle, .45, false)
mixer.update(.5)
assert.ok(idle.getEffectiveWeight() > .99, 'crossfade reaches Idle')
gltf.scene.updateMatrixWorld(true)
let triangles = 0, vertices = 0, changedVertices = 0
gltf.scene.traverse(object => {
  if (!object.isSkinnedMesh) return
  object.skeleton.update()
  const weights = object.geometry.attributes.skinWeight
  const indices = object.geometry.attributes.skinIndex
  triangles += object.geometry.index.count / 3
  vertices += weights.count
  for (let i = 0; i < weights.count; i++) {
    assert.ok(Math.abs(weights.getX(i) + weights.getY(i) + weights.getZ(i) + weights.getW(i) - 1) < .00001)
    assert.ok(indices.getX(i) < 14 && indices.getY(i) < 14 && indices.getZ(i) < 14 && indices.getW(i) < 14)
    const rest = new Vector3().fromBufferAttribute(object.geometry.attributes.position, i)
    const skinned = object.applyBoneTransform(i, rest.clone())
    assert.ok(Number.isFinite(skinned.x + skinned.y + skinned.z), 'finite deformed geometry')
    if (skinned.distanceTo(rest) > .00001) changedVertices++
  }
})
assert.ok(triangles < 60_000)
assert.ok(changedVertices > 100, 'animation changes the actual skinned vertices')
console.log(`Character verified: ${triangles} triangles, ${vertices} weighted vertices, ${raw.length} bytes; loader / skin / Walk→Idle passed.`)
