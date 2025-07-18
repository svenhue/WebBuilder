<template>
    <div style="height: 100%; width: 100%">
     <div style="height: 100%; width: 100%">
      <HeaderComponent></HeaderComponent>
    </div>
        <main style="height: 100%; width: 100%">
        <slot ></slot>
        </main>
    </div>
</template>


<script setup lang="ts">
import HeaderComponent from '~/components/HeaderComponent.vue';
const items = [

]
</script>