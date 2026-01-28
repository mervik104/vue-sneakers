<script setup lang="ts">
import CardList from './CardList.vue';
import Filters from './Filters.vue';
import Search from './Search.vue';
import { useState } from '../store/useState';
import { storeToRefs } from 'pinia';
import CardsSkeletonLoader from './CardsSkeletonLoader.vue';
import { onMounted, onUnmounted } from 'vue';
import { scrollToTop } from '../utils/scrollToTop';

const addCart = useState().addCart
const setLike = useState().setLike
const store = useState()
const { sneakers, isLoading, filters } = storeToRefs(store);

onMounted(async () => {
    scrollToTop()
    if(sneakers.value.length === 0) {
        isLoading.value = true
    }
    await store.fetchSneakersData()
})

onUnmounted(() => {
    filters.value.searchQuery = ''
    filters.value.sortBy = 'name'
})

</script>

<template>
    <div class="sm:justify-between md:flex-row flex-col flex gap-3 items-center w-full">
        <h2 class="text-3xl font-bold md-8 md:flex-1">Все кроссовки</h2>
        <div class="flex gap-3 md:w-auto w-full justify-between flex-row ">
            <Filters class="sm:w-auto w-1/6" v-model="filters.sortBy" />
            <Search class="md:flex-auto flex-1" v-model="filters.searchQuery" />
        </div>
    </div>
    <CardsSkeletonLoader v-if="isLoading"/>
    <CardList v-else-if="sneakers.length > 0" :sneakers="sneakers" 
    @handle-add-cart="(sneaker) => addCart(sneaker)" 
    @setLike="(sneaker) => setLike(sneaker)" />
    
    <div v-else>
        Кроссовок не найдено!
    </div>
</template>