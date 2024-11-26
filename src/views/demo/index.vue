<template>
  <div class="content">
    <div class="model"></div>
    <section class="hero">
      <h1>Digtial</h1>
      <h2>Transform</h2>
      <p>啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</p>
    </section>
    <section class="info">
      <div class="tags">
        <p>1</p>
        <p>2</p>
        <p>3</p>
        <p>4</p>
      </div>
      <h2>惆怅长岑长惆怅长岑长擦擦擦擦擦擦擦擦擦擦擦擦擦擦擦擦擦擦擦擦擦</h2>
      <p>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
    </section>
    <section class="scanner">
      <div class="scan-info">
        <div class="product-id"><h2>#98734</h2></div>
        <div class="product-description">
          <p>product-description</p>
        </div>
      </div>
      <div class="barcode">
        <van-image
          width="100%"
          height="100%"
          fit="contain"
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
        />
      </div>
      <div class="purchased">
        <p>purchasedbbbbbb</p>
      </div>
      <div class="scan-container"></div>
    </section>
    <!-- <section class="outro">
      <h2>啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</h2>
    </section> -->
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "Demo"
});
import { useDarkMode } from "@/hooks/useToggleDarkMode";
import Lenis from "lenis";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLoadingStore } from "@/store/modules/loading";
import { onMounted, ref } from "vue";
gsap.registerPlugin(ScrollTrigger);
const lenis = ref(new Lenis());
const init = () => {
  lenis.value?.on("scroll", ScrollTrigger.update);
  gsap.ticker.add(time => {
    lenis.value.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // 创建场景
  const scene = new THREE.Scene();
  // scene.background = new THREE.Color(0xfefdfd);

  // 创建相机
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  // 创建渲染器
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });
  renderer.setClearColor(0xffffff, 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // 确保这里使用正确的软阴影类型
  renderer.physicallyCorrectLights = true;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 2.5;

  document.querySelector(".model").appendChild(renderer.domElement);
  const ambientLight = new THREE.AmbientLight(0xffffff, 3);
  scene.add(ambientLight);
  const mainLight = new THREE.DirectionalLight(0xffffff, 1);
  mainLight.position.set(5, 10, 7.5);
  scene.add(mainLight);
  const fillLight = new THREE.DirectionalLight(0xffffff, 3);
  fillLight.position.set(-5, 0, -5);
  scene.add(fillLight);
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 2);
  hemiLight.position.set(0, 25, 0);
  scene.add(hemiLight);

  function basicAnimate() {
    renderer.render(scene, camera);
    requestAnimationFrame(basicAnimate);
  }

  // 启动动画
  basicAnimate();

  let model;
  const loader = new GLTFLoader();
  loader.load("../../../static/无标题.glb", function (gltf) {
    model = gltf.scene;

    // 处理模型
    model.traverse(node => {
      if (node.isMesh) {
        if (node.material) {
          node.material.metalness = 0.9;
          node.material.roughness = 1.8;
          node.material.envMapIntensity = 3;
        }
        node.castShadow = true;
        node.receiveShadow = true;
      }
    });
    // 设置初始旋转
    // model.rotation.x = 199.5;
    // model.rotation.z = 0;
    // 计算边界框
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    model.userData.initCenter = center.clone();
    model.position.sub(center); // 将模型居中

    scene.add(model);

    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    camera.position.z = maxDim * 1.5;

    // model.scale.set(0, 0, 0); // 设置初始大小

    // 播放初始化动画
    const playInitialAnimation = () => {
      if (model) {
        gsap.to(model.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 1,
          ease: "power2.out"
        });
      }

      gsap.to(scanContainer, {
        scale: 1,
        duration: 1,
        ease: "power2.out"
      });
    };
    playInitialAnimation();
    cancelAnimationFrame(basicAnimate); // 组件卸载时取消动画帧
    // requestAnimationFrame(basicAnimate);
    // animate();
  });

  const floatAmplitude = 0.2;
  const floatSpeed = 1.5;
  const rotationSpeed = 0.3;
  let isFloating = true;
  let currentScroll = 0;
  const stickyHeight = window.innerHeight;
  const scannerSection = document.querySelector(".scanner");
  const scannerPosition = scannerSection.offsetTop;
  const scanContainer = document.querySelector(".scan-container");
  gsap.set(scanContainer, { scale: 0 });

  ScrollTrigger.create({
    trigger: "body",
    start: "top top",
    end: "top -10",
    onEnterBack: () => {
      if (model) {
        console.log(1);

        gsap.to(model.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 1,
          ease: "power2.out"
        });
        isFloating = true;
      }

      gsap.to(scanContainer, {
        scale: 1,
        duration: 1,
        ease: "power2.out"
      });
    }
  });
  ScrollTrigger.create({
    trigger: ".scanner",
    start: "top top",
    end: `${stickyHeight}`,
    pin: true,
    onEnter: () => {
      if (model) {
        isFloating = false;
        model.position.y = 0;

        gsap.to(model.rotation, {
          y: model.rotation.y + Math.PI * 2,
          duration: 1,
          ease: "power2.inOut",
          onComplete: () => {
            gsap.to(model.scale, {
              x: 0,
              y: 0,
              z: 0,
              duration: 0.5,
              ease: "power2.in",
              onComplete: () => {
                gsap.to(scanContainer, {
                  scale: 0,
                  duration: 0.5,
                  ease: "power2.in"
                });
              }
            });
          }
        });
      }
    }
  });
};

