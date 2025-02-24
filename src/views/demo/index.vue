<template>
  <div class="content">
    <div class="model" />
    <section class="hero">
      <h1>cocaCola</h1>
      <h2>口渴不需要其它</h2>
      <span>新鲜美味满意就是可口可乐;口渴时的享受</span>
    </section>
    <section class="info">
      <div class="tags">
        <p>1</p>
        <p>2</p>
        <p>3</p>
        <p>4</p>
      </div>
      <h2>查看更多系列</h2>
    </section>
    <section class="scanner">
      <div class="scan-info">
        <div class="product-id"><h2>#98734</h2></div>
        <div class="product-description">
          <p>product-description</p>
        </div>
      </div>
      <div>
        <van-image
          width="100%"
          height="100%"
          fit="contain"
          src="https://www.coca-cola.com/content/dam/onexp/cn/zh/homepage/Carousel-pic-1-1214.jpg/width2674.jpg"
        />
      </div>

      <div class="scan-container" />
    </section>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "Demo"
});

import Lenis from "lenis";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLoadingStore } from "@/store/modules/loading";
import { onMounted, ref } from "vue";

// // 引入 ScrollTrigger 插件，用于滚动触发效果
gsap.registerPlugin(ScrollTrigger);

// 创建一个 Lenis 实例，用于平滑滚动
const lenis = ref(new Lenis());
const renderer = new THREE.WebGLRenderer({
  antialias: true, // 开启抗锯齿
  alpha: true // 启用透明背景
});
// 创建透视相机
const camera = new THREE.PerspectiveCamera(
  75, // 视角角度
  window.innerWidth / window.innerHeight, // 屏幕宽高比
  0.1, // 最近视距
  1000 // 最远视距
);

window.addEventListener("resize", () => {
  // 更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight;
  //   更新摄像机的投影矩阵
  camera.updateProjectionMatrix();
  //   更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight);
  //   设置渲染器的像素比
  renderer.setPixelRatio(window.devicePixelRatio);
});
// 初始化函数
const init = () => {
  // Lenis 监听滚动事件并更新 ScrollTrigger
  lenis.value?.on("scroll", ScrollTrigger.update);

  // 添加动画帧更新
  gsap.ticker.add(time => {
    lenis.value.raf(time * 80); // 更新滚动时间轴
  });

  // 禁用动画帧的延迟平滑处理
  gsap.ticker.lagSmoothing(0);

  // 创建 Three.js 场景
  const scene = new THREE.Scene();

  // 创建 WebGL 渲染器

  // 设置渲染器的背景颜色、尺寸和像素比
  renderer.setClearColor(0xffffff, 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // 启用阴影
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // 使用软阴影
  renderer.physicallyCorrectLights = true; // 启用物理灯光计算
  renderer.toneMapping = THREE.ACESFilmicToneMapping; // 设置色调映射
  renderer.toneMappingExposure = 2.5; // 曝光值

  // 将渲染器添加到页面中的 .model 容器
  document.querySelector(".model").appendChild(renderer.domElement);

  // 添加环境光
  const ambientLight = new THREE.AmbientLight(0xffffff, 3);
  scene.add(ambientLight);

  // 添加主光源
  const mainLight = new THREE.DirectionalLight(0xffffff, 1);
  mainLight.position.set(5, 10, 7.5); // 设置光源位置
  scene.add(mainLight);

  // 添加补充光源
  const fillLight = new THREE.DirectionalLight(0xffffff, 3);
  fillLight.position.set(-5, 0, -5);
  scene.add(fillLight);

  // 添加半球光源
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 2);
  hemiLight.position.set(0, 25, 0);
  scene.add(hemiLight);

  // 基础动画函数
  function basicAnimate() {
    renderer.render(scene, camera); // 渲染场景
    requestAnimationFrame(basicAnimate); // 循环调用
  }

  // 启动基础动画
  basicAnimate();

  let model; // 定义模型变量

  // 加载 glTF 模型
  const loader = new GLTFLoader();
  loader.load("/test.glb", function (gltf) {
    model = gltf.scene; // 加载后的模型场景

    // 遍历模型的每个节点
    model.traverse(node => {
      if (node.isMesh) {
        // 如果是网格
        if (node.material) {
          // 如果材质存在
          // 设置材质的属性
          node.material.metalness = 0.9;
          node.material.roughness = 1.8;
          node.material.envMapIntensity = 3;
        }
        node.castShadow = true; // 启用投射阴影
        node.receiveShadow = true; // 启用接收阴影
      }
    });

    // 计算模型的边界框
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    model.userData.initCenter = center.clone(); // 存储模型中心
    model.position.sub(center); // 将模型居中

    scene.add(model); // 将模型添加到场景

    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z); // 计算最大尺寸
    camera.position.z = maxDim * 1.5; // 调整相机位置

    // 播放初始化动画
    const playInitialAnimation = () => {
      if (model) {
        // 放大模型
        gsap.to(model.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 1,
          ease: "power2.out"
        });
      }

      // 放大扫描容器
      gsap.to(scanContainer, {
        scale: 1,
        duration: 1,
        ease: "power2.out"
      });
    };
    playInitialAnimation();

    // cancelAnimationFrame(basicAnimate); // 取消动画帧
  });

  let isFloating = true; // 模型是否处于漂浮状态
  const stickyHeight = window.innerHeight; // 获取窗口高度
  const scanContainer = document.querySelector(".scan-container");
  gsap.set(scanContainer, { scale: 0 }); // 初始化扫描容器的缩放

  // 滚动触发效果：页面回滚时恢复模型
  ScrollTrigger.create({
    trigger: "body",
    start: "top top",
    end: "top -10",
    onEnterBack: () => {
      if (model) {
        gsap.to(model.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 1,
          ease: "power2.out"
        });
        isFloating = true; // 恢复漂浮状态
      }

      gsap.to(scanContainer, {
        scale: 1,
        duration: 1,
        ease: "power2.out"
      });
    }
  });

  // 滚动触发效果：模型缩放消失
  ScrollTrigger.create({
    trigger: ".scanner",
    start: "top top",
    end: `${stickyHeight}`,
    pin: true, // 固定扫描区
    onEnter: () => {
      if (model) {
        isFloating = false; // 停止漂浮
        model.position.y = 0; // 重置模型位置

        // 动画效果：旋转模型并逐渐缩小
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

// 定义加载状态的全局状态管理
const loadingStore = useLoadingStore();

// 异步加载数据
const fetchData = async () => {
  loadingStore.setLoading(true); // 设置为加载状态
  try {
    await new Promise(resolve => setTimeout(resolve, 1000)); // 模拟加载延迟
  } catch (error) {
    console.error(error); // 捕获错误
  } finally {
    loadingStore.setLoading(false); // 加载完成
  }
};

// 触发加载函数
fetchData();

onMounted(() => {
  init(); // 调用初始化函数
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
