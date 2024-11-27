<template>
  <van-nav-bar fixed placeholder @click-right="onClickRight" class="nav-bar">
    <template #left>
      <van-icon
        name="bars"
        size="20"
        :color="useDarkMode() ? '#ffffff' : '#000'"
        @click="showPopup"
      />
    </template>
    <template #right>
      <svg-icon class="text-[18px]" :name="useDarkMode() ? 'light' : 'dark'" />
    </template>
  </van-nav-bar>
  <van-popup
    v-model:show="show"
    position="left"
    :style="{ height: '100%', width: '80%' }"
  />
</template>
<script setup lang="ts">
import { useDarkMode, useToggleDarkMode } from "@/hooks/useToggleDarkMode";
import { ref } from "vue";

const onClickRight = (event: TouchEvent | MouseEvent) => {
  useToggleDarkMode(event);
};
const show = ref(false);
const showPopup = () => {
  show.value = true;
};
</script>
<style scoped lang="scss">
:deep(.van-nav-bar--fixed) {
  z-index: 30 !important;
}
</style>
