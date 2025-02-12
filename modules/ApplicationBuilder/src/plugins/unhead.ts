import { App } from "vue";
import { createHead } from "@unhead/vue";

export default function unhead(app: App){
    const head =             createHead();
    app.use(head);
}                                                                        