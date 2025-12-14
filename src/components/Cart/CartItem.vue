<script setup lang="ts">
import { ref } from 'vue';
import type { Sneakers } from '../../types';
import { formatNumber } from '../../utils/formatNumber';

defineProps<Sneakers>()
const emit = defineEmits<{
    (e: 'handleAddCart'): void
}>()
const imgIsLoad = ref(false)
</script>

<template>
    <div class="border border-slate-100 p-4 rounded-xl">
        <div class="flex items-center gap-4">
            <div v-if="!imgIsLoad" class="w-[84] h-18 overflow-hidden">
                <v-skeleton-loader width="84" height="72" type="image" />
            </div>
            <img class="w-auto h-18" @load="imgIsLoad = true" :src="imageUrl" alt="Sneaker" />
            <div class="flex gap-1 flex-1 flex-col">
                <p class="text-[14px]">{{ title }}</p>
                <p class="font-bold">{{ formatNumber(price) }} руб.</p>
            </div>
            <button @click="emit('handleAddCart')" class="cursor-pointer hover:brightness-90">
                <img class="w-9" src="/close.svg" alt="close">
            </button>
        </div>
    </div>

</template>

<style scoped>
img {
    pointer-events: none;
    user-select: none;
}
</style>