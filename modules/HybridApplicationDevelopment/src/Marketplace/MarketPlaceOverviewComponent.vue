<template>
    <div>
            Marketplace Overview

            <ItemExplorerGridComponent :contextid="contextid"> </ItemExplorerGridComponent>
    </div>
</template>

<script setup lang="ts">
import ItemExplorerGridComponent from './ItemExplorerGridComponent.vue';

const props = defineProps({
    contextid: {
        type: Number,
        required:true
    }
})

</script>

<style lang="scss">

.marketplace-overview{
    height: 100%;
    width: 100%;
}
</style>