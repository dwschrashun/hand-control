import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

class threeD {
  constructor() {
    this.objects = [];
    this.animating = false;
  }
  init() {
    this.camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.01, 100);
    this.camera.position.z = -100;

    this.scene = new THREE.Scene();

    // import hand and add to scene
    const loader = new GLTFLoader();
    debugger
    loader.load(
      'localhost:8080/models/left_hand.glb',
      gltf => {
        this.scene.add(gltf.scene);
      },
      () => {},
      error => {
        console.error('Error loading gltf', error);
      });

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.body = document.getElementsByTagName('body')[0]
    this.body.appendChild(this.renderer.domElement);


    this.light = new THREE.PointLight();
    this.light.position.set(1, 1, 1)
    this.ambientLight = new THREE.AmbientLight(0xf0f0f0);
    this.scene.add(this.ambientLight);
    this.scene.add(this.light);

    console.log('loaded')
    this.animating = true;
    this.animate();
  }

  animate() {
    this.renderer.setAnimationLoop(() => {
      this.renderer.render(this.scene, this.camera);
    });
  }
}

const app = new threeD();

window.onload = app.init.bind(app);
