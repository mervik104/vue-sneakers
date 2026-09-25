<script setup lang="ts">
import type { NavElementType } from '../../types';
import NavItem from './NavItem.vue';
const isDrawer = defineModel<boolean>('isDrawer', {required: true})
defineProps<{navElements: NavElementType[], isMobile?: boolean}>()
</script>

<template>
        <NavItem v-for="el in navElements"
         @click="(!isMobile && el.styles.includes('nav-cart')) && (isDrawer = true)" 
        :class="el.styles" 
        :to="el.path" 
        :src="el.src">{{ el.name }}</NavItem>
</template>

