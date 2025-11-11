<script setup lang="ts"></script>

<template>
  <button class="login-button">Войти</button>
</template>

<style scoped>
.login-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: #1677ff;
  border: 1px solid #1677ff;
  border-radius: 8px;
  padding: 0 16px;
  height: 40px;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
}

.login-button:hover {
  color: #4096ff;
  border-color: #4096ff;
}

.login-button:active {
  color: #0958d9;
  border-color: #0958d9;
}
</style>
