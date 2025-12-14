<script setup lang="ts">
import { onMounted } from 'vue';
import DrawerContent from './DrawerContent.vue';
import { useState } from '../../store/useState';
import { router } from '../../router';

const state = useState()

onMounted(async() => {
    await state.fetchSneakersData()
})

</script>
<template>
    <DrawerContent class="w-full pb-20 z-50 h-full fixed right-0 top-0" @close-drawer="router.push('/')"/>
</template>