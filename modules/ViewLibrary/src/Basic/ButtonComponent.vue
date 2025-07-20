<template>
  <UButton
  :icon="iconName()"
      ref="viewRef"
    :class="buttonClasses"
    :style="buttonStyles"
    :type="buttonType"
    :disabled="isDisabled"
    v-bind="view?.htmlattributes"
    @click="handleClick">
    {{ t(labelFunc()) }}
  </UButton>
</template>

<script setup lang='ts'>
import { ViewElement, useViewConfiguration } from 'alphautils';
import { ref, onMounted, onBeforeUnmount, MaybeRefOrGetter, computed, onBeforeMount } from 'vue';
import { IViewConfiguration } from 'alphautils';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  viewId: {
    type: Number,
    required: false,
  },
  contextid: {
    type: Number,
    required: false,
  },
  icon: {
    type: String,
    required:false
  },
  label: {
    required: false,
    type: String
  },
  dense: {
    type: Boolean,
    required: false
  }
});

const { t } = useI18n();


const viewRef = ref<HTMLButtonElement | null>(null);
const {view, children } = useViewConfiguration(props.contextid, props.viewId) as MaybeRefOrGetter<[ MaybeRefOrGetter<IViewConfiguration>, MaybeRefOrGetter<Array<IViewConfiguration>>]>;

 const viewelement = new ViewElement<HTMLButtonElement>(view);

// Computed properties for styling and behavior
const buttonClasses = computed(() => {
  const classes = ['custom-button', 'daisy-btn'];
  
  // Add base classes
  if (view?.class) {
    classes.push(view.class);
  }
  
  // Add appearance classes
  if (view?.properties?.flat) {
    classes.push('custom-button--flat');
  }
  
  if (view?.appearence?.round) {
    classes.push('custom-button--round');
  }
  if(props.dense || view?.appearance?.dense){
    classes.push('custom-button--dense')
  }
  
  if (view?.appearence?.unelevated) {
    classes.push('custom-button--unelevated');
  }
  
  // Add alignment class
  if (view?.properties?.align) {
    classes.push(`custom-button--align-${view.properties.align}`);
  }
  
  return classes.join(' ');
});
function labelFunc(){
  return props.label != undefined ? props.label : view.content != undefined ? view.content : ""
}
function iconName(){
  if(props.icon){
    return props.icon
  }
  return view?.icon
}
const buttonStyles = computed(() => {
  if (view?.style) {
    return viewelement.ResolverObjectProperty(view.style);
  }
  return {};
});

const buttonType = computed(() => {
  return view?.properties?.type || 'button';
});

const isDisabled = computed(() => {
  return view?.properties?.disabled || false;
});

// Icon handling
const getIconClass = (iconName: string) => {
  // Handle different icon types
  if (iconName.startsWith('mdi-')) {
    return `mdi ${iconName}`;
  } else if (iconName.startsWith('fa-')) {
    return `fas ${iconName}`;
  } else {
    // Default to material icons
    return `material-icons ${iconName}`;
  }
};

// Event handling
const handleClick = (event: MouseEvent) => {
  if (isDisabled.value) {
    event.preventDefault();
    return;
  }
  
  // Emit click event or handle routing if needed
  if (view?.properties?.route) {
    // Handle routing logic here if needed
    console.log('Navigate to:', view.properties.route);
  }
};

onMounted(() => {
  viewelement.bind(props.contextid, viewRef);
});

onBeforeUnmount(() => {
  viewelement.unbind();
});
</script>

<style scoped>
.custom-button {
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  border: 1px solid #ccc;
  min-height: 20px;
  margin-left: 40px;
  border-radius: 4px;
  background-color: #f5f5f5;
  color: #333;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}

.custom-button:hover {
  background-color: #e0e0e0;
  border-color: #999;
}

.custom-button:active {
  background-color: #d0d0d0;
  transform: translateY(1px);
}

.custom-button:focus {
  box-shadow: 0 0 0 2px rgba(66, 165, 245, 0.3);
}

.custom-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background-color: #f5f5f5;
  border-color: #ccc;
}

.custom-button:disabled:hover {
  background-color: #f5f5f5;
  border-color: #ccc;
  transform: none;
}

/* Flat variant */
.custom-button--flat {
  background-color: transparent;
  border: none;
  box-shadow: none;
}

.custom-button--flat:hover {
  background-color: rgba(0, 0, 0, 0.04);
}

.custom-button--flat:active {
  background-color: rgba(0, 0, 0, 0.08);
}

/* Round variant */
.custom-button--round {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  padding: 0;
}

/* Unelevated variant */
.custom-button--unelevated {
  box-shadow: none;
}
.custom-button--dense{
  width: min-content;
}
/* Alignment variants */
.custom-button--align-left {
  justify-content: flex-start;
}

.custom-button--align-center {
  justify-content: center;
}

.custom-button--align-right {
  justify-content: flex-end;
}

/* Icon styling */
.button-icon {
  display: inline-flex;
  align-items: center;
  font-size: 18px;
}

.button-icon--left {
  margin-right: 8px;
}

.button-icon--right {
  margin-left: 8px;
}

.button-content {
  display: inline-flex;
  align-items: center;
}

/* Material Icons support */
.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 18px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
}

/* DaisyUI compatibility */
.daisy-btn {
  /* Add any DaisyUI specific styles if needed */
}
</style>
