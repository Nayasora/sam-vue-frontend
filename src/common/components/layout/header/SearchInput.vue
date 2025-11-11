<script setup lang="ts"></script>

<template>
  <div class="search-container">
    <div class="search-input-wrapper">
      <input
        type="text"
        placeholder="Поиск"
        class="search-input"
      />
      <button class="mic-button" type="button" aria-label="Voice search">
        <img
          src="/mavbar-main/icons/progress-input-input-icon-audio-outlined.svg"
          alt=""
          class="h-[16px] w-[16px]"
        />
      </button>
    </div>
    <button class="search-button">Найти</button>
  </div>
</template>

<style scoped>
.search-container {
  display: flex;
  flex: 1;
  height: 40px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  overflow: hidden;
}

.search-input-wrapper {
  display: flex;
  align-items: center;
  flex: 1;
  padding: 0 12px;
  gap: 8px;
  background: white;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  line-height: 24px;
  color: rgba(0, 0, 0, 0.88);
  background: transparent;
}

.search-input::placeholder {
  color: rgba(0, 0, 0, 0.25);
}

.mic-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  transition: opacity 0.2s;
}

.mic-button:hover {
  opacity: 0.7;
}

.search-button {
  background: #1677ff;
  color: white;
  border: none;
  padding: 0 24px;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 0.2s;
}

.search-button:hover {
  background: #4096ff;
}

.search-button:active {
  background: #0958d9;
}
</style>
