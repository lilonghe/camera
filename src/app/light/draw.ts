import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
const gui = new GUI();

const getContentHeight = () => window.innerHeight - 47;

export function renderView(dom: HTMLElement) {
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, getContentHeight());
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  dom.appendChild(renderer.domElement);

  const animationCallbacks: (() => void)[] = [];

  const scene = new THREE.Scene();
  // 相机
  const camera = new THREE.PerspectiveCamera(
    35,
    window.innerWidth / getContentHeight(),
    0.1,
    1000
  );
  camera.position.z = 5;
  camera.position.y = 2.66;

  // 控制相机位置
  const controls = new OrbitControls(camera, renderer.domElement);

  let planeGeometry = new THREE.PlaneGeometry(1000, 1000);
  let planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
  let plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = (-90 * Math.PI) / 180;

  plane.receiveShadow = true;
  scene.add(plane);

  // light
  const lights = [
    {
      position: new THREE.Vector3(0, 3, 3),
      color: "#fff",
      intensity: 50,
      name: "灯光1",
      visible: true,
    },
    {
      position: new THREE.Vector3(3, 1, 3),
      color: "#fff",
      intensity: 30,
      name: "灯光2",
      visible: false,
    },
    {
      position: new THREE.Vector3(-1, 1, 3),
      color: "#fff",
      intensity: 30,
      name: "灯光3",
      visible: false,
    },
    {
      position: new THREE.Vector3(0, 1, -3),
      color: "#fff",
      intensity: 30,
      name: "灯光4",
      visible: false,
    },
    {
      position: new THREE.Vector3(0, 5, 0),
      color: "#fff",
      intensity: 30,
      name: "灯光5",
      visible: false,
    },
  ];

  // 模型
  const loader = new GLTFLoader();
  loader.load(
    "/gltf/human/human.gltf",
    function (gltf) {
      scene.add(gltf.scene);
      gltf.scene.castShadow = true;
      gltf.scene.traverse(function (child) {
        child.castShadow = true;
      });
      controls.target.set(
        gltf.scene.position.x,
        gltf.scene.position.y + 1.5,
        gltf.scene.position.z
      );

      lights.forEach((config, i) => {
        const { lightHelper, guiLight } = appendLight({
          gui,
          scene,
          target: gltf.scene,
          ...config,
        });
        if (i !== 0) {
          guiLight.close();
        }
        animationCallbacks.push(() => {
          lightHelper.update();
        });
      });
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );

  // 显示坐标系
  const axesHelper = new THREE.AxesHelper(150);
  scene.add(axesHelper);

  function animate() {
    renderer.render(scene, camera);
    controls.update();
    animationCallbacks.forEach((cb) => cb());
  }
  renderer.setAnimationLoop(animate);
  addEventListener("resize", () => {
    camera.aspect = window.innerWidth / getContentHeight();
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, getContentHeight());
  });
}

interface AppendLightType {
  gui: GUI;
  scene: THREE.Scene;
  position: THREE.Vector3;
  name: string;
  target?: THREE.Object3D;
  visible?: boolean;

  color?: THREE.ColorRepresentation;
  intensity?: number;
  distance?: number;
  decay?: number;
}

export function appendLight({
  gui,
  scene,
  position,
  name,
  target,
  visible = true,
  ...rest
}: AppendLightType) {
  const light = new THREE.SpotLight(rest.color, rest.intensity);
  const lightHelper = new THREE.SpotLightHelper(light);
  light.visible = visible;
  lightHelper.visible = visible;

  if (target) {
    light.target = target;
  }

  scene.add(light);
  scene.add(lightHelper);

  light.position.set(position.x, position.y, position.z);

  light.penumbra = 0.2;
  light.decay = 2;
  light.distance = 50;
  light.angle = Math.PI / 5;

  light.castShadow = true;

  const guiLight = gui.addFolder(name);
  guiLight
    .add(light, "visible")
    .name("显示")
    .onChange((visible: boolean) => {
      lightHelper.visible = visible;
    });

  guiLight.add(light, "intensity", 0, 100).name("光照强度");

  guiLight.addColor(light, "color");

  const guiPos = guiLight.addFolder("位置");
  guiPos.close();
  guiPos.add(light.position, "x", -10, 10);
  guiPos.add(light.position, "y", 0, 5);
  guiPos.add(light.position, "z", -10, 10);

  return { light, lightHelper, guiLight };
}
