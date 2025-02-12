import { ref } from 'vue'

export function useSelectRectangleWithMouse(e: MouseEvent){
    const el  = document.createElement('div');
    el.classList.add('select-rectangle');
    document.body.appendChild(el);

    let x1 = 0, y1 = 0, x2 = 0, y2 = 0;
    const styles = ref({});
    function reCalc() { //This will restyle the div
        const x3 = Math.min(x1,x2); //Smaller X
        const x4 = Math.max(x1,x2); //Larger X
        const y3 = Math.min(y1,y2); //Smaller Y
        const y4 = Math.max(y1,y2); //Larger Y
        el.style.left = x3 + 'px';
        el.style.top = y3 + 'px';
        el.style.width = x4 - x3 + 'px';
        el.style.height = y4 - y3 + 'px';
    }
    function onMouseMove(e) {
        x2 = e.clientX; //Update the current position X
        y2 = e.clientY; //Update the current position Y
        reCalc();
    };
    function onMouseUp(e) {
        styles.value = {
            left: el.style.left,
            top: el.style.top,
            width: el.style.width,
            height: el.style.height
        }
        el.hidden = true; //Hide the div
        el.remove(); //Remove the div from the DOM

    };

    x1 = e.clientX; //Set the initial X
    y1 = e.clientY; //Set the initial Y
    x2 = e.clientX; //Update the current position X
    y2 = e.clientY; //Update the current position Y
    reCalc();

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    return{
        remove: onMouseUp,
        styles: styles
    }
}