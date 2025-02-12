<template>
    <q-date
    v-bind="view.htmlattributes"
    :name="view.properties?.name"
    :landscape="view.properties?.landscape"
    :years-in-month-view="view.properties?.yearsInMonthView"
    :title="view.properties?.title"
    :sub-title="view.properties?.subTitle"
    :today-btn="view.properties?.todayBtn"
    :minimal="view.properties?.minimal"
    :locale="view.properties?.locale"
    :calendar-type="view.properties?.calendarType"
    :default-year-month="view.properties?.defaultYearMonth"
    :default-view="view.properties?.defaultView"
    :options="view.properties?.options"
    :mutliple="view.properties?.mutliple"
    :range="view.properties?.range"
    :dark="view.properties?.dark"
    :disabled="view.properties?.disabled"

    v-model="modelValue"
    >

    </q-date>
</template>

<script setup lang="ts">
import { MinimalCalendarViewElement } from './MinimalCalendar/MinimalCalendarViewElement';
import { ref } from 'vue';

const props = defineProps({
    view: {
        type: MinimalCalendarViewElement,
        required: true,
    }
})

let modelValue = null;

if(props.view.properties?.mutliple == true){
    modelValue = ref<Date[]>(props?.view?.data != undefined ? props?.view?.data : []);
}
if(props.view.properties?.range == true){
    modelValue = ref<Date[]>(props?.view?.data != undefined ? props?.view?.data : {from: null, to: null});
}
</script>
