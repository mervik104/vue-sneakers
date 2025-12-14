<script setup lang="ts">
import { storeToRefs } from 'pinia';
import Drawer from './Drawer/Drawer.vue';
import { useState } from '../store/useState';

const { isDrawer } = storeToRefs(useState())

</script>

<template>
    <div @keydown.esc="() => { isDrawer = false }" tabindex='0' class="outline-0">
        <Drawer v-if="isDrawer" v-model:is-drawer="isDrawer"/>
        <div
            :class="`xl:w-4/5 w-full min-h-screen mx-auto rounded-xl xl:block ${isDrawer && 'hidden'} ${isDrawer && 'xl:-translate-x-54'} duration-300 transition-transform shadow-xl pb-15 xl:mt-14 bg-white `">
            <slot></slot>
        </div>
    </div>
</template>