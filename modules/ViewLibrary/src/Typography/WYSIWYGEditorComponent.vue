<template>
    <q-editor
        v-bind="view?.htmlattributes"
        :fullscreen="view?.properties?.fullscreen"
        :no-route-fullscreen-exit="view?.properties?.noRouteFullscreenExit"
        :paragraph-tag="view?.properties?.paragraphTag"
        :placeholder="view?.properties?.placeholder"
        :readonly="view?.properties?.readonly"
        :disabled="view?.properties?.disabled"
        :square="view?.properties?.square"
        :flat="view?.properties?.flat"
        :dense="view?.properties?.dense"
        :dark="view?.properties?.dark"
        :min-height="view?.properties?.minHeight"
        :max-height="view?.properties?.maxHeight"
        :height="view?.properties?.height"
        :toolbar-outline="view?.properties?.toolbarOutline"
        :toolbar-push="view?.properties?.toolbarPush"
        :toolbar-rounded="view?.properties?.toolbarRounded"
        :content-style="view?.properties?.contentStyle"
        :content-class="view?.properties?.contentClass"
        :definitions="view?.properties?.definitions"
        :fonts="view?.properties?.fonts"
        :toolbar="view?.properties?.toolbar"
        :toolbar-color="view?.properties?.toolbarColor"
        :toolbar-text-color="view?.properties?.toolbarTextColor"
        :toolbar-toggle-color="view?.properties?.toolbarToggleColor"
        :toolbar-bg="view?.properties?.toolbarBg"

        v-model="modelValue"
    >

    </q-editor>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import { WYSIWYGViewElement } from './WYSIWYGEditor/WYSIWYGViewElement.js'

const props = defineProps({
    view: {
        type: WYSIWYGViewElement,
    }
})

const modelValue = ref<string>(props?.view?.data != undefined ? props?.view?.data : '');
</script>