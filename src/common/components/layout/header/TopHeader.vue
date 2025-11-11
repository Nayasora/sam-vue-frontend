<script setup lang="ts">
</script>

<template>
  <div class="top-header">
    <div class="top-header-left">
      <div class="dropdown-item">
        <span class="dropdown-text">Алматы</span>
        <img
          src="/top-bar/icons/chevron-down.svg"
          alt=""
          class="dropdown-icon"
        />
      </div>

      <div class="divider"></div>

      <div class="dropdown-item">
        <span class="dropdown-text">Русский</span>
        <img
          src="/top-bar/icons/chevron-down.svg"
          alt=""
          class="dropdown-icon"
        />
      </div>
    </div>

    <div class="top-header-center">
      <span class="center-text">Бесплатная доставка от 50 000 ₸</span>
    </div>

    <div class="top-header-right">
      <div class="text-item">
        <span class="link-text">Политика возврата товаров</span>
      </div>

      <div class="divider"></div>

      <div class="text-item">
        <span class="link-text">Помощь</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.top-header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 38px;
  padding: 8px 24px;
  background: #1677ff;
  overflow: hidden;
}

.top-header::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url('/top-bar/images/top-bar-background.png');
  background-size: cover;
  background-position: center;
  pointer-events: none;
}

.top-header-left {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0;
  z-index: 1;
}

.top-header-center {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}

.center-text {
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: white;
  white-space: nowrap;
}

.top-header-right {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0;
  z-index: 1;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
}

.dropdown-text {
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: white;
  white-space: nowrap;
}

.dropdown-icon {
  width: 12px;
  height: 12px;
  display: block;
  flex-shrink: 0;
}

.divider {
  width: 1px;
  height: 16px;
  margin: 0 12px;
  background: rgba(0, 0, 0, 0.06);
}

.text-item {
  display: flex;
  align-items: center;
}

.link-text {
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: white;
  white-space: nowrap;
}
</style>
