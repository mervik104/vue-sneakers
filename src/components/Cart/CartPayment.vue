<script setup lang="ts">
import { formatNumber } from '../../utils/formatNumber';


defineProps<{
    cartPrice: number,
}>()

const emit = defineEmits<{
    (e: 'createOrder'): void
}>()

</script>

<template>
    <div class="mt-4 flex gap-3 flex-col bottom-0">
        <div class="flex gap-3">
            <span>Итого:</span>
            <div class="flex-1 border-b-2 border-dotted mb-1.5 border-gray-200"></div>
            <span class="font-bold">{{formatNumber(cartPrice)}} руб.</span>
        </div>
        <button
            @click="emit('createOrder')"
            class="bg-lime-500 disabled:bg-slate-400 cursor-pointer transition-colors duration-400 hover:bg-lime-600 active:bg-lime-700 rounded-xl outline-0 w-full p-3 text-white">
            Оформить заказ</button>
    </div>
</template>