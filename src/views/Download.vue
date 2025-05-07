<template></template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const downUrl = "/api/downApk";

onMounted(async () => {
  try {
    const response = await fetch(downUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("Download failed:", error);
  } finally {
    setTimeout(() => {
      router.push("/");
    }, 800);
  }
});
</script>
