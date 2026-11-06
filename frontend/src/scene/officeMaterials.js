import { useEffect, useMemo } from 'react'
import { CanvasTexture, DataTexture, LinearFilter, LinearMipmapLinearFilter, MeshBasicMaterial, MeshPhysicalMaterial, MeshStandardMaterial, RepeatWrapping, RGBAFormat, SRGBColorSpace } from 'three'

function walnutTexture() {
  const width = 64, height = 256
  const data = new Uint8Array(width * height * 4)
  for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
    const grain = Math.sin(x * .7 + Math.sin(y * .024) * 1.8) * 8 + Math.sin(x * 2.7 + y * .04) * 3
    const i = (y * width + x) * 4
    data[i] = 61 + grain; data[i + 1] = 40 + grain * .65; data[i + 2] = 28 + grain * .4; data[i + 3] = 255
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

function label(text, color = '#c9a66b') {
  // Local type on physical signs; no remote font, credential image or fake metrics.
  if (typeof CanvasRenderingContext2D === 'undefined') return new MeshBasicMaterial({ color })
  const canvas = document.createElement('canvas')
  canvas.width = 1024; canvas.height = 256
  const context = canvas.getContext('2d')
  if (!context) return new MeshBasicMaterial({ color })
  context.fillStyle = '#101114'; context.fillRect(0, 0, 1024, 256)
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
    wall: new MeshStandardMaterial({ color: '#24262b', roughness: .84 }),
    navy: new MeshStandardMaterial({ color: '#0b1424', roughness: .65 }),
    metal: new MeshStandardMaterial({ color: '#202226', metalness: .75, roughness: .3 }),
    champagne: new MeshStandardMaterial({ color: '#c9a66b', metalness: .8, roughness: .28 }),
    floor: new MeshStandardMaterial({ color: '#303136', metalness: .12, roughness: .34 }),
    leather: new MeshStandardMaterial({ color: '#16171a', roughness: .8 }),
    rug: new MeshStandardMaterial({ color: '#24262b', roughness: 1 }),
    ivory: new MeshStandardMaterial({ color: '#f5f3ee', roughness: .7 }),
    glass: new MeshPhysicalMaterial({ color: '#a4b1bc', transparent: true, opacity: .14, metalness: .1, roughness: .15, depthWrite: false }),
    screen: new MeshStandardMaterial({ color: '#0b2235', emissive: '#4ea8de', emissiveIntensity: .12, roughness: .35 }),
    blue: new MeshBasicMaterial({ color: '#4ea8de' }),
    warm: new MeshBasicMaterial({ color: '#c9a66b' }),
    branding: label('PARAMJEET.DEV'),
    timeline: label('2021   /   2023   /   2026   /   2028'),
    certificates: label('CONTINUING TO LEARN\nCertifications'),
    contact: label('LET’S CONNECT\nparam1539064@gmail.com', '#4ea8de'),
    skills: label('CODE  /  LINUX  /  CLOUD', '#4ea8de'),
  }), [])
  useEffect(() => () => {
    for (const material of Object.values(materials)) { material.map?.dispose(); material.dispose() }
  }, [materials])
  return materials
}
