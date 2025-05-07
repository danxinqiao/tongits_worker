<template></template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const downUrl = "/api/downApk";

router.push(downUrl);
</script>
