<script setup>
import { RouterView } from 'vue-router'
import BaseLayout from '@/components/BaseLayout.vue'
import IconRouterLink from '@/components/IconRouterLink.vue'
import ProfileBadge from '@/components/ProfileBadge.vue'

import ProfilePhoto from '@/assets/images/senior-woman-doctor-and-portrait-smile-for-health-2023-11-27-05-18-16-utc.png'
import ProfilePhoto2x from '@/assets/images/senior-woman-doctor-and-portrait-smile-for-health-2023-11-27-05-18-16-utc@2x.png'

import HomeIcon from '@/assets/images/home_FILL0_wght300_GRAD0_opsz24.svg'
import PatientsIcon from '@/assets/images/group_FILL0_wght300_GRAD0_opsz24.svg'
import CalendarIcon from '@/assets/images/calendar_today_FILL0_wght300_GRAD0_opsz24.svg'
import MessageIcon from '@/assets/images/chat_bubble_FILL0_wght300_GRAD0_opsz24.svg'
import TransactionsIcon from '@/assets/images/credit_card_FILL0_wght300_GRAD0_opsz24.svg'
</script>

<template>
  <BaseLayout>
    <template #header>
      <div class="flex items-center rounded-full bg-white shadow h-[--app-header-height] px-8">
        <div class="basis-1/4">
          <img src="@/assets/images/TestLogo.svg" alt="Tech.Care" />
        </div>
        <div class="basis-2/4 flex items-center justify-center">
          <nav>
          <ul class="flex items-center space-x-8">
            <li>
              <IconRouterLink :to="{ name: 'overview' }" :icon="HomeIcon" :text="'Overview'" />
            </li>
            <li>
              <IconRouterLink :to="{ name: 'patients' }" :icon="PatientsIcon" :text="'Patients'" />
            </li>
            <li>
              <IconRouterLink :to="{ name: 'patients' }" :icon="CalendarIcon" :text="'Schedule'" />
            </li>
            <li>
              <IconRouterLink :to="{ name: 'patients' }" :icon="MessageIcon" :text="'Message'" />
            </li>
            <li>
              <IconRouterLink :to="{ name: 'patients' }" :icon="TransactionsIcon" :text="'Transactions'" />
            </li>
          </ul>
        </nav>
        </div>
        <div class="basis-1/4 flex items-center space-x-3 justify-end">
          <ProfileBadge :photo="ProfilePhoto" :photo2x="ProfilePhoto2x" :name="'Dr. Jose Simmons'" :title="'General Practitioner'" class="border-r me-2 pe-2" />
          <img src="@/assets/images/settings_FILL0_wght300_GRAD0_opsz24.svg" />
          <img src="@/assets/images/more_vert_FILL0_wght300_GRAD0_opsz24.svg" />
        </div>
      </div>
    </template>
    <template #content>
      <RouterView />
    </template>
  </BaseLayout>
</template>
