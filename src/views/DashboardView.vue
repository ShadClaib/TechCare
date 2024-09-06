<script setup>
import { onMounted, ref, watch } from 'vue'
import MainLayout from '@/components/MainLayout.vue'
import WidgetWrapper from '@/components/WidgetWrapper.vue'
import Grid from '@/components/Grid.vue'
import StatBox from '@/components/StatBox.vue'
import IconBullet from '@/components/IconBullet.vue'
import ProfileBadge from '@/components/ProfileBadge.vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

import respiratoryRateImage from '@/assets/images/respiratory-rate.svg'
import temperatureImage from '@/assets/images/temperature.svg'
import HeartBPMImage from '@/assets/images/HeartBPM.svg'

import BirthIcon from '@/assets/images/BirthIcon.svg'
import FemaleIcon from '@/assets/images/FemaleIcon.svg'
import PhoneIcon from '@/assets/images/PhoneIcon.svg'
import InsuranceIcon from '@/assets/images/InsuranceIcon.svg'

const profiles = ref([])
const profileSelected = ref()
const dataPointSelected = ref()

const chartData = ref({
  labels: [],
  datasets: [
    {
      label: 'Data One',
      borderColor: '#E66FD2',
      backgroundColor: '#E66FD2',
      pointRadius: 5,
      data: [],
      tension: 0.4
    },
    {
      label: 'Data Two',
      borderColor: '#8C6FE6',
      backgroundColor: '#8C6FE6',
      pointRadius: 5,
      data: [],
      tension: 0.4
    }
  ]
})

