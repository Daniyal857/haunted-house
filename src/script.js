import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import gsap from 'gsap';
import * as dat from 'dat.gui';

/**
 * Loaders
 */
const loadingBarElement = document.querySelector('.loading-bar');
const overlayElement = document.querySelector('.overlay');
const loadingManager = new THREE.LoadingManager(
  //Loaded
  () => {
    gsap.delayedCall(0.5, () => {
      gsap.to(overlayElement, { autoAlpha: 0, duration: 3 });
      loadingBarElement.classList.add('ended');
      loadingBarElement.style.transform = '';
      playHorrorSound();
    });
  }, //Progress
  (itemUrl, itemsLoaded, itemsTotal) => {
    const progressRatio = itemsLoaded / itemsTotal; // 0 to 1
    loadingBarElement.style.transform = `scaleX(${progressRatio})`;
  }
);
const gltfLoader = new GLTFLoader(loadingManager);

/**
 * Base
 */
/**
 * Debug
 */
const gui = new dat.GUI({
  closed: true,
  width: 400
});

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Sounds
 */
const horrorSound = new Audio(
  '/sounds/zapsplat_horror_atmospheric_swell_slow_dark_mysterious_light_tension.mp3'
);

const playHorrorSound = sound => {
  horrorSound.loop = true;
  horrorSound.volume = 0.2;
  horrorSound.play();
};

// Fog
const fog = new THREE.Fog('#262837', 1, 15);
scene.fog = fog;

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

const doorColorTexture = textureLoader.load('/textures/door/color.jpg');
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg');
const doorAmbientOclusionTexture = textureLoader.load(
  '/textures/door/ambientOcclusion.jpg'
);
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg');
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg');
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg');
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg');

const bricksColorTexture = textureLoader.load('/textures/bricks/color.jpg');
const bricksAmbientOclusionTexture = textureLoader.load(
  '/textures/bricks/ambientOcclusion.jpg'
);
const bricksNormalTexture = textureLoader.load('/textures/bricks/normal.jpg');
const bricksRoughnessTexture = textureLoader.load(
  '/textures/bricks/roughness.jpg'
);

const grassColorTexture = textureLoader.load('/textures/grass/color.jpg');
const grassAmbientOclusionTexture = textureLoader.load(
  '/textures/grass/ambientOcclusion.jpg'
);
const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg');
const grassRoughnessTexture = textureLoader.load(
  '/textures/grass/roughness.jpg'
);

grassColorTexture.repeat.set(8, 8);
grassAmbientOclusionTexture.repeat.set(8, 8);
grassNormalTexture.repeat.set(8, 8);
grassRoughnessTexture.repeat.set(8, 8);

grassColorTexture.wrapS = THREE.RepeatWrapping;
grassAmbientOclusionTexture.wrapS = THREE.RepeatWrapping;
grassNormalTexture.wrapS = THREE.RepeatWrapping;
grassRoughnessTexture.wrapS = THREE.RepeatWrapping;

grassColorTexture.wrapT = THREE.RepeatWrapping;
grassAmbientOclusionTexture.wrapT = THREE.RepeatWrapping;
grassNormalTexture.wrapT = THREE.RepeatWrapping;
grassRoughnessTexture.wrapT = THREE.RepeatWrapping;

/**
 * Models
 */
// Duck - right side of the hosue
gltfLoader.load('/models/Duck/glTF/Duck.gltf', gltf => {
  gltf.scene.position.set(3, 0, 0);
  gltf.scene.rotation.set(Math.PI * 0.5, 0, 0);
  gltf.scene.scale.set(0.25, 0.25, 0.25);
  scene.add(gltf.scene);
});
// Duck Two - back of the house
gltfLoader.load('/models/Duck/glTF/Duck.gltf', gltf => {
  gltf.scene.position.set(0, 0, -3.5);
  gltf.scene.rotation.set(-Math.PI * 0.5, 0, Math.PI * 0.5 * 0.3);
  gltf.scene.scale.set(0.3, 0.3, 0.3);
  scene.add(gltf.scene);
});
// Damaged Bench - back of the hosue
gltfLoader.load('/models/Graveyard-Models/benchDamaged.glb', gltf => {
  gltf.scene.position.set(0, 0, -3.5);
  gltf.scene.scale.set(1, 1, 1);
  scene.add(gltf.scene);
});

