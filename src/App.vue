<template>
  <div id="app">
    <div class="router-view-container">
      <router-view />
    </div>
    <div v-show="loadingStore.isLoading" class="__spinner-container">
      <div class="loader" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLoadingStore } from "./store/modules/loading";

// 获取 store 实例
const loadingStore = useLoadingStore();
console.log(loadingStore.isLoading);
</script>

<style>
html,
body,
#app {
  height: 100%;
  margin: 0px;
  padding: 0px;
  width: 100%;
}

.router-view-container {
  position: relative;
  height: 100%;
  width: 100%;
}

.__spinner-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  z-index: 1001;
}

.loader {
  width: 50px;
  aspect-ratio: 1;
  display: grid;
  border: 4px solid #0000;
  border-radius: 50%;
  border-color: #ccc #0000;
  animation: l16 1s infinite linear;
}
.loader::before,
.loader::after {
  content: "";
  grid-area: 1/1;
  margin: 2px;
  border: inherit;
  border-radius: 50%;
}
.loader::before {
  border-color: #70df99c9 #0000;
  animation: inherit;
  animation-duration: 0.5s;
  animation-direction: reverse;
}
.loader::after {
  margin: 8px;
}
@keyframes l16 {
  100% {
    transform: rotate(1turn);
  }
}
</style>
