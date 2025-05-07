<template></template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const downUrl = "/api/downApk";

const downloadFile = () => {
  const iframe = document.createElement("iframe");
  iframe.style.display = "none";
  iframe.src = downUrl;
  document.body.appendChild(iframe);

  iframe.onload = () => {
    router.push("/");
    document.body.removeChild(iframe);
  };
};

onMounted(() => {
  downloadFile();
});
</script>
