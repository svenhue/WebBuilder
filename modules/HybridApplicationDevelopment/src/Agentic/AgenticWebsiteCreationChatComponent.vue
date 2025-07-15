<template>
    <div :style="{height: '100%'}">
    <div class="root-agentic-creation-chat">
        
          <div class="chat">
              <AgenticChatIntegrationComponent
              ref="chatComponent"
              :config="{
                      serverUrl: 'ws://localhost:3002/websiteCreation',
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
          <div class="requirements-showcase">
            <div v-if="requirements.companyDetails">
              <p dense type="text" :style="{fontSize: '20px'}" >{{requirements?.companyDetails}}</p>
            </div>

            <div v-if="requirements.targetAudience">
              <p :style="{fontSize: '15px'}">Target Audience</p>
              <p>{{requirements.targetAudience}}</p>
            </div>

            <div v-if="requirements.goalsOfTheWebsite">
              <label  :style="{fontSize: '15px'}">Goals</label>
              <div v-for="(goal, i) in requirements.goalsOfTheWebsite" :key="i">
                <p placeholder="Description" >{{goal.description}}</p>
              </div>
            </div>
          </div>
          <q-btn @click="createConfigAndRouteToEditor"  :style="{position: 'absolute', width: '180px', height: '50px', bottom: '140px', left: 'calc(50% - 60px)'}" label="Create Website"> </q-btn>
      </div>
        
    </div>
</template>

<script setup lang="ts">
import AgenticChatIntegrationComponent from './AgenticChatIntegrationComponent.vue';
import { reactive } from 'vue'
import { WebsiteCreationRequirementsObject } from './WebsiteCreationStrategy';
import { ILLMAnswer } from 'agenticBusinessIntegration/src/UI/AgentInterface/types';
import { OpenEditorAndConfigureAppConfiguration } from './Tools/OpenEditorAndConfigureAppConfiguration';
import { ref, onMounted} from 'vue'
import { ConversationViewModel } from 'agenticBusinessIntegration';
import { BaseServiceProvider, IHTTPClientService } from 'alphautils';

const requirements = reactive<WebsiteCreationRequirementsObject>({})
const chatComponent = ref(null);

const httpService = BaseServiceProvider.Service<IHTTPClientService>("HTTPClientService")

let viewModel: ConversationViewModel = undefined
onMounted(() => {
  if(!chatComponent.value.viewModel)
    throw new Error("Cant find viewmodel")

  viewModel = chatComponent.value.viewModel.viewModel
})

function handleLLMAnswer(answer: ILLMAnswer){
    if(answer['additionalJSON'] != undefined){
        const r = answer['additionalJSON']['requirements'] as WebsiteCreationRequirementsObject
        
        const formattedRequirements = filterKnownProperties(r)
        Object.assign(requirements, formattedRequirements)
        console.log(123, requirements)
    }
}
const tool = new OpenEditorAndConfigureAppConfiguration();
async function createConfigAndRouteToEditor(){
  const result = httpService.sendRequest({
    url: "http://localhost:3002/ee/initAppConfigWithRequirements",
    method: 'POST',
    data: requirements,
    isolated: true
  }).then(async (r) => {
    
   console.log(1234, r)
    const actionSuggestions = r.data.clientToolSuggestions?.find((s) => s.action.toolName == "CreateApplicationConfiguration")?.action?.input;
    console.log(77, actionSuggestions)
    await tool.execute(actionSuggestions)
    console.log(12355, actionSuggestions)
  })
  console.log(123, result)
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
        .requirements-showcase{
          padding-left: 20px;
          width:400px;
          position: relative
        }
}
</style>