<template>
  <van-nav-bar fixed placeholder @click-right="onClickRight">
    <template #left>
      <van-icon name="bars" size="20" @click="showPopup" :color="useDarkMode() ? '#ffffff' : '#000'" />
    </template>
    <template #right>
      <svg-icon class="text-[18px]" :name="useDarkMode() ? 'light' : 'dark'" />
    </template>
  </van-nav-bar>
  <van-popup v-model:show="show" position="left" :style="{ height: '100%', width: '80%' }" />
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
<style scoped lang="scss"></style>
