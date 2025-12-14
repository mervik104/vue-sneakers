<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-10 items-baseline">
        <v-skeleton-loader min-width="100" class="border rounded-3xl border-slate-100 transition-transform hover:-translate-y-2 hover:shadow-xl" min-height="400" v-for="n in 12" :key="n" :elevation="10" type="image, image, article"></v-skeleton-loader> 
    </div>
</template>

