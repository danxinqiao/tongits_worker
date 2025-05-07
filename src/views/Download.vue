<template>
  <div>
    <a
      ref="downloadLink"
      :href="downUrl"
      download="TongitsPinoy.apk"
      style="display: none"
      >Download APK</a
    >
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const downUrl = import.meta.env.VITE_DOWN_OFFICIAL_APK;
const downloadLink = ref(null);
onMounted(() => {
  if (downloadLink.value) {
    downloadLink.value.click();
  }
  const router = useRouter();
  setTimeout(() => {
    router.push("/");
  }, 600);
});
</script>
