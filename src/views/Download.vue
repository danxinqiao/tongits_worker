<template>
  <div>
    <a
      ref="downloadLink"
      :href="downUrl"
      download="TongitsPinoy.apk"
      style="display: none"
      target="_blank"
    ></a>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const downUrl = "/load/downloadApk";
const downloadLink = ref(null);
const isIOS = ref(false);
const isMobile = ref(false);

const checkDevice = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  // 检测iOS设备
  isIOS.value = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
  // 检测移动端设备
  isMobile.value =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    );
};

onMounted(() => {
  checkDevice();
  if (isMobile.value && !isIOS.value) {
    if (downloadLink.value) {
      downloadLink.value.click();
    }
  }

  const router = useRouter();
  setTimeout(() => {
    router.push("/");
  }, 600);
});
</script>
