<script setup lang="ts">
const tabs = useTabs()
</script>

<template>

  <TabSwitcher :tabs="tabs"/>

  <slot/>

</template>