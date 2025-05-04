//@ts-ignore
import {  Ref } from 'vue';

let monaco: any = null;
if(typeof window !== 'undefined'){
	import('monaco-editor').then((m) => {
		monaco = m;
	})
}


export const Editor = (ref: Ref): monaco.editor.IStandaloneCodeEditor => {
	//const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);
	
	const editor = monaco.editor.create(ref.value, {
					
					model: null,
					language: 'typescript',
                    
				}); 
		    
	return editor;
};