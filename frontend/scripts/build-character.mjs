// Reproducible CC0 placeholder derivative. No Blender or additional packages required.
import fs from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { Matrix4, Quaternion, Euler } from 'three'

const source = fileURLToPath(new URL('../../assets/character/businesswoman-source.glb', import.meta.url))
const output = fileURLToPath(new URL('../public/models/businesswoman.glb', import.meta.url))
const data = await fs.readFile(source)
const jsonSize = data.readUInt32LE(12)
const gltf = JSON.parse(data.subarray(20, 20 + jsonSize).toString())
const bin = data.subarray(28 + jsonSize)
const chunks = []
let offset = 0
function view(bytes, target) {
  const padded = Buffer.alloc(Math.ceil(bytes.length / 4) * 4)
  Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength).copy(padded)
  const index = gltf.bufferViews.length
  gltf.bufferViews.push({ buffer: 0, byteOffset: offset, byteLength: bytes.length, ...(target ? { target } : {}) })
  chunks.push(padded)
  offset += padded.length
  return index
}
function accessor(array, type, componentType, bounds) {
  const index = gltf.accessors.length
  gltf.accessors.push({ bufferView: view(new Uint8Array(array.buffer)), componentType, count: array.length / ({ SCALAR: 1, VEC3: 3, VEC4: 4, MAT4: 16 }[type]), type, ...bounds })
  return index
}
const oldViews = gltf.bufferViews
gltf.bufferViews = []
const imageByView = new Map(gltf.images.map(image => [image.bufferView, image]))
for (let i = 0; i < oldViews.length; i++) {
  const old = oldViews[i]
  let bytes = bin.subarray(old.byteOffset || 0, (old.byteOffset || 0) + old.byteLength)
  const image = imageByView.get(i)
  if (image) {
    const metadata = await sharp(bytes).metadata()
    const resized = sharp(bytes).resize({ width: 1024, height: 1024, fit: 'inside', withoutEnlargement: true })
    bytes = metadata.hasAlpha ? await resized.png({ compressionLevel: 9, palette: true, quality: 88 }).toBuffer() : await resized.jpeg({ quality: 82 }).toBuffer()
    image.mimeType = metadata.hasAlpha ? 'image/png' : 'image/jpeg'
  }
  view(bytes, old.target)
}

// Skin the static, authored pose with a small humanoid rig. This is an approximation,
// not captured motion or an artist-reviewed production rig. All positions are meters.
const joints = [
  ['Hips', -1, [0, .87, 0]], ['Spine', 0, [0, 1.06, 0]],
  ['Chest', 1, [0, 1.28, 0]], ['Head', 2, [0, 1.43, .025]],
  ['LeftThigh', 0, [.095, .84, 0]], ['LeftShin', 4, [.095, .45, 0]], ['LeftFoot', 5, [.095, .08, .015]],
  ['RightThigh', 0, [-.095, .84, 0]], ['RightShin', 7, [-.095, .45, 0]], ['RightFoot', 8, [-.095, .08, .015]],
  ['LeftArm', 2, [.18, 1.33, 0]], ['LeftForearm', 10, [.30, 1.09, .13]],
  ['RightArm', 2, [-.18, 1.33, 0]], ['RightForearm', 12, [-.30, 1.09, .13]],
]
const start = gltf.nodes.length
const parent = 9
for (const [name, ancestor, p] of joints) {
  const origin = ancestor < 0 ? [0, 0, 0] : joints[ancestor][2]
  gltf.nodes.push({ name, translation: p.map((v, i) => v - origin[i]), children: [] })
}
joints.forEach(([, ancestor], i) => {
  gltf.nodes[ancestor < 0 ? parent : start + ancestor].children.push(start + i)
})
const matrices = joints.flatMap(([, , p]) => new Matrix4().makeTranslation(...p).invert().toArray())
gltf.skins = [{ name: 'PlaceholderHumanoid', skeleton: start, joints: joints.map((_, i) => start + i), inverseBindMatrices: accessor(new Float32Array(matrices), 'MAT4', 5126) }]
function blend(y, lo, hi) { const t = Math.max(0, Math.min(1, (y - lo) / (hi - lo))); return t * t * (3 - 2 * t) }
for (const node of gltf.nodes.filter(node => node.mesh !== undefined)) {
  node.skin = 0
  for (const primitive of gltf.meshes[node.mesh].primitives) {
    const a = gltf.accessors[primitive.attributes.POSITION]
    const v = oldViews[a.bufferView]
    const indices = new Uint16Array(a.count * 4)
    const weights = new Float32Array(a.count * 4)
    for (let i = 0; i < a.count; i++) {
      const base = (v.byteOffset || 0) + (a.byteOffset || 0) + i * (v.byteStride || 12)
      const x = bin.readFloatLE(base), y = bin.readFloatLE(base + 4)
      let ids, w
      if (y < .90) {
        const leg = x >= 0 ? 4 : 7
        if (y < .18) { const t = blend(y, .06, .18); ids = [leg + 2, leg + 1]; w = [1 - t, t] }
        else if (y < .55) { const t = blend(y, .36, .55); ids = [leg + 1, leg]; w = [1 - t, t] }
        else { const t = blend(y, .74, .90); ids = [leg, 0]; w = [1 - t, t] }
      } else if (Math.abs(x) > .20 && y < 1.40) {
        const arm = x >= 0 ? 10 : 12
        const elbow = 1 - blend(y, 1.02, 1.18)
        const shoulder = blend(Math.abs(x), .20, .27)
        ids = [2, arm, arm + 1]; w = [1 - shoulder, shoulder * (1 - elbow), shoulder * elbow]
      } else if (y > 1.36) { const t = blend(y, 1.36, 1.44); ids = [2, 3]; w = [1 - t, t] }
      else { const t = blend(y, 1.04, 1.25); ids = [1, 2]; w = [1 - t, t] }
      ids.forEach((id, k) => { indices[i * 4 + k] = id; weights[i * 4 + k] = w[k] })
    }
    primitive.attributes.JOINTS_0 = accessor(indices, 'VEC4', 5123)
    primitive.attributes.WEIGHTS_0 = accessor(weights, 'VEC4', 5126)
  }
}

