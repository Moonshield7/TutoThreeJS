import * as THREE from 'three';
import GLTFLoader from 'gltfloader';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, iw/ih);

const mesh = await GLTFLoader.loadObject('bibi2.glb', 'bibi')
const texture = new THREE.TextureLoader().load('bibi.png')
mesh.children[1].material  = new THREE.MeshPhongMaterial({map: texture, shininess:0})
// const mesh = new THREE.Mesh(geometry, material)

const light = new THREE.PointLight(0xeeeeee)

scene.add(mesh)
scene.add(light)

camera.position.set(0, 1.5, 4)
light.position.set(0, 4, 4)

const renderer = new THREE.WebGLRenderer({canvas});

const mixer = new THREE.AnimationMixer(mesh)
mixer.clipAction(mesh.animations[0]).setDuration(3).play()
mixer.clipAction(mesh.animations[1]).setDuration(3).play()

const clock = new THREE.Clock()
let t = 0

loop()
function loop(){
  requestAnimationFrame(loop)
  const dt = clock.getDelta()
  t += dt
  mixer.update(dt)
  mesh.rotation.y = Math.cos(t*Math.PI/4)
  // mesh.rotation.y += 0.01
  // mesh.rotation.x += 0.005
  renderer.render(scene, camera)
}
