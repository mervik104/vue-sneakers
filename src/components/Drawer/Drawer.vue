<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useState } from '../../store/useState';
import DrawerContent from './DrawerContent.vue';

const {isDrawer} = storeToRefs(useState())

</script>

<template>
    <div class="fixed sm:inset-0 z-40">
        <Transition name="fade">
            <div v-if="isDrawer" class="fixed sm:inset-0 bg-black opacity-60" @click="isDrawer = false" />
        </Transition>
        <Transition name="slide">
            <DrawerContent @close-drawer="isDrawer = false" class="w-full xl:w-[22%] z-50 h-full fixed right-0 top-0"/>
        </Transition>
    </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
    transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
    transform: translateX(100%);
}


.scrollbar::-webkit-scrollbar {
    width: 5px;
}

.scrollbar::-webkit-scrollbar-track {
    background-color: #f9f9fd;
}

.scrollbar::-webkit-scrollbar-thumb {
    background-color: #356184;
}
</style>