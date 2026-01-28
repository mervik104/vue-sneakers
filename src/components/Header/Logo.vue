<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { Paths } from '../../router';

</script>

<template>
    <RouterLink :to="Paths.home" class="bg-transparent!">
        <div class="flex items-center gap-4 hover:text-gray-600">
            <img class="w-10 h-10" src="/logo.png" alt="">
            <div class="cursor-pointer">
                <h2 class="font-bold uppercase text-xl">Sneakers shop</h2>
                <p class="text-slate-400">Магазин лучших кроссовок</p>
            </div>
        </div>
    </RouterLink>
</template>