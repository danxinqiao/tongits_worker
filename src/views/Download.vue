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

const downUrl = "/api/downloadApk";
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
