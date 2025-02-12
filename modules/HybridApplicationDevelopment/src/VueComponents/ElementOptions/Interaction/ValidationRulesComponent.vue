<template>
    <div>

        <q-list dense ref="listRef">
            <q-item dense>
                <q-item-label>
                    Validation Rules
                </q-item-label>
               
                <q-btn dense icon='add' @click='addRule()'></q-btn>

            </q-item>
            <q-item dense
            v-for="rule in rules" :key="rule.rule">
                <q-item-section>
                    {{  rule.name }}
                </q-item-section>

                <q-item-section side>
                    <q-btn dense icon='delete' @click='deleteRule(rule)'></q-btn>
                    <q-btn dense icon='edit' @click='openEditor(rule)'></q-btn>
                </q-item-section>

            </q-item>
        </q-list>
        <EditValidationRuleComponent 
        v-if="showEditor"  @close="showEditor = false" 
        :current-element="currentElement"
        @update-element="handleUpdate"
        :contextid="currentElement.contextid" :rule="model">

        </EditValidationRuleComponent>
 
    </div>
</template>


<script setup lang="ts">
import { IValueValidationViewConfiguration } from 'alphautils'
import { computed, ref, toValue } from 'vue';
import EditValidationRuleComponent from './EditValidationRuleComponent.vue';
import { v4 as uiid } from 'uuid'

const props = defineProps({
    currentElement:{
        type: Object as () => IValueValidationViewConfiguration,
        required: true
    }
})

const emits = defineEmits(['updateElement'])

const showEditor = ref(false)
const model = computed(() => {
    return props.currentElement.properties.rules.find(r => r.uuid == fuuid.value)
})
const fuuid = ref('')

const listRef = ref(null)
const rules = computed(() => {
     if(Array.isArray(props.currentElement?.properties?.rules)) return props.currentElement.properties.rules

     return []
})

function addRule(){
    const x = uiid()
    emits('updateElement', [{key: 'properties.rules', value: [...toValue(rules.value) , {rule: '', name: '', errorMessage: '', uuid: x }]}])
    fuuid.value = x
}
function handleUpdate(update: object){
    let rules = toValue(props.currentElement.properties.rules);

    const i = rules.findIndex(r => r.uuid == model.value.uuid)

    rules[i][update.key] = update.value
    console.log(update, rules)
    emits('updateElement', [{key: 'properties.rules', value: rules}])

}
    
function openEditor(value){
    fuuid.value = value.uuid
    showEditor.value = true
    
}

function deleteRule(rule: object){
    emits('updateElement', [{key: 'properties.rules', value: toValue(rules).filter(r => r.uuid != rule.uuid)}])
}

</script>