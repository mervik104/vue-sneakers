<script setup lang="ts">
import { ref } from 'vue';
import type { Sneakers } from '../types';
import { flyToCart } from '../utils/flyto';
import { formatNumber } from '../utils/formatNumber';
import { storeToRefs } from 'pinia';
import { useState } from '../store/useState';


defineProps<Sneakers>()

const emit = defineEmits<{(e: 'handleSetLike'): void, (e: 'handleAddCart'): void}>()
const productRef = ref<any>(null)   
const buttonRef = ref<any>(null) 
const imgIsLoad = ref<boolean>(false)
const imgLikeIsLoad = ref<boolean>(false)
const {likesIsLoading} = storeToRefs(useState())
</script>

<template>
    <div v-if="imageUrl && title && price"
        class="bg-white p-8 flex flex-col gap-2 border transition-transform border-slate-100 rounded-3xl hover:-translate-y-2 hover:shadow-xl">
        <div class="relative">
            <button 
            @click="emit('handleSetLike')" 
            class="absolute active:brightness-90 hover:brightness-95 top-8 left-1 cursor-pointer">
                <div v-if="likesIsLoading && !imgLikeIsLoad" class="w-8 h-8 overflow-hidden">
                    <v-skeleton-loader class="rounded-2xl" width="32" height="32" type="image" />
                </div>
                <img v-else
                @load="() => imgLikeIsLoad = true"
                :src="isLiked ? '/like-2.svg' : '/like-1.svg'" 
                alt="like">
            </button>
            <img @load="() => {imgIsLoad = true}" ref="productRef" :src="imageUrl" 
            alt="sneakers">
            <v-skeleton-loader v-if="!imgIsLoad" type="image"></v-skeleton-loader> 
        </div>
        <div>
            <p>{{ title }}</p>
        </div>
        <div class="flex justify-between">
            <div class="flex flex-col">
                <p class="text-slate-400 uppercase">Цена:</p>
                <p class="font-bold">{{ formatNumber(price) }} руб</p>
            </div>
            <button 
            @click="emit('handleAddCart'); flyToCart(productRef, buttonRef)"
            ref="buttonRef"
            class="cursor-pointer active:brightness-90 hover:brightness-95">
                <img class="w-10" loading="lazy"
                :src="isAddedToCart ? '/checked.svg' : '/plus.svg'" 
                alt="Add to Cart">
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