// Skeleton Model;
gltfLoader.load('/models/Graveyard-Models/skeleton.glb', gltf => {
  gltf.scene.position.set(-0.6, 0, -4.5);
  gltf.scene.rotation.set(Math.PI * 0.5, 0, Math.PI * 0.5 * 0.3);
  gltf.scene.scale.set(0.7, 0.7, 0.7);
  scene.add(gltf.scene);
});

// CrossWood - Front of the hosue
gltfLoader.load('/models/Graveyard-Models/lightpostAll.glb', gltf => {
  gltf.scene.position.set(-1, 0, 8.5);
  gltf.scene.scale.set(1.3, 1.3, 1.3);
  scene.add(gltf.scene);
});
// Road Path - Front of the hosue
gltfLoader.load('/models/Graveyard-Models/road.glb', gltf => {
  gltf.scene.position.set(0, -0.05, 4);
  gltf.scene.scale.set(2.5, 2.5, 2.5);
  scene.add(gltf.scene);
});
gltfLoader.load('/models/Graveyard-Models/road.glb', gltf => {
  gltf.scene.position.set(0, -0.05, 6);
  gltf.scene.scale.set(2.5, 2.5, 2.5);
  scene.add(gltf.scene);
});
gltfLoader.load('/models/Graveyard-Models/road.glb', gltf => {
  gltf.scene.position.set(0, -0.05, 7.2);
  gltf.scene.scale.set(2.5, 2.5, 2.5);
  scene.add(gltf.scene);
});
gltfLoader.load('/models/Graveyard-Models/road.glb', gltf => {
  gltf.scene.position.set(0, -0.05, 9);
  gltf.scene.scale.set(2.5, 2.5, 2.5);
  scene.add(gltf.scene);
});

// GravestoneBroken - Front of the hosue
gltfLoader.load('/models/Graveyard-Models/gravestoneBroken.glb', gltf => {
  gltf.scene.position.set(1, 0, -4);
  gltf.scene.scale.set(1.3, 1.3, 1.3);
  scene.add(gltf.scene);
});
// GravestoneBroken - Front of the hosue
gltfLoader.load('/models/Graveyard-Models/gravestoneDebris.glb', gltf => {
  gltf.scene.position.set(-1, 0, -3.5);
  gltf.scene.scale.set(1.3, 1.3, 1.3);
  scene.add(gltf.scene);
});

// LightpostAll
gltfLoader.load('/models/Graveyard-Models/lightpostAll.glb', gltf => {
  gltf.scene.position.set(-1, 0, -3.5);
  gltf.scene.scale.set(1.3, 1.3, 1.3);
  scene.add(gltf.scene);
});

// Pine Model
gltfLoader.load('/models/Graveyard-Models/pine.glb', gltf => {
  gltf.scene.position.set(8, 0, 6.9);
  gltf.scene.scale.set(1, 1, 1);
  stoneWall.add(gltf.scene);
});
gltfLoader.load('/models/Graveyard-Models/pine.glb', gltf => {
  gltf.scene.position.set(8, 0, 6.1);
  gltf.scene.scale.set(0.7, 0.7, 0.7);
  stoneWall.add(gltf.scene);
});
gltfLoader.load('/models/Graveyard-Models/pine.glb', gltf => {
  gltf.scene.position.set(8.2, 0, 5.2);
  gltf.scene.scale.set(1, 1, 1);
  stoneWall.add(gltf.scene);
});
gltfLoader.load('/models/Graveyard-Models/pine.glb', gltf => {
  gltf.scene.position.set(8.8, 0, 6.7);
  gltf.scene.scale.set(0.4, 0.4, 0.4);
  stoneWall.add(gltf.scene);
});

// Wall
const stoneWall = new THREE.Group();
const stoneWallTwo = new THREE.Group();
scene.add(stoneWall, stoneWallTwo);

