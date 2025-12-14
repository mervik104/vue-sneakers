<script setup lang="ts">
import Card from './Card.vue';
import type { Sneakers } from '../types';

defineProps<{sneakers: Sneakers[]}>()
const emit = defineEmits<{
    (e: 'setLike', sneaker: Sneakers): void
    (e: 'handleAddCart', sneaker: Sneakers): void
}>()

</script>

<template>
    <div v-auto-animate class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-10 items-baseline">
        <Card v-for="sneaker in sneakers" 
        :key="sneaker.id" 
        v-bind="sneaker"
        @handleSetLike="() => emit('setLike', sneaker)" 
        @handleAddCart="() => emit('handleAddCart', sneaker)"
        />
    </div>
</template>