export function waitForElm(selector) {

    if(document == undefined){
        return undefined;
    }

    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutation => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
                return mutation
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}