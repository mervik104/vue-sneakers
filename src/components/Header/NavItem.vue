<script setup lang="ts">

defineProps<{
    src: string,
    to: string,
}>()

</script>

<template>
    <RouterLink class="flex-1 sm:flex-auto" :to="to">
        <button
            class="flex w-full h-full flex-col p-2 md:flex-row md:active:bg-transparent active:bg-gray-100 items-center gap-1 md:gap-3 text-sm md:text-[16px] justify-center cursor-pointer md:hover:text-gray-400">
            <img width="20px" :src='src' alt="">
            <slot></slot>
        </button>
    </RouterLink>
</template>