// Stone Wall Model - Right Side
gltfLoader.load('/models/Graveyard-Models/stoneWallCurve.glb', gltf => {
  gltf.scene.position.set(8.3, 0, 8);
  gltf.scene.scale.set(1.3, 1.3, 1.3);
  stoneWall.add(gltf.scene);
});
gltfLoader.load('/models/Graveyard-Models/stoneWall.glb', gltf => {
  gltf.scene.position.set(7, 0, 8);
  gltf.scene.scale.set(1.3, 1.3, 1.3);
  stoneWall.add(gltf.scene);
});
gltfLoader.load('/models/Graveyard-Models/stoneWallColumn.glb', gltf => {
  gltf.scene.position.set(5.7, 0, 8);
  gltf.scene.scale.set(1.3, 1.3, 1.3);
  stoneWall.add(gltf.scene);
});
gltfLoader.load('/models/Graveyard-Models/stoneWallColumn.glb', gltf => {
  gltf.scene.position.set(4.4, 0, 8);
  gltf.scene.scale.set(1.3, 1.3, 1.3);
  stoneWall.add(gltf.scene);
});
gltfLoader.load('/models/Graveyard-Models/stoneWall.glb', gltf => {
  gltf.scene.position.set(3.1, 0, 8);
  gltf.scene.scale.set(1.3, 1.3, 1.3);
  stoneWall.add(gltf.scene);
});
gltfLoader.load('/models/Graveyard-Models/stoneWallDamaged.glb', gltf => {
  gltf.scene.position.set(2, 0, 9.115);
  gltf.scene.rotation.set(0, -Math.PI * 0.5 * 2, 0);
  gltf.scene.scale.set(1.3, 1.3, 1.3);
  stoneWall.add(gltf.scene);
});

// Stone Wall Model - Left Side
gltfLoader.load('/models/Graveyard-Models/stoneWallCurve.glb', gltf => {
  gltf.scene.position.set(-8.3, 0, 8.04);
  gltf.scene.rotation.set(0, -Math.PI * 0.5, 0);
  gltf.scene.scale.set(1.3, 1.3, 1.3);
  stoneWallTwo.add(gltf.scene);
});
gltfLoader.load('/models/Graveyard-Models/stoneWall.glb', gltf => {
  gltf.scene.position.set(-7, 0, 8);
  gltf.scene.scale.set(1.3, 1.3, 1.3);
  stoneWallTwo.add(gltf.scene);
});
gltfLoader.load('/models/Graveyard-Models/stoneWallColumn.glb', gltf => {
  gltf.scene.position.set(-5.7, 0, 8);
  gltf.scene.scale.set(1.3, 1.3, 1.3);
  stoneWallTwo.add(gltf.scene);
});
gltfLoader.load('/models/Graveyard-Models/stoneWallColumn.glb', gltf => {
  gltf.scene.position.set(-4.4, 0, 8);
  gltf.scene.scale.set(1.3, 1.3, 1.3);
  stoneWallTwo.add(gltf.scene);
});
gltfLoader.load('/models/Graveyard-Models/stoneWall.glb', gltf => {
  gltf.scene.position.set(-3.1, 0, 8);
  gltf.scene.scale.set(1.3, 1.3, 1.3);
  stoneWallTwo.add(gltf.scene);
});
gltfLoader.load('/models/Graveyard-Models/stoneWallDamaged.glb', gltf => {
  gltf.scene.position.set(-1.8, 0, 8);
  gltf.scene.scale.set(1.3, 1.3, 1.3);
  stoneWallTwo.add(gltf.scene);
});

// Pine Model - left side
gltfLoader.load('/models/Graveyard-Models/pine.glb', gltf => {
  gltf.scene.position.set(-8, 0, 6.9);
  gltf.scene.scale.set(1, 1, 1);
  scene.add(gltf.scene);
});
gltfLoader.load('/models/Graveyard-Models/pine.glb', gltf => {
  gltf.scene.position.set(-8, 0, 6.1);
  gltf.scene.scale.set(0.7, 0.7, 0.7);
  scene.add(gltf.scene);
});
gltfLoader.load('/models/Graveyard-Models/pine.glb', gltf => {
  gltf.scene.position.set(-8.2, 0, 5.9);
  gltf.scene.scale.set(0.7, 0.7, 0.7);
  scene.add(gltf.scene);
});

// Pine Model - left side
gltfLoader.load('/models/Graveyard-Models/pine.glb', gltf => {
  gltf.scene.position.set(-8, 0, 4.9);
  gltf.scene.scale.set(1, 1, 1);
  scene.add(gltf.scene);
});
gltfLoader.load('/models/Graveyard-Models/pine.glb', gltf => {
  gltf.scene.position.set(-8, 0, 4.1);
  gltf.scene.scale.set(0.7, 0.7, 0.7);
  scene.add(gltf.scene);
});
gltfLoader.load('/models/Graveyard-Models/pine.glb', gltf => {
  gltf.scene.position.set(-8.2, 0, 4.9);
  gltf.scene.scale.set(0.7, 0.7, 0.7);
  scene.add(gltf.scene);
});

// Skeleton Model;
gltfLoader.load('/models/Graveyard-Models/skeleton.glb', gltf => {
  gltf.scene.position.set(-5, 0, -7.9);
  gltf.scene.scale.set(0.7, 0.7, 0.7);
  scene.add(gltf.scene);
});

