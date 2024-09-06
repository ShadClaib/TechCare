<template>
  <!--BaseLayout-->
  <div class="text-sm flex flex-col bg-[#F6F7F8]">
    <div class="fixed w-full p-5 min-h-[var(--app-header-height)]">
      <slot name="header"></slot>
    </div>
    <div class="px-5 pt-[calc(var(--app-header-height)+3rem)] pb-5">
      <slot name="content"></slot>
    </div>
  </div>
  <!--/BaseLayout-->
</template>