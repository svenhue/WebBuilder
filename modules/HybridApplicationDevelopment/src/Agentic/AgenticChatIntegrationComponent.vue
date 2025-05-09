<template>
    <div>
        <ChatComponent
        :agents="[
            ...agents
        ]">

        </ChatComponent>
    </div>
</template>

<script setup lang="ts">
import { ChatComponent } from 'agenticBusinessIntegration'
import { WebsiteAgent } from './WebsiteAgent';

const agents = [
    WebsiteAgent
]
</script>