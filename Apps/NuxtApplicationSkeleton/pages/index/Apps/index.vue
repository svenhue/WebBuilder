<template>
    <div>
    
    </div>
    
</template>


<script setup lang="ts">
import { DataAdapter } from 'webbuilderalphautils';


const creations = DataAdapter.getComputed("ApplicationConfiguration")

console.log(creations)

</script>