import { ref, Ref, inject } from 'vue';

/**
 * Composable to get the current RuntimeVueApplicationViewModel
 * 
 * @returns A reference to the current RuntimeVueApplicationViewModel
 */
export function useRuntimeVueApplicationViewModel(): Ref<any> {
  // Try to get the application view model from the provide/inject system
  const viewModel = inject<any>('applicationViewModel');
  
  // Return a ref with the view model
  return ref(viewModel);
}
