<template>
  <footer class="bg-white border-t border-[rgba(0,0,0,0.06)] py-12 px-6">
    <div class="max-w-[1440px] mx-auto">
      <div class="flex gap-6 mb-6">
        <div class="flex-1 flex flex-col justify-between">
          <div class="flex gap-6 mb-12">
            <a href="#" class="nav-link">О нас</a>
            <a href="#" class="nav-link">Новости</a>
            <a href="#" class="nav-link">Контакты</a>
            <a href="#" class="nav-link">Доп. раздел</a>
          </div>

          <div class="flex flex-col gap-4">
            <div class="logo-container">
              <img src="/logo.svg" alt="SAM" class="logo-image" />
            </div>
            <p class="description">
              Quality materials, good designs, professional craftsmanship and sustainability.
            </p>
          </div>
        </div>

        <div class="info-card support-card">
          <div class="card-header">
            <h3 class="card-title">Cлужбу поддержки</h3>
            <div class="divider"></div>
          </div>

          <div class="contact-list">
            <div class="contact-item">
              <img src="/footer/icons/phone.svg" alt="" class="contact-icon" />
              <span class="contact-text">+7 (707) 777 89 76</span>
            </div>
            <div class="contact-item">
              <img src="/footer/icons/chat-bubble-empty.svg" alt="" class="contact-icon" />
              <span class="contact-text">+7 778 701 23 45</span>
            </div>
            <div class="contact-item">
              <img src="/footer/icons/mail.svg" alt="" class="contact-icon" />
              <span class="contact-text">Office@Sammarket.gmail.com</span>
            </div>
          </div>
        </div>

        <div class="info-card newsletter-card">
          <div class="card-header">
            <h3 class="card-title">Будьте всегда в курсе!</h3>
            <div class="divider"></div>
            <p class="card-description">
              Получайте уведомления о новых товарах, скидках и статьях.
            </p>
          </div>

          <form class="newsletter-form" @submit.prevent="handleSubscribe">
            <input
              type="email"
              placeholder="Email"
              class="email-input"
              v-model="email"
              required
            />
            <button type="submit" class="subscribe-button">
              Подписаться
            </button>
          </form>
        </div>
      </div>

      <div class="divider-horizontal"></div>

      <div class="footer-bottom">
        <p class="copyright">© 2024 SAM Market. All Rights Reserved.</p>
        <div class="social-links">
          <a href="#" class="social-link" aria-label="Facebook">
            <img src="/footer/icons/FacebookFilled.svg" alt="Facebook" />
          </a>
          <a href="#" class="social-link" aria-label="Instagram">
            <img src="/footer/icons/InstagramFilled.svg" alt="Instagram" />
          </a>
          <a href="#" class="social-link" aria-label="Twitter">
            <img src="/footer/icons/TwitterSquareFilled.svg" alt="Twitter" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')

const handleSubscribe = () => {
  if (email.value) {
    console.log('Subscribing:', email.value)
    email.value = ''
  }
}
</script>

<style scoped>
.nav-link {
  font-size: 14px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.65);
  text-decoration: none;
  transition: color 0.2s;
}

.nav-link:hover {
  color: rgba(0, 0, 0, 0.88);
}

.logo-container {
  height: 44px;
  width: 90.52px;
}

.logo-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.description {
  font-size: 14px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.65);
}

.info-card {
  background: #e6f4ff;
  border-radius: 24px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.support-card {
  width: 344px;
  min-height: 205px;
  justify-content: flex-end;
}

.newsletter-card {
  flex: 1;
}

.card-header {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.card-title {
  font-size: 20px;
  line-height: 28px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.88);
  margin: 0;
}

.divider {
  width: 100%;
  height: 1px;
  background: rgba(0, 0, 0, 0.06);
  margin: 4px 0;
}

.card-description {
  font-size: 14px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.65);
  margin: 0;
}

.contact-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.contact-icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

.contact-text {
  font-size: 16px;
  line-height: 24px;
  color: rgba(0, 0, 0, 0.88);
}

.newsletter-form {
  display: flex;
  gap: 8px;
}

.email-input {
  flex: 1;
  height: 32px;
  padding: 0 12px;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  font-size: 14px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.88);
  transition: border-color 0.2s;
}

.email-input::placeholder {
  color: rgba(0, 0, 0, 0.25);
}

.email-input:hover {
  border-color: #1677ff;
}

.email-input:focus {
  outline: none;
  border-color: #1677ff;
  box-shadow: 0 0 0 2px rgba(22, 119, 255, 0.1);
}

.subscribe-button {
  height: 32px;
  padding: 0 16px;
  background: #1677ff;
  border: 1px solid #1677ff;
  border-radius: 6px;
  color: white;
  font-size: 14px;
  line-height: 22px;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.subscribe-button:hover {
  background: #4096ff;
  border-color: #4096ff;
}

.subscribe-button:active {
  background: #0958d9;
  border-color: #0958d9;
}

.divider-horizontal {
  width: 100%;
  height: 1px;
  background: rgba(0, 0, 0, 0.06);
  margin: 24px 0;
}

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.copyright {
  font-size: 14px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.65);
  margin: 0;
}

.social-links {
  display: flex;
  gap: 16px;
}

.social-link {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s;
}

.social-link:hover {
  opacity: 0.7;
}

.social-link img {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
