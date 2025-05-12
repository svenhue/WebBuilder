<template>
    <div :style="{
        height: '100%'
    }">
        <ChatComponent
        :frontline-agent="WebsiteCreationAgent"
        :agents="[
            
        ]">

        </ChatComponent>
    </div>
</template>

<script setup lang="ts">
import { ChatComponent } from 'agenticBusinessIntegration'
import { WebsiteCreationAgent } from './WebsiteAgent';


</script>