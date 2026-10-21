'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

/**
 * The D.U.C.K mascot exactly as the DUCK app design renders it (design_handoff_duck_app/DUCK App.dc.html,
 * initDuck/paint): the animated low-poly duck, Naples Yellow body, brown beak and feet, black eyes,
 * the design's three-light rig and camera, idling on its first animation clip.
 * Model: "Duck baby - animated low poly" by WildPoly3D, CC-BY-4.0.
 */
const BODY = '#FADA5E'

function fit(model: THREE.Object3D, target: number) {
  const box = new THREE.Box3().setFromObject(model)
  const size = box.getSize(new THREE.Vector3())
  const center = box.getCenter(new THREE.Vector3())
  const s = target / (Math.max(size.x, size.y, size.z) || 1)
  model.scale.setScalar(s)
  model.position.sub(center.multiplyScalar(s))
}

function paint(model: THREE.Object3D) {
  model.traverse((obj) => {
    const c = obj as THREE.Mesh
    if (!c.isMesh || !c.geometry || !c.material) return
    const base = (Array.isArray(c.material) ? c.material[0] : c.material) as THREE.MeshStandardMaterial
    base.metalness = 0
    base.roughness = 0.55
    base.color.set(BODY)
    const brown = base.clone(); brown.map = null; brown.color.set('#8a4f22'); brown.emissive?.set('#000000')
    const eye = base.clone(); eye.map = null; eye.vertexColors = false; eye.color.set('#050505'); eye.emissive?.set('#000000')
    const g = c.geometry
    const pos = g.attributes.position
    const vc = g.attributes.color
    const idx = g.index ? g.index.array : null
    const tc = idx ? idx.length / 3 : pos.count / 3
    const bi: number[] = [], ri: number[] = [], ei: number[] = []
    const lum = (i: number) => (vc.getX(i) + vc.getY(i) + vc.getZ(i)) / 3
    for (let t = 0; t < tc; t++) {
      const a = idx ? idx[t * 3] : t * 3, b = idx ? idx[t * 3 + 1] : t * 3 + 1, cc = idx ? idx[t * 3 + 2] : t * 3 + 2
      const my = (pos.getY(a) + pos.getY(b) + pos.getY(cc)) / 3
      const mz = (pos.getZ(a) + pos.getZ(b) + pos.getZ(cc)) / 3
      const mx = (pos.getX(a) + pos.getX(b) + pos.getX(cc)) / 3
      if (vc && lum(a) < 0.18 && lum(b) < 0.18 && lum(cc) < 0.18) ei.push(a, b, cc)
      else if (my < 0.016 || (mz > 0.11 && my > 0.135 && my < 0.19 && Math.abs(mx) < 0.06)) ri.push(a, b, cc)
      else bi.push(a, b, cc)
    }
    g.setIndex(bi.concat(ri, ei))
    g.clearGroups()
    g.addGroup(0, bi.length, 0)
    g.addGroup(bi.length, ri.length, 1)
    g.addGroup(bi.length + ri.length, ei.length, 2)
    c.material = [base, brown, eye]
  })
}

export default function DuckModel({ label }: { label: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    } catch {
      return
    }
    // Keep the mascot inexpensive on phones; the passport layout is already
    // dense and a high-DPI canvas can dominate the frame budget.
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth <= 760 ? 1 : 1.5))
    const scene = new THREE.Scene()
    const cam = new THREE.PerspectiveCamera(35, 1, 0.01, 1000)
    // Leave generous breathing room for the wings and tail while the idle turn rotates.
    const dist = 4.35
    cam.position.set(0.5 * dist, 0.4 * dist, dist)
    cam.lookAt(0, 0, 0)
    // The design was lit in three r128 (legacy light units); ×π gives the same exposure in r184.
    scene.add(new THREE.AmbientLight(0xffffff, 0.32 * Math.PI))
    const key = new THREE.DirectionalLight(0xffffff, 1.05 * Math.PI); key.position.set(3, 6, 5); scene.add(key)
    const fill = new THREE.DirectionalLight(0xffffff, 0.28 * Math.PI); fill.position.set(0, 1, 6); scene.add(fill)
    const rim = new THREE.DirectionalLight(0xfff0c0, 0.45 * Math.PI); rim.position.set(-4, 2, -4); scene.add(rim)
    const root = new THREE.Group()
    scene.add(root)

    const size = () => {
      const w = canvas.clientWidth || 220, h = canvas.clientHeight || 220
      renderer.setSize(w, h, false)
      cam.aspect = w / h
      cam.updateProjectionMatrix()
    }
    size()
    const ro = new ResizeObserver(size)
    ro.observe(canvas)

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let mixer: THREE.AnimationMixer | null = null
    let visible = true
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    io.observe(canvas)

    new GLTFLoader().load('/models/duck.glb', (gltf) => {
      const m = gltf.scene
      fit(m, 1.82)
      paint(m)
      root.add(m)
      if (gltf.animations.length) {
        mixer = new THREE.AnimationMixer(m)
        mixer.clipAction(gltf.animations[0]).play()
      }
    })

    const clock = new THREE.Clock()
    renderer.setAnimationLoop(() => {
      const dt = clock.getDelta()
      if (!visible) return
      if (!reduced) {
        root.rotation.y += dt * 0.25
        mixer?.update(dt * 0.6)
      }
      renderer.render(scene, cam)
    })

    return () => {
      renderer.setAnimationLoop(null)
      ro.disconnect()
      io.disconnect()
      renderer.dispose()
    }
  }, [])

  return <canvas ref={ref} className="pp-duck-canvas" role="img" aria-label={label} />
}
