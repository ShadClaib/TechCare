<template>
  <!--MainLayout-->
  <div class="flex space-x-10">
    <div class="min-w-[--main-layout-sidebar-width] flex flex-col space-y-8">
      <slot name="sidebar"></slot>
    </div>
    <div class="grow flex flex-col space-y-8">
      <slot name="content"></slot>
    </div>
    <div class="min-w-[--main-layout-sidebar-width] flex flex-col space-y-8">
      <slot name="aside"></slot>
    </div>
  </div>
  <!--/MainLayout-->
</template>