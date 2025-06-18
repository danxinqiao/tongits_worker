<script>
export default {
  methods: {},
};
</script>

<template>
  <div class="header_container">
    <div class="header">
      <div class="header-content">
        <router-link to="home">
          <img src="/img_tg.png" alt="tg" />
        </router-link>
        <img src="/cutLine.png" width="1.5" height="35.5" class="divider" />
        <router-link to="home">
          <img src="/img_mania.png" alt="mania" />
        </router-link>
        <img src="/cutLine.png" width="1.5" height="35.5" class="divider" />
        <router-link to="home">
          <img src="/img_maniapro.png" alt="maniapro" />
        </router-link>
      </div>
    </div>
    <div class="banner">
      <span>A classic Tongits game for Filipinos!</span>
    </div>
  </div>
</template>

<style>
.header_container {
  position: relative;
  margin-bottom: 60px; /* 为 banner 留出空间 */
}

.header {
  background: linear-gradient(to bottom, rgb(0, 147, 239), rgb(0, 135, 234));
  padding: 10px 0;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
  height: 40px;
}

.header-content img {
  height: 52px; /* 固定高度 */
  width: auto; /* 宽度自动保持比例 */
  object-fit: contain; /* 等比例缩放 */
  display: block; /* 消除图片底部间隙 */
}

.header-content .divider {
  height: 35.5px; /* 保持原有设计高度 */
  margin: auto 0; /* 垂直居中 */
}

.banner {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(28, 120, 220, 0.9);
  color: white;
  text-align: center;
  padding: 8px 0;
  font-size: 14px;
  font-weight: 500;
}

.banner::before,
.banner::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  height: 15px;
  z-index: 1;
  pointer-events: none;
}

.banner::before {
  top: 0;
  background: linear-gradient(
    to bottom,
    rgba(28, 120, 220, 0.3) 0%,
    rgba(28, 120, 2205, 0) 100%
  );
}

.banner::after {
  bottom: 0;
  background: linear-gradient(
    to top,
    rgba(28, 120, 220, 0.3) 0%,
    rgba(28, 120, 220, 0) 100%
  );
}

.banner span {
  position: relative;
  z-index: 2;
}

/* 手机端样式 */
@media (max-width: 768px) {
  .header-content {
    justify-content: center;
    flex-wrap: nowrap; /* 强制不换行 */
    overflow: hidden; /* 隐藏溢出内容 */
    gap: 15px; /* 缩小间距 */
    padding: 0 10px;
    height: 40px; /* 保持与PC端一致的高度 */
  }

  /* 图片响应式处理 */
  .header-content img {
    height: 100%; /* 继承容器高度 */
    width: auto;
    max-width: 80px; /* 设置最大宽度 */
    transform: scale(0.9); /* 默认缩放 */
    transform-origin: center;
    transition: transform 0.3s;
  }

  /* 自动缩小逻辑 */
  @media (max-width: 400px) {
    /* 超小屏幕额外处理 */
    .header-content {
      gap: 8px;
    }
    .header-content img {
      max-width: 70px;
      transform: scale(0.85);
    }
    .divider {
      height: 30px !important;
    }
  }

  /* 通过JavaScript检测容器宽度动态调整(可选) */
  /* 需要配合ResizeObserver API */
}
</style>