// Ghost Model;
gltfLoader.load('/models/Graveyard-Models/ghost.glb', gltf => {
  gltf.scene.position.set(-9.2, -0.2, -6.5);
  gltf.scene.rotation.set(0.5, 0, 0);
  gltf.scene.scale.set(0.7, 0.7, 0.7);
  scene.add(gltf.scene);
});

// Ghost Model;
gltfLoader.load('/models/Graveyard-Models/gravestoneBevel.glb', gltf => {
  gltf.scene.position.set(-9.2, 0, -6.1);
  gltf.scene.scale.set(1, 1, 1);
  scene.add(gltf.scene);
});

// vampire One Model
gltfLoader.load('/models/Graveyard-Models/vampire.glb', gltf => {
  gltf.scene.position.set(2.8, 0, -6.1);
  gltf.scene.rotation.set(0, -0.5, 0);
  gltf.scene.scale.set(1, 1, 1);
  scene.add(gltf.scene);
});
// Gravestone Flat Model
gltfLoader.load('/models/Graveyard-Models/gravestoneFlat.glb', gltf => {
  gltf.scene.position.set(3.5, 0, -6.1);
  gltf.scene.scale.set(1.5, 1.5, 1.5);
  scene.add(gltf.scene);
});
// vampire Two Model
gltfLoader.load('/models/Graveyard-Models/vampire.glb', gltf => {
  gltf.scene.position.set(4.2, 0, -6.1);
  gltf.scene.rotation.set(0, 0.5, 0);
  gltf.scene.scale.set(1, 1, 1);
  scene.add(gltf.scene);
});

// Shovel Dirt Model
gltfLoader.load('/models/Graveyard-Models/shovelDirt.glb', gltf => {
  gltf.scene.position.set(3, 0, 6.8);
  gltf.scene.scale.set(1, 1, 1);
  scene.add(gltf.scene);
});

// ghost Model
gltfLoader.load('/models/Graveyard-Models/ghost.glb', gltf => {
  gltf.scene.position.set(3.8, 0, 6.2);
  gltf.scene.rotation.set(Math.PI * 0.5, 0, -Math.PI * 0.5);
  gltf.scene.scale.set(1, 1, 1);
  scene.add(gltf.scene);
});
// Coffin Old Model
gltfLoader.load('/models/Graveyard-Models/coffinOld.glb', gltf => {
  gltf.scene.position.set(4, 0, 6.1);
  gltf.scene.rotation.set(0, Math.PI * 0.5, 0);
  gltf.scene.scale.set(1.5, 1.5, 1.5);
  scene.add(gltf.scene);
});

// debrisWood
gltfLoader.load('/models/Graveyard-Models/debrisWood.glb', gltf => {
  gltf.scene.position.set(4, 0.3, 6.1);
  gltf.scene.rotation.set(0, Math.PI * 0.5, 0);
  gltf.scene.scale.set(1.5, 1.5, 1.5);
  scene.add(gltf.scene);
});

// Hosue
const house = new THREE.Group();
scene.add(house);

// Walls
const walls = new THREE.Mesh(
  new THREE.BoxBufferGeometry(4, 2.5, 4),
  new THREE.MeshStandardMaterial({
    map: bricksColorTexture,
    aoMap: bricksAmbientOclusionTexture,
    normalMap: bricksNormalTexture,
    roughnessMap: bricksRoughnessTexture
  })
);
walls.geometry.setAttribute(
  'uv2',
  new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2)
);
walls.position.y = 2.5 / 2;
house.add(walls);

// Roof
const roof = new THREE.Mesh(
  new THREE.ConeBufferGeometry(3.5, 1, 4),
  new THREE.MeshStandardMaterial({ color: '#b35f45' })
);
roof.position.y = 2.5 + 0.5;
roof.rotation.y = Math.PI * 0.25;
house.add(roof);

// Door
const door = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(2.2, 2.2, 100, 100),
  new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    alphaMap: doorAlphaTexture,
    transparent: true,
    aoMap: doorAmbientOclusionTexture,
    displacementMap: doorHeightTexture,
    displacementScale: 0.1,
    normalMap: doorNormalTexture,
    metalnessMap: doorMetalnessTexture,
    roughnessMap: doorRoughnessTexture
  })
);
door.geometry.setAttribute(
  'uv2',
  new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
);
door.position.y = 1;
door.position.z = 2 + 0.01;
house.add(door);

