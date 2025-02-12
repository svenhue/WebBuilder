import { ViewElement } from "alphautils";
import { QCarousel } from "quasar";
import { Ref } from "vue";

export class CarouselViewElement extends ViewElement {

    private _carousel: Ref<QCarousel>;
    constructor(config, ref: Ref<QCarousel>) {
        super(config);
        this._carousel = ref;
    }

    public Next() {
        this._carousel.value.next();
    }

    public Prev() {
        this._carousel.value.previous();
    }

    public GoTo(panelName: string){
        this._carousel.value.goTo(panelName);
    }


}