<template>
        <div class="chat-container">
            <div class="chat-header">
               

            </div>

            <div class="chat-messages" id="chatMessagesContainer" :ref="el">
                <div v-for="message in viewModel.history.value.entries" :key="message.id" class="message">
                    <div :class="getMessageClass(message.role)">
                        <div class="message-content" v-html="renderMarkdownHTML(message.content)"></div>    
                        
                    </div> 
                </div>
            </div>
            <input class="chat-input" v-model="viewModel.newMessage.value" @keyup.enter="() => viewModel.addMessage(viewModel.newMessage.value)" placeholder="Type a message..." />
        </div>
</template>



<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { ConversationViewModel } from './ConversationViewModel';
import { IChatConfiguration } from './IChatConfiguration'
import MarkdownIt from 'markdown-it';

const props = defineProps({
    config: {
        type: Object as () => IChatConfiguration,
        required: true,
        default(rawProps) {
            return {
                initMessageName: "init",
                tryInterruptMessageName: "tryinterrupt",
                answerMessageName: "answer"
            }
        }
    }
});



const viewModel = new ConversationViewModel(props.config);

defineExpose({
    viewModel
})

const el = ref(null)
const md = new MarkdownIt();

function getMessageClass(messageRole: string){
    if(messageRole == 'user'){
        return 'user-message chat-message'
    }else if(messageRole == 'assistant'){
        return 'assistant-message chat-message'
    }
}

function isElementVerticallyScrollable(el: HTMLElement): boolean {
  if (!el) {
    console.warn(`Element  "${el}" not found.`);
    return false;
  }
  return el.scrollHeight > el.clientHeight;
}

function renderMarkdownHTML(markdown: string){
    return md.render(markdown);
}

onMounted(() => {
    watch(viewModel.history.value.entries, () => {
        const el = document.getElementById("chatMessagesContainer");
        console.log(23333)
        setTimeout(() => {
            el?.scroll({
            top: el.scrollHeight,
            behavior:'smooth'
        })
        }, 10)
        
    })
})




</script>

<style lang="scss" scoped>

.chat-container{
    padding: 10px;
    display: flex;
    flex-direction: column;
    position: relative;
    height: 100%;
    min-width: 300px;
    background-color: #2B2B2B;
    color:white;
    .chat-messages{
        width:100%;
        height: 100%;
        overflow-y: scroll;
        margin-bottom: 50px;
        .chat-message{
            margin-bottom: 5px;
            padding-left: 10px;
            padding-right: 10px;
            min-width: 40px;
        }
        .user-message{
            align-self:end;
            right: 0px;
            text-align: right;
            width: fit-content;
            margin-left: auto;
            background-color: #2B2B2B;
            border-radius: 7px;
        }
        .assistant-message{
            align-self:start;
            margin-right: auto;
            width: fit-content;
        }
    }
    
    .chat-input{
        bottom:20px;
        position:absolute;
        width: calc(100% - 20px);
    }

}


</style>
