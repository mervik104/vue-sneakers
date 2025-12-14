<script setup lang="ts">
import CardList from './CardList.vue';
import { useState } from '../store/useState';
import { storeToRefs } from 'pinia';
import type { Sneakers } from '../types';
import { onMounted, ref, watch } from 'vue';
import CardsSkeletonLoader from './CardsSkeletonLoader.vue';
import { scrollToTop } from '../utils/scrollToTop';

const addCart = useState().addCart
const setLike = useState().setLike
const store = useState()
const favoritesSneakers = ref<Sneakers[]>([])
const { sneakers, isLoading, likesIsLoading, isCreatingOrder } = storeToRefs(store);

const getFavoritesSneakers = () => {
    if (sneakers.value.length > 0) {
        favoritesSneakers.value = sneakers.value.filter((sn) => sn.isLiked === true)
    }
}

watch([sneakers], getFavoritesSneakers, { deep: true })
onMounted(async () => {
    scrollToTop()
    likesIsLoading.value = true
    store.resetFilters()
    await store.fetchSneakersData()
    getFavoritesSneakers()
})

</script>

<template>
    <div class="justify-between flex gap-3 items-center">
        <h2 class="text-3xl font-bold md-8 flex-1">Закладки</h2>
    </div>
    <CardsSkeletonLoader v-if="isLoading || isCreatingOrder.isLoading || likesIsLoading" />
    <CardList v-else-if="favoritesSneakers.length > 0" :sneakers="favoritesSneakers"
        @handle-add-cart="(sneaker) => addCart(sneaker)" @setLike="(sneaker) => setLike(sneaker)" />
    <div v-else>
        Закладок нет!
    </div>
</template>