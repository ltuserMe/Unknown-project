<template>
  <van-tabbar v-model="active" :placeholder="true" :route="true" fixed inactive-color="gray"
    :active-color="useDarkMode() ? '#fff' : '#000'">
    <van-tabbar-item v-for="(item, index) in tabbarData" :key="index" :to="item.to" size="20ox">
      {{ item.title }}
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
import { useDarkMode } from "@/hooks/useToggleDarkMode";
import { ref, reactive } from "vue";

const active = ref(0);
const tabbarData = reactive([
  {

    title: "首页",
    to: {
      name: "Demo"
    }
  },
  {

    title: "消息",
    to: {
      name: "Tools"
    }
  },
  {

    title: "我",
    to: {
      name: "About"
    }
  }
]);
</script>
<style scoped>
:deep(.van-tabbar-item) {
  font-size: 14px;
  font-weight: 600;
}
</style>
