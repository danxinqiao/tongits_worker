<template>
  <div
    class="playerShare-scss"
    style="
      display: flex;
      display: -webkit-flex;
      flex-direction: column;
      align-items: center;
    "
  >
    <div style="margin-top: 8vh; width: 80%">
      <van-button @click="copyContent" size="large" type="success" block>
        <img src="/images/logo2.png" alt="btn_open" style="width: 100%" />
      </van-button>
    </div>
    <!-- 跳转按钮 -->
    <div style="margin-top: 35vh; width: 50%">
      <van-button
        @click="copyContent"
        size="large"
        type="success"
        block
        style="height: 60px"
      >
        <div class="btn_down">Download</div>
      </van-button>
    </div>

    <div style="margin-top: 5vh; width: 80%">
      <van-button @click="copyContent" size="large" type="success" block>
        <img src="/images/share/text.png" alt="btn_open" style="width: 100%" />
      </van-button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import useClipboard from "vue-clipboard3";
import { checkCustomerLinkApi } from "../../../api/shareMgr";

// ----------------------------------------------------------------------- 属性start

const sCustomerId = ref("");
const sCustomerName = ref("");
// ----------------------------------------------------------------------- 属性end

onMounted(() => {
  onOpenThisPage();
});

const onOpenThisPage = () => {
  // sCustomerId.value = route.query?.customerId ? route.query.customerId : "";
  // sCustomerName.value = route.query?.customer ? route.query.customer : "";
  const fullUrl = window.location.href;
  const hashPart = fullUrl.split("#")[1];
  const queryString = hashPart.split("?")[1];
  const urlParams = new URLSearchParams(queryString);
  sCustomerId.value = urlParams.get("customerId") || "";
  sCustomerName.value = urlParams.get("customer") || "";
  onCheckCustomerLink();
};

// 验证客服链接是否有效
const onCheckCustomerLink = async () => {
  let reqParam = {
    sCustomerId: sCustomerId.value || "",
    sCustomerName: sCustomerName.value || "",
  };
  await checkCustomerLinkApi(reqParam)
    .then(() => {})
    .catch(() => {});
};

const { toClipboard } = useClipboard();
const copyContent = () => {
  let sCopyValue = "-$$$" + sCustomerId.value + "$$$-";
  toClipboard(sCopyValue);
  window.location.href =
    "https://play.google.com/store/apps/details?id=com.tongits.playpinoy";
};
</script>

<style scoped>
.playerShare-scss {
  width: 100%;
  height: 100vh;
  background-size: 100% 100%;
  background-image: url("/images/share/bg_big.png");
}

.btn_down {
  font-size: 25px;
  width: 100%;
  background: linear-gradient(to right, #eabf4b, #ffb36d);
  color: white;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
}
</style>
