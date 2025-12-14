<script setup lang="ts">

const sortBy = defineModel({
    required: true,
})

</script>

<template>
    <select v-model="sortBy" class="outline-0 rounded-md border border-gray-400 py-1 px-3">
        <option value="name">По названию</option>
        <option value="price">Дешевле</option>
        <option value="-price">Дороже</option>
    </select>
</template>