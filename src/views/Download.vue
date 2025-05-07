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
// import { onMounted } from "vue";
// import { useRouter } from "vue-router";

// const router = useRouter();
// const downUrl = "/api/downApk";

// const downloadFile = () => {
//   window.location.href = downUrl;
//   setTimeout(() => router.push("/"), 3000);
// };

// onMounted(() => {
//   downloadFile();
// });
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

// const downUrl = "/api/downApk";
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
