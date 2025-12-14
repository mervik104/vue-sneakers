<script setup lang="ts">
import { ref, watch } from 'vue';
import { useDebounce } from '../utils/debounceValue';

const searchQuery = defineModel<string>({ required: true })
const inputValue = ref<string>(searchQuery.value)
const { debouncedValue } = useDebounce(inputValue, 600)
watch(debouncedValue, () => searchQuery.value = debouncedValue.value)

</script>

<template>
    <div class="relative">
        <img class="absolute top-3 left-4" src="/search.svg" alt="">
        <input v-model="inputValue"
            class="border border-gray-400 w-full rounded-md py-1.5 pl-11 pr-4 outline-0 focus:border-gray-500" type="text"
            placeholder="Поиск...">
    </div>
</template>