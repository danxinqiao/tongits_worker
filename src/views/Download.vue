<template></template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const downUrl = "/api/downApk";

const downloadFile = () => {
  window.location.href = downUrl;
  setTimeout(() => router.push("/"), 3000);
};

onMounted(() => {
  downloadFile();
});
</script>
