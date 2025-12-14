<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useState } from '../../store/useState';
import Loading from '../Loading.vue';
import CartHeader from '../Cart/CartHeader.vue';
import CartListItems from '../Cart/CartListItems.vue';
import CartPayment from '../Cart/CartPayment.vue';
import InfoBlock from './InfoBlock.vue';

const store = useState()

const emit = defineEmits<{(e: 'closeDrawer'): void}>()

const { isCreatingOrder, cart, error, cartPrice } = storeToRefs(store)
const createOrder = useState().createOrder
const delCart = useState().delCart
</script>

<template>
    <div v-auto-animate class="bg-white ">
        <div v-if="isCreatingOrder.isLoading">
            <Loading :error="error" :is-loading="isCreatingOrder.isLoading" />
        </div>

        <InfoBlock v-else-if="isCreatingOrder.isError"
            @callback="() => { emit('closeDrawer'); isCreatingOrder.isSucces = false }"
            @close-drawer="emit('closeDrawer')"
            desc="К сожалению что-то пошло не так. Попробуйте позже! :(" src="/public/emoji-2.png">
            <p class="text-red-500">Ошибка!</p>
        </InfoBlock>

        <InfoBlock v-else-if="isCreatingOrder.isSucces"
            @callback="() => { emit('closeDrawer'); isCreatingOrder.isSucces = false }"
            desc="Ваш заказ скоро будет передан курьерской доставке" src="/public/order-success-icon.png"
            @close-drawer="emit('closeDrawer')">
            <p class="text-lime-500">Заказ оформлен!</p>
        </InfoBlock>

        <div v-else-if="cart.length > 0" class="flex justify-between h-full flex-col gap-4 p-5">
            <CartHeader @close-drawer="emit('closeDrawer')" />
            <CartListItems @handle-add-cart="(sneaker) => delCart(sneaker)" :cartItems="cart" />
            <CartPayment @create-order="createOrder" :cart-price="cartPrice" />
        </div>

        <InfoBlock v-else @callback="() => emit('closeDrawer')"
            desc="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ" src="/public/package-icon.png"
            @close-drawer="emit('closeDrawer')">
            Корзина пустая
        </InfoBlock>
    </div>
</template>