// Bushes
const bushGeometry = new THREE.SphereBufferGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({ color: '#89c854' });

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(0.8, 0.2, 2.2);

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(0.4, 0.1, 2.1);

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.4, 0.4, 0.4);
bush3.position.set(-0.8, 0.1, 2.2);

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.scale.set(0.15, 0.15, 0.15);
bush4.position.set(-1, 0.05, 2.6);

house.add(bush1, bush2, bush3, bush4);

// Graves
const graves = new THREE.Group();
scene.add(graves);

const graveGeometry = new THREE.BoxBufferGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({ color: '#b2b6b1' });

for (let i = 0; i < 20; i++) {
  const angle = Math.random() * Math.PI * 2; // Random Angle
  const radius = 3 + Math.random() * 6; // randome radius
  const x = Math.sin(angle) * radius; // Get the x Position using sin
  const z = Math.cos(angle) * radius; // get the z position using cos

  // Create the mesh
  const grave = new THREE.Mesh(graveGeometry, graveMaterial);

  // Position
  grave.position.set(x, 0, z);

  // Rotation
  grave.rotation.z = (Math.random() - 0.5) * 0.4;
  grave.rotation.y = (Math.random() - 0.5) * 0.4;

  // shadow
  grave.castShadow = true;

  // Add to the grave container
  graves.add(grave);
}

// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(20, 20),
  new THREE.MeshStandardMaterial({
    map: grassColorTexture,
    aoMap: grassAmbientOclusionTexture,
    normalMap: grassNormalTexture,
    roughnessMap: grassRoughnessTexture
  })
);
floor.geometry.setAttribute(
  'uv2',
  new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
);
floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;

scene.add(floor);

/**
 * Lights
 */
// Ambient Light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12); // 0.12
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001);
scene.add(ambientLight);

// Directional Light
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.12); // 0.12
moonLight.position.set(2, 2, -1);
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001);
gui.add(moonLight.position, 'x').min(-5).max(5).step(0.001);
gui.add(moonLight.position, 'y').min(-5).max(5).step(0.001);
gui.add(moonLight.position, 'z').min(-5).max(5).step(0.001);

scene.add(moonLight);

// Door Light
const doorLight = new THREE.PointLight('#ff7d46', 1, 7);
doorLight.position.set(0, 2.2, 2.7);
house.add(doorLight);

/**
 * Ghosts
 */
const ghost1 = new THREE.PointLight('#ff00ff', 2, 3);
scene.add(ghost1);

const ghost2 = new THREE.PointLight('#00ffff', 2, 3);
scene.add(ghost2);

const ghost3 = new THREE.PointLight('#ffff00', 2, 3);
scene.add(ghost3);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);
camera.position.x = 0;
camera.position.y = 5;
camera.position.z = 13;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.maxDistance = 15;
controls.minDistance = 5;
controls.maxPolarAngle = 1.5;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor('#262837');

/**
 * Shadows
 */
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

moonLight.castShadow = true;
doorLight.castShadow = true;
ghost1.castShadow = true;
ghost2.castShadow = true;
ghost3.castShadow = true;

walls.castShadow = true;
bush1.castShadow = true;
bush2.castShadow = true;
bush3.castShadow = true;
bush4.castShadow = true;

floor.receiveShadow = true;

doorLight.shadow.mapSize.width = 256;
doorLight.shadow.mapSize.height = 256;
doorLight.shadow.camera.far = 7;

ghost1.shadow.mapSize.width = 256;
ghost1.shadow.mapSize.height = 256;
ghost1.shadow.camera.far = 7;

ghost2.shadow.mapSize.width = 256;
ghost2.shadow.mapSize.height = 256;
ghost2.shadow.camera.far = 7;

ghost3.shadow.mapSize.width = 256;
ghost3.shadow.mapSize.height = 256;
ghost3.shadow.camera.far = 7;

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update Ghosts
  const ghost1Angle = elapsedTime * 0.5;
  ghost1.position.x = Math.cos(ghost1Angle) * 4;
  ghost1.position.z = Math.sin(ghost1Angle) * 4;
  ghost1.position.y = Math.sin(elapsedTime * 3);

  const ghost2Angle = -elapsedTime * 0.32;
  ghost2.position.x = Math.cos(ghost2Angle) * 5;
  ghost2.position.z = Math.sin(ghost2Angle) * 5;
  ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);

  const ghost3Angle = -elapsedTime * 0.18;
  ghost3.position.x =
    Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32));
  ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5));
  ghost3.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);

  // Animate Ghost
  // animateGhost()

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
