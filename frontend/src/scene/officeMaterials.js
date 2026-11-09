import { useEffect, useMemo } from 'react'
import { palette } from '../palette'
import { CanvasTexture, DataTexture, LinearFilter, LinearMipmapLinearFilter, MeshBasicMaterial, MeshPhysicalMaterial, MeshStandardMaterial, RepeatWrapping, RGBAFormat, SRGBColorSpace } from 'three'

function walnutTexture() {
  const width = 64, height = 256
  const data = new Uint8Array(width * height * 4)
  const walnut = palette.walnut.slice(1).match(/../g).map(value => parseInt(value, 16))
  for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
    const grain = Math.sin(x * .7 + Math.sin(y * .024) * 1.8) * 8 + Math.sin(x * 2.7 + y * .04) * 3
    const i = (y * width + x) * 4
    data[i] = walnut[0] + grain; data[i + 1] = walnut[1] + grain * .65; data[i + 2] = walnut[2] + grain * .4; data[i + 3] = 255
  }
  const texture = new DataTexture(data, width, height, RGBAFormat)
  texture.wrapS = texture.wrapT = RepeatWrapping
  texture.colorSpace = SRGBColorSpace
  texture.minFilter = LinearMipmapLinearFilter
  texture.magFilter = LinearFilter
  texture.generateMipmaps = true
  texture.anisotropy = 2
  texture.needsUpdate = true
  return texture
}

function label(text, color = palette.text) {
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
  lines.forEach((line, i) => context.fillText(line, 512, 128 + (i - (lines.length - 1) / 2) * 72, 960))
  const map = new CanvasTexture(canvas)
  map.colorSpace = SRGBColorSpace
  return new MeshBasicMaterial({ map })
}

export default function useOfficeMaterials() {
  const materials = useMemo(() => ({
    wood: new MeshStandardMaterial({ map: walnutTexture(), roughness: .42 }),
    wall: new MeshStandardMaterial({ color: palette.background, roughness: .84 }),
    navy: new MeshStandardMaterial({ color: palette.background, roughness: .65 }),
    metal: new MeshStandardMaterial({ color: palette.border, metalness: .75, roughness: .3 }),
    champagne: new MeshStandardMaterial({ color: palette.accent, metalness: .8, roughness: .28 }),
    floor: new MeshStandardMaterial({ color: palette.surface, metalness: .12, roughness: .34 }),
    leather: new MeshStandardMaterial({ color: palette.secondary, roughness: .8 }),
    rug: new MeshStandardMaterial({ color: palette.background, roughness: 1 }),
    ivory: new MeshStandardMaterial({ color: palette.text, roughness: .7 }),
    glass: new MeshPhysicalMaterial({ color: palette.muted, transparent: true, opacity: .14, metalness: .1, roughness: .15, depthWrite: false }),
    screen: new MeshStandardMaterial({ color: palette.secondary, emissive: palette.accent, emissiveIntensity: .12, roughness: .35 }),
    blue: new MeshBasicMaterial({ color: palette.accent }),
    warm: new MeshBasicMaterial({ color: palette.accent }),
    branding: label('PARAMJEET.DEV'),
    timeline: label('2021   /   2023   /   2026   /   2028'),
    certificates: label('Certifications'),
    contact: label('Contact\nparam1539064@gmail.com', palette.text),
    skills: label('Technical Skills', palette.text),
  }), [])
  useEffect(() => () => {
    for (const material of Object.values(materials)) { material.map?.dispose(); material.dispose() }
  }, [materials])
  return materials
}