const loadingStore = useLoadingStore();

const fetchData = async () => {
  loadingStore.setLoading(true);
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
  } catch (error) {
    console.error(error);
  } finally {
    loadingStore.setLoading(false);
  }
};

// 触发加载函数
fetchData();

// Vue 生命周期钩子
onMounted(() => {
  init();
});
</script>
<style scoped lang="scss">
.content {
  width: 100%;
  overflow-x: hidden;
  box-sizing: border-box;
  text-transform: uppercase; //把文本转为大写
  color: #000;
  // height: 500vh;
  // position: relative;
}
canvas {
  position: fixed;
  top: 0;
  left: 0;
}
h1 {
  text-align: center;
  font-size: 10vw;
  font-weight: 300;
  line-height: 100%;
}
h2 {
  font-size: 2.5vw;
  font-weight: 500;
  line-height: 100%;
}
p {
  font-size: 12x;
  font-weight: 500;
  line-height: 100%;
  word-wrap: break-word;
}
.model {
  position: fixed;
  width: 100%;
  height: 100vh;
}
section {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1em;
  z-index: 2;
}
.info {
  gap: 8em;
  .tags {
    width: 60%;
    display: flex;
    gap: 2em;
  }
  h2 {
    width: 75%;
    text-align: center;
  }
  p {
    width: 60%;
    text-align: center;
  }
}
.scan-info {
  position: absolute;
  top: 0;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  padding: 2em;
}

.scan-container {
  width: 280px;
  height: 480px;
  border: 1px solid #000;
  border-radius: 0.5em;
}
.brcode {
  position: absolute;
  bottom: 1em;
  left: 2em;
  width: 200px;
  height: 100px;
}
.purchased {
  position: absolute;
  bottom: 2em;
  // right: 2em;
  padding: 0.5em 4em;
  color: red;
  border: 1px solid red;
  border-radius: 2em;
}
.outro h2 {
  width: 70%;
  text-align: center;
}
.lenis {
  &.lenis-smooth {
    scroll-behavior: auto !important;
  }

  &.lenis-smooth [data-lenis-prevent] {
    overscroll-behavior: auto;
  }

  &.lenis-stopped {
    overflow: hidden;
  }

  &.lenis-smooth iframe {
    pointer-events: auto;
  }
}
</style>
