<script setup lang="ts">
import { addApi, getListApi, getListApiError, getMsgApi } from "@/api/mock";
import { reactive } from "vue";
import { showFailToast, showSuccessToast } from "vant";
import "vant/es/toast/style";
import Fa6SolidAddressBook from "@iconify-icons/fa6-solid/address-book";
import Fa6SolidAppleWhole from "@iconify-icons/fa6-solid/apple-whole";
import Fa6SolidBaby from "@iconify-icons/fa6-solid/baby";
import Fa6SolidBasketball from "@iconify-icons/fa6-solid/basketball";
import Fa6SolidBurger from "@iconify-icons/fa6-solid/burger";
import Fa6SolidChessKnight from "@iconify-icons/fa6-solid/chess-knight";
import { M } from "node_modules/vite/dist/node/types.d-aGj9QkWt";

defineOptions({
  name: "Tools"
});

const showList: string[] = reactive([]);

const handleSuccessReq = async () => {
  const data = { id: 4 };
  const res = await getMsgApi(data);
  showSuccessToast(res.user.name);
};
const handleErrorReq = async () => {
  const data = {
    name: "gm",
    age: 23
  };
  const res = await addApi(data);

  if (res) {
    showSuccessToast("添加成功");
  }
};

const iconOnlineList = [
  "material-symbols:admin-panel-settings-outline",
  "jam:android",
  "lucide:badge-check",
  "pixelarticons:heart",
  "fxemoji:alienmonster",
  "meteocons:thunderstorms-day-overcast-fill"
];
const iconOfflineList = [
  Fa6SolidAddressBook,
  Fa6SolidAppleWhole,
  Fa6SolidBaby,
  Fa6SolidBasketball,
  Fa6SolidBurger,
  Fa6SolidChessKnight
];
// 获取所有本地 svg 图标文件名称
const modules = import.meta.glob("../../icons/svg/*.svg", { eager: true });
const svgIconLocalList = Object.keys(modules).map(key =>
  key.replace("../../icons/svg/", "").replace(".svg", "")
);
</script>

<template>
  <div class="tools-content pt-[20px] px-[12px]">
    <!-- Mock -->
    <div class="pl-[12px] border-l-[3px] border-[color:#41b883] mb-[12px]">
      <h3 class="font-bold text-[18px] my-[4px]">Mock</h3>
    </div>
    <van-space>
      <van-button type="success" @click="handleSuccessReq">成功请求</van-button>
      <van-button type="danger" @click="handleErrorReq">失败请求</van-button>
    </van-space>
  </div>
</template>
