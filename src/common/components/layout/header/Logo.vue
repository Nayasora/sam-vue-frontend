<script setup lang="ts">
import { RouterLink } from 'vue-router'

interface LogoProps {
  to?: string
  size?: 'sm' | 'md' | 'lg'
}

withDefaults(defineProps<LogoProps>(), {
  to: '/',
  size: 'md'
})

const sizes = {
  sm: 'w-16 h-8',
  md: 'w-[90px] h-11',
  lg: 'w-28 h-14'
}
</script>

<template>
  <RouterLink
    :to="to"
    class="inline-flex flex-col items-start gap-0.5"
    aria-label="SAM Market Home"
  >
    <div :class="['relative', sizes[size]]">
      <!-- SAM Logo SVG -->
      <svg
        viewBox="0 0 88 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="w-full h-full"
      >
        <!-- Frame/Background -->
        <rect
          width="21"
          height="21"
          rx="4"
          fill="hsl(var(--primary))"
        />

        <!-- SAM Text -->
        <path
          d="M28 4.5C28 4.22386 28.2239 4 28.5 4H32C34.2091 4 36 5.79086 36 8C36 9.30622 35.3765 10.4626 34.4246 11.2L37.7071 14.4853C37.8946 14.6728 37.8946 14.9788 37.7071 15.1663L36.6464 16.227C36.4589 16.4145 36.1528 16.4145 35.9653 16.227L32.6829 12.9446C32.6098 12.8715 32.5 12.9228 32.5 13.0257V16.5C32.5 16.7761 32.2761 17 32 17H30.5C30.2239 17 30 16.7761 30 16.5V13H28.5C28.2239 13 28 12.7761 28 12.5V4.5ZM30 6V11H32C33.1046 11 34 10.1046 34 9V8C34 6.89543 33.1046 6 32 6H30Z"
          fill="white"
        />
        <path
          d="M42 4.5C42 4.22386 42.2239 4 42.5 4H44.5C44.7761 4 45 4.22386 45 4.5V10.8787L49.1464 6.73223C49.3415 6.53697 49.6585 6.53697 49.8536 6.73223L51.2678 8.14645C51.4631 8.34171 51.4631 8.65829 51.2678 8.85355L47.1213 13H52.5C52.7761 13 53 13.2239 53 13.5V16.5C53 16.7761 52.7761 17 52.5 17H42.5C42.2239 17 42 16.7761 42 16.5V4.5Z"
          fill="white"
        />
        <path
          d="M57 4.5C57 4.22386 57.2239 4 57.5 4H60C62.7614 4 65 6.23858 65 9V12C65 14.7614 62.7614 17 60 17H57.5C57.2239 17 57 16.7761 57 16.5V4.5ZM59 6V15H60C61.6569 15 63 13.6569 63 12V9C63 7.34315 61.6569 6 60 6H59Z"
          fill="white"
        />
        <path
          d="M70 10.5C70 10.2239 70.2239 10 70.5 10H72C74.2091 10 76 11.7909 76 14C76 16.2091 74.2091 18 72 18H70.5C70.2239 18 70 17.7761 70 17.5V10.5ZM72 12H72.5C73.3284 12 74 12.6716 74 13.5V14.5C74 15.3284 73.3284 16 72.5 16H72V12Z"
          fill="white"
        />
        <circle cx="81.5" cy="14.5" r="2.5" fill="hsl(var(--primary))" />
        <circle cx="86.5" cy="14.5" r="1.5" fill="hsl(var(--primary))" />
      </svg>
    </div>

    <!-- MARKET Text -->
    <span class="text-[10px] font-medium tracking-[0.2em] text-foreground -mt-1">
      MARKET
    </span>
  </RouterLink>
</template>
