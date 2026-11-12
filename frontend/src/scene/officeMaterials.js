import { useEffect, useMemo } from 'react'
import { usePalette } from '../theme'
import { CanvasTexture, DataTexture, LinearFilter, LinearMipmapLinearFilter, MeshBasicMaterial, MeshPhysicalMaterial, MeshStandardMaterial, RepeatWrapping, RGBAFormat, SRGBColorSpace } from 'three'

function texture(data, width, height, color = false, repeat = [1, 1]) {
  const map = new DataTexture(data, width, height, RGBAFormat)
  map.wrapS = map.wrapT = RepeatWrapping
  if (color) map.colorSpace = SRGBColorSpace
  map.repeat.set(...repeat)
  map.minFilter = LinearMipmapLinearFilter
  map.magFilter = LinearFilter
  map.generateMipmaps = true
  map.anisotropy = 4
  map.needsUpdate = true
  return map
}

function noise(x, y) {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453
  return n - Math.floor(n)
}

function walnutTexture(palette, panel = false, tint = palette.walnut) {
  const width = 256, height = 512
  const data = new Uint8Array(width * height * 4)
  const relief = new Uint8Array(width * height * 4)
  const roughness = new Uint8Array(width * height * 4)
  const walnut = tint.slice(1).match(/../g).map(value => parseInt(value, 16))
  for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
    const warp = Math.sin(y * .011) * 1.8 + Math.sin(y * .033 + x * .02) * .5
    const line = x + warp
    const cell = Math.floor(line)
    const fraction = line - cell
    const blend = fraction * fraction * (3 - 2 * fraction)
    const fiber = (noise(cell, 11) * (1 - blend) + noise(cell + 1, 11) * blend - .5) * 1.5
    const pores = noise(x, y) - .5
    // Irregular fine fibers rather than broad, evenly spaced stripes.
    const grain = fiber * 2.2 + Math.sin(x * .37 + warp) * .7 + pores * 1.6
    const edge = panel ? Math.min(1, Math.min(x, width - 1 - x, y * .5, (height - 1 - y) * .5) / 5) : 1
    const shade = .86 + edge * .14
    const i = (y * width + x) * 4
    data[i] = (walnut[0] + grain) * shade; data[i + 1] = (walnut[1] + grain * .8) * shade; data[i + 2] = (walnut[2] + grain * .65) * shade; data[i + 3] = 255
    relief[i] = relief[i + 1] = relief[i + 2] = 96 + edge * 32 + fiber * 8 + pores * 3
    relief[i + 3] = 255
    roughness[i] = roughness[i + 1] = roughness[i + 2] = 204 + fiber * 12 + pores * 8
    roughness[i + 3] = 255
  }
  return { map: texture(data, width, height, true), bumpMap: texture(relief, width, height), roughnessMap: texture(roughness, width, height) }
}

function mineralTexture(color, floor = false) {
  const size = 128
  const data = new Uint8Array(size * size * 4)
  const relief = new Uint8Array(size * size * 4)
  const roughness = new Uint8Array(size * size * 4)
  const rgb = color.slice(1).match(/../g).map(value => parseInt(value, 16))
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const i = (y * size + x) * 4
    const speckle = noise(x, y) - .5
    const cloud = Math.sin(x * .07 + Math.sin(y * .06)) * Math.sin(y * .08) * .8
    // Restrained stone joints establish scale on the existing floor mesh.
    const joint = floor && (x === 0 || y === 0)
    const variation = speckle * (floor ? 2 : 1) + cloud - (joint ? 9 : 0)
    for (let c = 0; c < 3; c++) {
      data[i + c] = rgb[c] + variation
      relief[i + c] = joint ? 96 : 128 + speckle * 9
      roughness[i + c] = (floor ? 205 : 242) + speckle * 10
    }
    data[i + 3] = relief[i + 3] = roughness[i + 3] = 255
  }
  const repeat = floor ? [6, 10] : [8, 8]
  return { map: texture(data, size, size, true, repeat), bumpMap: texture(relief, size, size, false, repeat), roughnessMap: texture(roughness, size, size, false, repeat) }
}

