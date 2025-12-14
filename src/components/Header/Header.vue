<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useState } from '../../store/useState';
import NavItemsList from './NavItemsList.vue';
import Logo from './Logo.vue';
import { MOBILE_WIDTH } from '../../constants';

const state = useState()
const { isDrawer, navElements, displayWidth} = storeToRefs(state)
</script>
<template>
    <header class="flex justify-between border-b border-slate-200 px-10 py-8 items-center">
        <Logo/>
        <div v-if="displayWidth > MOBILE_WIDTH" class="hidden md:flex flex-wrap gap-2 md:gap-1 lg:gap-8">
            <NavItemsList :is-mobile="false" :nav-elements="navElements" v-model:is-drawer="isDrawer" />
        </div>
        <div v-else class="fixed bottom-0 right-0 left-0 bg-white border border-gray-100 z-99999">
            <div class="flex">
                <NavItemsList :is-mobile="true" :nav-elements="navElements" v-model:is-drawer="isDrawer" />
            </div>
        </div>
    </header>
</template>
