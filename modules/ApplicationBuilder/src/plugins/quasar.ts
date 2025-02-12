import { Quasar } from 'quasar'
import { App } from 'vue'
import 'quasar/src/css/index.sass'
export default function useQuasar(app: App){
    app.use(Quasar
        ,{
        plugins: {}
    })

}