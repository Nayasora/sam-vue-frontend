<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Phone, MapPin, Clock } from 'lucide-vue-next'

const { t } = useI18n()
</script>

<template>
  <div class="hidden border-b border-border bg-muted/30 lg:block">
    <div class="container mx-auto px-4 lg:px-12">
      <div class="flex h-9 items-center justify-between text-xs">
        <!-- Left side - Info -->
        <div class="flex items-center gap-6 text-muted-foreground">
          <div class="flex items-center gap-1.5">
            <MapPin :size="14" />
            <span>{{ t('header.topbar.delivery') }}</span>
          </div>

          <div class="flex items-center gap-1.5">
            <Clock :size="14" />
            <span>{{ t('header.topbar.workingHours') }}</span>
          </div>
        </div>

        <!-- Right side - Contact & Language -->
        <div class="flex items-center gap-6">
          <a
            href="tel:+77017077076"
            class="flex items-center gap-1.5 transition-colors hover:text-primary"
          >
            <Phone :size="14" />
            <span>+7 (701) 707-70-76</span>
          </a>

          <div class="h-4 w-px bg-border" />

          <button
            class="font-medium transition-colors hover:text-primary"
            :aria-label="t('header.topbar.trackOrder')"
          >
            {{ t('header.topbar.trackOrder') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