function clip(name, duration, pose) {
  const times = Float32Array.from({ length: 33 }, (_, i) => i * duration / 32)
  const input = accessor(times, 'SCALAR', 5126, { min: [0], max: [duration] })
  const channels = [], samplers = []
  joints.forEach(([bone], i) => {
    const values = []
    for (let k = 0; k < times.length; k++) {
      const phase = k / 32 * Math.PI * 2
      values.push(...new Quaternion().setFromEuler(new Euler(...pose(bone, phase))).toArray())
    }
    samplers.push({ input, output: accessor(new Float32Array(values), 'VEC4', 5126), interpolation: 'LINEAR' })
    channels.push({ sampler: samplers.length - 1, target: { node: start + i, path: 'rotation' } })
  })
  return { name, samplers, channels }
}
gltf.animations = [
  clip('Walk', 1.1, (bone, p) => {
    const opposite = bone.startsWith('Right') ? Math.PI : 0
    const s = Math.sin(p + opposite)
    if (bone.endsWith('Thigh')) return [.32 * s, 0, 0]
    if (bone.endsWith('Shin')) return [.42 * Math.max(0, -s), 0, 0]
    if (bone.endsWith('Foot')) return [-.10 * s, 0, 0]
    if (bone.endsWith('Arm')) return [-.14 * s, 0, 0]
    if (bone === 'Spine') return [0, .025 * Math.sin(p), 0]
    return [0, 0, 0]
  }),
  clip('Idle', 4, (bone, p) => bone === 'Chest' ? [.008 * Math.sin(p), 0, .005 * Math.sin(p)] : [0, 0, 0]),
]
gltf.asset.extras = { license: 'CC0-1.0', author: 'Innerscene / MakeHuman; project-authored approximate rig and Walk/Idle clips', placeholder: true }
gltf.buffers = [{ byteLength: offset }]
const jsonText = JSON.stringify(gltf)
const jsonBuffer = Buffer.alloc(Math.ceil(Buffer.byteLength(jsonText) / 4) * 4, 0x20)
jsonBuffer.write(jsonText)
const header = Buffer.alloc(20)
header.write('glTF'); header.writeUInt32LE(2, 4); header.writeUInt32LE(28 + jsonBuffer.length + offset, 8)
header.writeUInt32LE(jsonBuffer.length, 12); header.writeUInt32LE(0x4e4f534a, 16)
const binHeader = Buffer.alloc(8)
binHeader.writeUInt32LE(offset); binHeader.writeUInt32LE(0x004e4942, 4)
await fs.writeFile(output, Buffer.concat([header, jsonBuffer, binHeader, ...chunks]))
console.log(`Built ${output}: ${(28 + jsonBuffer.length + offset).toLocaleString()} bytes; ${joints.length} joints; Walk + Idle`)
