<template>
  <div class="audio-container">
    <div class="flex items-center">
      <input
          type="range"
          min="0"
          :max="duration"
          step="0.01"
          v-model="currentTime"
          class="w-full"
          @input="seek"
      > <a href="#" @click.prevent class="button-play" @click="toggle">
      <IconPlay v-if="!isPlaying"/>
      <IconStop v-if="isPlaying"/>
    </a>
    </div>
    <audio ref="audio" :src="audioSrc" preload="metadata"></audio>
  </div>
</template>

<script setup lang="ts">

import IconPlay from "~/components/icons/IconPlay.vue";
import IconStop from "~/components/icons/IconStop.vue";

defineProps<{
  audioSrc: string;
}>()

const audio = ref<HTMLAudioElement | null>(null)
const isPlaying = ref<boolean>(false)
const currentTime = ref<number>(0)
const duration = ref<number>(0)

const toggle = () => {
  if (!audio.value) return

  if (audio.value.paused) {
    audio.value.play()
    isPlaying.value = true
  } else {
    audio.value.pause()
    isPlaying.value = false
  }
}

const seek = () => {
  if (audio.value) {
    audio.value.currentTime = currentTime.value
  }
}

const formatTime = (time: Number) => {
  if (!time) return '0:00'
  const m = Math.floor(time / 60)
  const s = Math.floor(time % 60)

  return `${ m }:${ s.toString().padStart(2, '0') }`
}

onMounted(() => {
  document.body.style.overflow = "hidden"

  if (!audio.value) return

  audio.value.onloadedmetadata = () => {
    duration.value = audio.value!.duration
  }

  audio.value.ontimeupdate = () => {
    currentTime.value = audio.value!.currentTime
  }

  audio.value.onended = () => {
    isPlaying.value = false
    currentTime.value = 0
  }
})

onBeforeUnmount(() => {
  document.body.style.overflow = ""
  audio.value?.pause()
})
</script>

<style scoped lang="postcss">
.audio-container {
  @apply bg-[#0A0A0A] rounded-full border border-white/10 pl-4;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
}

.button-play {
  @apply inline-block rounded-full relative z-20 p-[0.625rem] ml-6;
  background: linear-gradient(135deg, #132222 0%, #041313 100%);
}

.button-play::before {
  @apply rounded-full pointer-events-none;

  content: '';
  position: absolute;
  inset: 0;

  padding: 1px;

  background: linear-gradient(60deg, #4f5e5e 0%, #1a2e25 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;

  mask-composite: exclude;
}

input[type="range"] {
  @apply w-full outline-none rounded-full bg-transparent appearance-none;

  height: 4px;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;
  tap-highlight-color: transparent;

  padding: 24px 0;
  margin: -24px 0;
}

input[type="range"]::-webkit-slider-thumb {
  @apply rounded-full;

  appearance: none;
  width: 5px;
  height: 24px;
  background: radial-gradient(
      circle at top,
      rgba(255, 255, 255, 0.9),
      rgba(255, 255, 255, 0.1) 40%,
      rgba(255, 255, 255, 0.1) 60%,
      rgba(255, 255, 255, 0.05)
  );
  box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.5),
  inset 0 -3px 6px rgba(0, 0, 0, 0.5),
  0 6px 16px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  margin-top: -10px;
}


input[type="range"]::-webkit-slider-runnable-track {
  -webkit-appearance: none;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 9999px;
}

input[type="range"]::-moz-range-thumb {
  @apply rounded-full;

  appearance: none;
  width: 5px;
  height: 24px;
  border: none;
  background: radial-gradient(
      circle at top,
      rgba(255, 255, 255, 0.9),
      rgba(255, 255, 255, 0.1) 40%,
      rgba(255, 255, 255, 0.1) 60%,
      rgba(255, 255, 255, 0.05)
  );
  box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.6),
  inset 0 -3px 6px rgba(0, 0, 0, 0.4),
  0 6px 16px rgba(0, 0, 0, 0.6);
  cursor: pointer;
}

input[type="range"]::-moz-range-track {
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 9999px;
}
</style>