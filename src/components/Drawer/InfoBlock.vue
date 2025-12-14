<script setup lang="ts">
import { ref } from 'vue';
import CartHeader from '../Cart/CartHeader.vue';


defineProps<{
    desc: string,
    src: string,
}>()

const emit = defineEmits<{
    (e: 'callback'): void
    (e: 'closeDrawer'): void
}>()

const imgIsLoad = ref(false)

</script>

<template>
    <div class="flex flex-col gap-30 p-5 h-auto">
        <CartHeader @close-drawer="() => emit('closeDrawer')" />
        <div
            class="flex max-w-70 gap-4 xl:mt-40 lg:mt-35 sm:mt-30 flex-col mx-auto text-center justify-center items-center h-full">
            <div v-if="!imgIsLoad" class="w-40 h-40 overflow-hidden">
                <v-skeleton-loader width="160" height="160" type="image" />
            </div>
            <img class="w-40 h-auto" @load="imgIsLoad = true" :src="src" alt="">
            <div class="flex flex-col gap-2">
                <h3 class="text-2xl font-bold">
                    <slot></slot>
                </h3>
                <p class="text-gray-600 text-sm">{{ desc }}</p>
            </div>
            <button @click="emit('callback')" class="bg-lime-500 transition outline-0 duration-400 flex gap-3 justify-center mx-auto items-center rounded-2xl p-10 py-3 w-full text-white
        hover:bg-lime-600 hover mt-2">
                <span><svg class="rotate-180" xmlns="http://www.w3.org/2000/svg" width="16" height="14"
                        viewBox="0 0 16 14" fill="none">
                        <path d="M1 7H14.7143" stroke="white" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path d="M8.71436 1L14.7144 7L8.71436 13" stroke="white" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg></span>
                <span>Вернуться назад</span>
            </button>
        </div>
    </div>
</template>