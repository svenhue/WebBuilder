<template>
    <div id="appTerminal" class="appTerminal">

    </div>
</template>

<script setup lang="ts">

const props = defineProps({

})

</script>

<style scoped lang="scss">

.appTerminal{
    position: absolute;
    bottom: 0;
    right: 0;
    min-width: 300px;
    min-height: 50px;
    height: 200px;
    width: 400px;
    background-color: black;
    color:white;
    overflow:scroll;
}

</style>