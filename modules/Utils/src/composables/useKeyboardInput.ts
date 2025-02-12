
export function useKeyboardInput(callback: (newString: string) => void){
    
    function input(e: KeyboardEvent){
        callback(e.key)
    }
    function start(){
        document.addEventListener('keydown', input, false)
      
    }

    function remove(){
        document.removeEventListener('keydown', input, false)
    }

    return {
        remove: remove,
        start: start
    }
}