const chartOptions = {
  responsive: true,
  onClick: (event) => {
    const r = event.chart.getElementsAtEventForMode(
      event,
      'nearest',
      { intersect: true },
      true
    );
    if (r.length === 0) {
      return;
    }
    dataPointSelected.value = event.chart.data.datasets[r[0].datasetIndex].data[r[0].index].v
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: false,
  }
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

watch(profileSelected, (profile) => {
  const data = profile.diagnosis_history.slice(0, 6).reverse()
  const labels = data.reduce((a, v) => [...a, `${v.month.substring(0, 3)}, ${v.year}`], [])
  const dataset1 = data.reduce((a, v) => [...a, { x: `${v.month.substring(0, 3)}, ${v.year}`, y: v.blood_pressure.systolic.value, v: JSON.parse(JSON.stringify(v)) }], [])
  const dataset2 = data.reduce((a, v) => [...a, { x: `${v.month.substring(0, 3)}, ${v.year}`, y: v.blood_pressure.diastolic.value, v: JSON.parse(JSON.stringify(v)) }], [])
  dataPointSelected.value = JSON.parse(JSON.stringify(data[0]))
  chartData.value = {
    labels,
    datasets: [
      {
        label: 'Systolic',
        borderColor: '#E66FD2',
        backgroundColor: '#E66FD2',
        pointRadius: 5,
        data: dataset1,
        tension: 0.4
      },
      {
        label: 'Diastolic',
        borderColor: '#8C6FE6',
        backgroundColor: '#8C6FE6',
        pointRadius: 5,
        data: dataset2,
        tension: 0.4
      }
    ]
  }
}, { deep: true })

onMounted(async () => {

  //using coalition skills test resource
  const token = btoa(`coalition:skills-test`);
  const data = await fetch("https://fedskillstest.coalitiontechnologies.workers.dev", { headers: { Authorization: `Basic ${token}` } }).then(r => r.json())

  profiles.value = data
  profileSelected.value = data.find(p => p.name === "Jessica Taylor")
})

</script>
<template>
  <MainLayout>
    <template #sidebar>
      <WidgetWrapper :title="'Patients'">
        <template #menu>
          <img src="@/assets/images/search_FILL0_wght300_GRAD0_opsz24.svg" />
        </template>
        <template #content>
          <div>
            <ul class="[&>li]:px-5 [&>li]:py-4">
              <li v-for="(profile, index) in profiles" v-bind:key="index"
                :class="{ 'cursor-pointer': true, 'bg-[--activestate_bg_2]': profileSelected.name === profile.name }"
                @click="profileSelected = profile">
                <ProfileBadge :photo="profile.profile_picture" :photo2x="profile.profile_picture" :name="profile.name"
                  :title="`${profile.gender}, ${profile.age}`" class="w-full" :after="true">
                  <template #after>
                    <img src="@/assets/images/more_horiz_FILL0_wght300_GRAD0_opsz24.svg" />
                  </template>
                </ProfileBadge>
              </li>
            </ul>
          </div>
        </template>
      </WidgetWrapper>
    </template>
    <template #content>
      <WidgetWrapper :title="'Diagnosis History'">
        <template #content>
          <div class="m-5 flex flex-col space-y-8">
            <div class="flex space-x-8 bg-[#F4F0FE] p-5 rounded-xl">
              <div class="basis-3/4">
                <div class="flex items-center justify-between">
                  <h2 class="text-lg font-semibold mb-3">Blood Pressure</h2>
                  <div>Last 6 months <img src="@/assets/images/expand_more_FILL0_wght300_GRAD0_opsz24.svg"
                      class="inline-block ms-4" /></div>
                </div>
                <div class="w-[calc(100vw-75rem)]">
                  <Line :data="chartData" :options="chartOptions" />
                </div>
              </div>
              <div class="basis-1/4">
                <div>
                  <div class="inline-flex items-center space-x-2"><i
                      class="w-[.875rem] h-[.875rem] bg-[#E66FD2] border border-white rounded-full inline-block">&nbsp;</i>
                    <span class="font-medium">Systolic</span>
                  </div>
                  <span class="block text-xl font-semibold">{{ dataPointSelected?.blood_pressure.systolic.value
                    }}</span>
                  <span class="block mt-3">{{ dataPointSelected?.blood_pressure.systolic.levels }}</span>
                </div>
                <hr class="border-[#cbc8d4] my-4" />
                <div>
                  <div class="inline-flex items-center space-x-2"><i
                      class="w-[.875rem] h-[.875rem] bg-[#8C6FE6] border border-white rounded-full inline-block">&nbsp;</i>
                    <span class="font-medium">Diastolic</span>
                  </div>
                  <span class="block text-xl font-semibold">{{ dataPointSelected?.blood_pressure.diastolic.value
                    }}</span>
                  <span class="block mt-3">{{ dataPointSelected?.blood_pressure.diastolic.levels }}</span>
                </div>
              </div>
            </div>
            <Grid class="grid-cols-3 gap-5">
              <StatBox :icon="respiratoryRateImage" :label="'Respiratory Rate'"
                :stat="`${dataPointSelected?.respiratory_rate.value} bpm`" class="bg-[#E0F3FA]">
                <template #after>
                  {{ dataPointSelected?.respiratory_rate.levels }}
                </template>
              </StatBox>
              <StatBox :icon="temperatureImage" :label="'Temperature'"
                :stat="`${dataPointSelected?.temperature.value}°F`" class="bg-[#FFE6E9]">
                <template #after>
                  {{ dataPointSelected?.temperature.levels }}
                </template>
              </StatBox>
              <StatBox :icon="HeartBPMImage" :label="'Heart Rate'" :stat="`${dataPointSelected?.heart_rate.value} bpm`"
                class="bg-[#FFE6F1]">
                <template #after>
                  {{ dataPointSelected?.heart_rate.levels }}
                </template>
              </StatBox>
            </Grid>
          </div>
        </template>
      </WidgetWrapper>
      <WidgetWrapper :title="'Diagnosis List'">
        <template #content>
          <div class="p-5">
            <div class="table table-fixed border-collapse w-full">
              <div class="table-header-group">
                <div
                  class="table-row [&>.table-cell]:font-semibold [&>.table-cell]:bg-[#F6F7F8] [&>.table-cell]:px-5 [&>.table-cell]:py-4 [&>.table-cell:first-child]:rounded-l-full [&>.table-cell:last-child]:rounded-r-full">
                  <div class="table-cell">Problem/Diagnosis</div>
                  <div class="table-cell">Description</div>
                  <div class="table-cell">Status</div>
                </div>
              </div>
              <div
                class="table-row-group [&>.table-row>.table-cell]:px-5 [&>.table-row>.table-cell]:py-4 [&>.table-row>.table-cell]:border-[#F6F7F8] [&>.table-row:not(:last-child)>.table-cell]:border-b">
                <div v-for="(item, index) in profileSelected?.diagnostic_list" v-bind:key="index" class="table-row">
                  <div class="table-cell">
                    {{ item.name }}
                  </div>
                  <div class="table-cell">
                    {{ item.Description }}
                  </div>
                  <div class="table-cell">
                    {{ item.status }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </WidgetWrapper>
    </template>
    <template #aside>
      <WidgetWrapper :decorate="false">
        <template #content>
          <header class="px-5 pt-5">
            <picture>
              <source media="(min-width:650px)" :srcset="profileSelected?.profile_photo" />
              <img :src="profileSelected?.profile_picture" :alt="profileSelected?.name"
                class="w-[12.5rem] block mx-auto mt-3" />
            </picture>
            <h2 class="text-2xl font-bold text-center my-5">{{ profileSelected?.name }}</h2>
          </header>
          <div class="px-5 pb-5">
            <ul class="[&>li]:my-6">
              <li>
                <IconBullet :icon="BirthIcon" :label="'Date Of Birth'" :text="profileSelected?.date_of_birth" />
              </li>
              <li>
                <IconBullet :icon="FemaleIcon" :label="'Gender'" :text="profileSelected?.gender" />
              </li>
              <li>
                <IconBullet :icon="PhoneIcon" :label="'Contact Info.'" :text="profileSelected?.phone_number" />
              </li>
              <li>
                <IconBullet :icon="PhoneIcon" :label="'Emergency Contacts'"
                  :text="profileSelected?.emergency_contact" />
              </li>
              <li>
                <IconBullet :icon="InsuranceIcon" :label="'Insurance Provider'"
                  :text="profileSelected?.insurance_type" />
              </li>
            </ul>
            <button
              class="text-center font-semibold block px-12 py-2.5 rounded-full bg-[--activestate_bg_1] mx-auto">Show All
              Information</button>
          </div>
        </template>
      </WidgetWrapper>
      <WidgetWrapper :title="'Lab Results'">
        <template #content>
          <div class="p-5">
            <ul class="[&>li]:flex [&>li]:items-center [&>li]:justify-between [&>li]:px-5 [&>li]:py-2.5">
              <li v-for="(result, index) in profileSelected?.lab_results" v-bind:key="index">
                <span>{{ result }}</span>
                <img src="@/assets/images/download_FILL0_wght300_GRAD0_opsz24-(1).svg" />
              </li>
            </ul>
          </div>
        </template>
      </WidgetWrapper>
    </template>
  </MainLayout>
</template>