<script setup lang="ts">
import CardList from './CardList.vue';
import { useState } from '../store/useState';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import CardsSkeletonLoader from './CardsSkeletonLoader.vue';
import { scrollToTop } from '../utils/scrollToTop';

const addCart = useState().addCart
const setLike = useState().setLike
const store = useState()
const { likedSneakers, isLoading, isCreatingOrder} = storeToRefs(store);

onMounted(async () => {
    scrollToTop()
    store.resetFilters()
    if(likedSneakers.value.length === 0) {
        isLoading.value = true
    }
    await store.fetchFavorites()
})

</script>

<template>
    <div class="justify-between flex gap-3 items-center">
        <h2 class="text-3xl font-bold md-8 flex-1">Закладки</h2>
    </div>
    <CardsSkeletonLoader v-if="isLoading || isCreatingOrder.isLoading" />
    <CardList v-else-if="likedSneakers.length > 0" :sneakers="likedSneakers"
        @handle-add-cart="(sneaker) => addCart(sneaker)" @setLike="(sneaker) => setLike(sneaker)" />
    <div v-else>
        Закладок нет!
    </div>
</template>