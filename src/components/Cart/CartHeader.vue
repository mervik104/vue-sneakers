<script setup lang="ts">

const emit = defineEmits<{
    (e: 'closeDrawer'): void
}>()

</script>

<template>
    <header class="flex items-center gap-4">
        <svg @click="emit('closeDrawer')"
            class="opacity-50 cursor-pointer hover:opacity-90 transition hover:-translate-x-1 rotate-180"
            xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14" fill="none">
            <path d="M1 7H14.7143" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M8.71436 1L14.7144 7L8.71436 13" stroke="black" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
        </svg>
        <h2 class="text-2xl font-bold">Корзина</h2>
    </header>
</template>