function label(palette, text, color = palette.text, accentText = '') {
  // Local type on physical signs; no remote font, credential image or fake metrics.
  if (typeof CanvasRenderingContext2D === 'undefined') return new MeshBasicMaterial({ color })
  const canvas = document.createElement('canvas')
  canvas.width = 1024; canvas.height = 256
  const context = canvas.getContext('2d')
  if (!context) return new MeshBasicMaterial({ color })
  context.fillStyle = palette.background; context.fillRect(0, 0, 1024, 256)
  context.fillStyle = color; context.textAlign = 'center'; context.textBaseline = 'middle'
  context.font = '48px Arial'
  const lines = text.split('\n')
  if (accentText) {
    const prefix = text.slice(0, -accentText.length)
    const prefixWidth = context.measureText(prefix).width
    const start = 512 - (prefixWidth + context.measureText(accentText).width) / 2
    context.textAlign = 'left'
    context.fillText(prefix, start, 128)
    context.fillStyle = palette.soft
    context.fillText(accentText, start + prefixWidth, 128)
  } else lines.forEach((line, i) => context.fillText(line, 512, 128 + (i - (lines.length - 1) / 2) * 72, 960))
  const map = new CanvasTexture(canvas)
  map.colorSpace = SRGBColorSpace
  return new MeshBasicMaterial({ map })
}

export default function useOfficeMaterials() {
  const palette = usePalette()
  const materials = useMemo(() => ({
    wood: new MeshPhysicalMaterial({ ...walnutTexture(palette), color: '#C1B1A9', bumpScale: .004, roughness: .58, clearcoat: .16, clearcoatRoughness: .38, reflectivity: .4 }),
    door: new MeshPhysicalMaterial({ ...walnutTexture(palette, false, palette.door), color: '#C1B1A9', bumpScale: .004, roughness: .58, clearcoat: .12, clearcoatRoughness: .4 }),
    doorFrame: new MeshStandardMaterial({ color: palette.trim, roughness: .65, metalness: .08 }),
    backWall: new MeshStandardMaterial({ ...mineralTexture(palette.backWall), bumpScale: .004, roughness: .95 }),
    doorPanel: new MeshPhysicalMaterial({ ...walnutTexture(palette, true, palette.door), bumpScale: .008, roughness: .48, clearcoat: .26, clearcoatRoughness: .32, reflectivity: .45 }),
    wall: new MeshStandardMaterial({ ...mineralTexture(palette.wall), bumpScale: .004, roughness: .95 }),
    navy: new MeshStandardMaterial({ color: palette.trim, roughness: .72 }),
    metal: new MeshStandardMaterial({ color: palette.metal, metalness: .8, roughness: .3 }),
    champagne: new MeshStandardMaterial({ color: palette.hardware, metalness: .85, roughness: .26 }),
    floor: new MeshPhysicalMaterial({ ...mineralTexture(palette.floor, true), bumpScale: .012, metalness: 0, roughness: .64, clearcoat: .08, clearcoatRoughness: .65 }),
    leather: new MeshStandardMaterial({ color: palette.trim, roughness: .87 }),
    rug: new MeshStandardMaterial({ color: palette.trim, roughness: 1 }),
    ivory: new MeshStandardMaterial({ color: '#EAE5D7', roughness: .7 }),
    glass: new MeshPhysicalMaterial({ color: palette.muted, transparent: true, opacity: .14, metalness: .1, roughness: .15, depthWrite: false }),
    screen: new MeshStandardMaterial({ color: palette.screen, emissive: palette.indicator, emissiveIntensity: .08, roughness: .35 }),
    blue: new MeshBasicMaterial({ color: palette.indicator }),
    warm: new MeshBasicMaterial({ color: palette.glow }),
    branding: label(palette, 'PARAMJEET STUDIO', palette.text, 'STUDIO'),
    timeline: label(palette, '2021   /   2023   /   2026   /   2028'),
    certificates: label(palette, 'Certifications'),
    contact: label(palette, 'Contact\nparam1539064@gmail.com', palette.text),
    skills: label(palette, 'Technical Skills', palette.text),
  }), [palette])
  useEffect(() => () => {
    for (const material of Object.values(materials)) { material.map?.dispose(); material.bumpMap?.dispose(); material.roughnessMap?.dispose(); material.dispose() }
  }, [materials])
  return materials
}
