<script setup lang="ts">
const tabs = useTabs()
</script>

<template>
  <div>
    <div class="">
      <TabSwitcher :tabs="tabs"/>
    </div>

    <slot/>
  </div>
</template>