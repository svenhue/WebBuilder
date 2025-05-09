<template>
    <div>
        <ChatComponent :agents="[
            ...hybridAppDevAgents,
            // Add any other agents you want to include here
        ]">

        </ChatComponent>
    </div>
</template>

<script setup lang="ts">
import { ChatComponent } from 'agenticBusinessIntegration'
import { WebsiteAgent } from 'hybridappdev';

const hybridAppDevAgents = [
    WebsiteAgent
]

</script>