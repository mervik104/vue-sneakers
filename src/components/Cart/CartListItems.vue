<script setup lang="ts">
import type { Sneakers } from '../../types';
import CartItem from './CartItem.vue';

defineProps<{
    cartItems: Sneakers[],
}>()

const emit = defineEmits<{
    (e: 'handleAddCart', sneaker: Sneakers): void
}>()


</script>

<template>
    <div class="overflow-y-auto flex-1 scrollbar">
        <div v-auto-animate class="flex flex-col gap-5">
            <CartItem v-for="cartItem in cartItems" @handle-add-cart="() => emit('handleAddCart', cartItem)"
                :key="cartItem.id" v-bind="cartItem" />
        </div>
    </div>
</template>
