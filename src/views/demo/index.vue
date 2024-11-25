<template>
  <div class="demo-content px-[12px]">



  </div>
</template>

<script setup lang="ts">


defineOptions({
  name: "Demo"
});
import { useLoadingStore } from "@/store/modules/loading";

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
fetchData();


</script>
<style scoped></style>
