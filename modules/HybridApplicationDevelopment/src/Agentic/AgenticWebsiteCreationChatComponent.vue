<template>
    <div class="root-agentic-creation-chat">
        <div class="chat">
            <AgenticChatIntegrationComponent
            :config="{
                    serverUrl: 'ws://localhost:3001/websiteCreation',
                    initMessageName: 'init',
                    tryInterruptMessageName: 'tryinterrupt',
                    answerMessageName: 'answer',
                    getConversationDataName: 'initAssistant',
                    optionalHandleLLMAnswerCallback: handleLLMAnswer,
                    clientSideTools: [
                      new OpenEditorAndConfigureAppConfiguration()
                    ]
                }"
            >

            </AgenticChatIntegrationComponent>
        </div>
        <div class="requirements-editor">
            <JsonEditorVue
            :style="{
                width: '100%',
                height: '100%'
            }"
            :main-menu-bar="false"
            :status-bar="false"
            v-model="requirements"
            v-bind="{/* local props & attrs */}"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import AgenticChatIntegrationComponent from './AgenticChatIntegrationComponent.vue';
import { reactive } from 'vue'
import { WebsiteCreationRequirementsObject } from './WebsiteCreationStrategy';
import JsonEditorVue from 'json-editor-vue'
import { ILLMAnswer } from 'agenticBusinessIntegration/src/UI/AgentInterface/types';
import { OpenEditorAndConfigureAppConfiguration } from './Tools/OpenEditorAndConfigureAppConfiguration';

const requirements = reactive<WebsiteCreationRequirementsObject>({})

function handleLLMAnswer(answer: ILLMAnswer){
    if(answer['additionalJSON'] != undefined){
        const r = answer['additionalJSON']['requirements'] as WebsiteCreationRequirementsObject
        
        const formattedRequirements = filterKnownProperties(r)
        Object.assign(requirements, formattedRequirements)
    }
}

function filterKnownProperties(input: any): any {
  if (Array.isArray(input)) {
    return input
      .map(item => filterKnownProperties(item))
      .filter(item => item !== undefined);
  }

  if (typeof input === 'object' && input !== null) {
    const result: any = {};
    for (const key in input) {
      if (!input.hasOwnProperty(key)) continue;

      const value = input[key];

      if (
        typeof value === 'string' &&
        value.trim().toUpperCase() === '<UNKNOWN>'
      ) {
        continue;
      }

      const filteredValue = filterKnownProperties(value);

      // Only assign non-undefined, non-empty objects or arrays
      if (
        filteredValue !== undefined &&
        !(typeof filteredValue === 'object' && Object.keys(filteredValue).length === 0)
      ) {
        result[key] = filteredValue;
      }
    }

    return Object.keys(result).length > 0 ? result : undefined;
  }

  return input;
}


</script>

<style scoped lang="scss">

.root-agentic-creation-chat{
    display: flex;
    width: 100%;
    height: 100%;
    position: relative;
    padding: 200px;
    
        .chat{
            width: 70%;
        }
        .requirements-editor{
            width:30%;
        }
}
</style>