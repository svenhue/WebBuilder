

export function setStylePositionToMouse(e: MouseEvent, style:CSSStyleDeclaration) {
    console.log(e, style)
    style.left = e.clientX + 'px';
    style.top = e.clientY + 'px';

}