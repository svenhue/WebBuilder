import { App } from "vue";
import { createPinia, setActivePinia } from "alphautils/stores/piniapi.ts";
export default function pinia(app: App){
    const pinia = createPinia();
    pinia.use(app);
    setActivePinia(pinia);
}         