<script setup lang="ts">
// const isClicked = ref<boolean>(false);

defineProps<{
  showContent: boolean
}>()
</script>

<template>
  <svg
      xmlns="http://www.w3.org/2000/svg"
       width="24"
       height="24"
       viewBox="0 0 24 24"
       fill="none"
       stroke="currentColor"
       stroke-width="2"
       stroke-linecap="round"
       stroke-linejoin="round"
       class="lucide lucide-plus-icon lucide-plus">
    <path
        class="horizontal-line"
        d="M5 12h14"
    />
    <path
        class="vertical-line"
        :class="{ 'rotate-90': showContent }"
        d="M12 5v14"
    />
  </svg>
</template>

<style scoped>

svg {
  @apply transition-all duration-300;
}

.vertical-line {
  transform-origin: center;
  transition: all 0.3s ease-in-out;
}

.vertical-line.rotate-90 {
  transform: rotate(90deg);
  opacity: 0.5;
}

</style>