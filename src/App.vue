<script setup lang="ts">
import Header from './components/Header/Header.vue';
import DrawerWrapper from './components/DrawerWrapper.vue';
import { onMounted } from 'vue';
import { useState } from './store/useState';

onMounted(() => {
  useState().initialization()
})

</script>

<template>
  <DrawerWrapper>
    <Header />
    <div class="p-10">
      <RouterView/>
    </div>
  </DrawerWrapper>
</template>
