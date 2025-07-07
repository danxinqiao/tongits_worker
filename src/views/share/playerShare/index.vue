<template>
  <div
    class="playerShare-scss"
    style="display: flex; flex-direction: column; align-items: center"
  >
    <div style="margin-top: 2vh; width: 100%">
      <van-button
        @click="openOrDownload"
        size="large"
        type="success"
        block
        color="linear-gradient(to right, #50c8dc, #68d0ac)"
      >
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
          v-if="isAndroid"
        >
          <img
            src="/images/playerShare/logo_pinoy.png"
            alt="btn_open"
            style="width: 32%; padding-left: 1%"
          />
        </div>
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
          v-else
        >
          <img
            src="/images/playerShare/logo_mania.png"
            alt="btn_open"
            style="width: 33%; padding-left: 1%"
          />
        </div>
      </van-button>
    </div>

    <div style="margin-top: 70vh; width: 50%">
      <van-button
        @click="copyContent"
        size="large"
        type="success"
        block
        color="linear-gradient(to right, #50c8dc, #68d0ac)"
        style="
          background-size: cover;
          background-position: center;
          height: 150px;
          border: none;
          color: transparent;
          box-shadow: none;
        "
      >
        <img
          src="/images/playerShare/btn_open.png"
          alt="btn_open"
          class="animated-image"
        />
      </van-button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import useClipboard from "vue-clipboard3";
import { showDialog } from "vant";
import { AesManager } from "../../../utils/AesManager";

const route = useRoute();
const { toClipboard } = useClipboard();

const sToken = ref("");
const sScene = ref("");
const sInviteCode = ref("");

const isiOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
const isAndroid = /Android/i.test(navigator.userAgent);

const onOpenThisPage = () => {
  const { token = "", scene = "", invite = "" } = route.query;
  sToken.value = token;
  sScene.value = scene;
  if (invite) {
    let code = invite.replace(/ /g, "+");
    code = AesManager.decrypt(code);
    sInviteCode.value = `-###${code}###-`;
  }
};

const canUseUniversalLink = () => {
  if (!isiOS) return false;
  if (/micromessenger|facebook|baidubrowser/i.test(navigator.userAgent))
    return false;
  const match = navigator.userAgent.match(/ OS (\d+)_/i);
  const version = match ? parseInt(match[1], 10) : 0;
  return version >= 9;
};

const goToDownload = () => {
  const url =
    import.meta.env.VITE_OFFICIAL_LINK || "https://www.tongitspinoy.com/";
  location.href = url;
};

const callSchema = (schema) => {
  if (isiOS) {
    location.href = schema;
  } else {
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = schema;
    document.body.appendChild(iframe);
  }
};

const openOrDownload = () => {
  const token = sToken.value;
  const scene = sScene.value;

  if (/micromessenger|facebook|baidubrowser/i.test(navigator.userAgent)) {
    showDialog({
      message: "Please open in your browser or download our app.",
    }).then(goToDownload);
    return;
  }

  if (canUseUniversalLink()) {
    location.href =
      import.meta.env.VITE_UNIVERSAL_LINK || "https://www.tongitspinoy.com/";
  } else {
    const complexSchema = `intent://protechmania?token=${encodeURIComponent(token)}&scene=${scene}#Intent;scheme=com.protechmania.maxfun;package=com.protechmania.maxfun;S.browser_fallback_url=${encodeURIComponent(import.meta.env.VITE_OFFICIAL_LINK || "https://www.tongitspinoy.com/")};end`;
    const simpleSchema = `com.protechmania.maxfun://protechmania?token=${encodeURIComponent(token)}&scene=${scene}`;

    const isModernChrome = /android\s.+chrome\/(\d+)/i.test(
      navigator.userAgent,
    );

    if (isModernChrome) {
      location.href = complexSchema;
    } else {
      callSchema(simpleSchema);
    }

    setTimeout(goToDownload, 600);
  }
};

const copyContent = () => {
  if (isAndroid) {
    toClipboard(sInviteCode.value).catch(() => {
      showDialog({ message: "Error copying invite code." });
    });
  } else {
    goToDownload();
  }
  openOrDownload();
};

onMounted(onOpenThisPage);
</script>

<style scoped>
.playerShare-scss {
  position: absolute;
  width: 100%;
  height: 100vh;
  background-size: 100% 100%;
  background-image: url("/images/playerShare/img.png");
}

.animated-image {
  width: 100%;
  animation: grow-shrink 1.5s infinite ease-in-out;
}

@keyframes grow-shrink {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
