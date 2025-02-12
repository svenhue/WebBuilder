//@ts-ignore
import {  Ref } from 'vue';
import * as monaco from 'monaco-editor';


export const Editor = (ref: Ref): monaco.editor.IStandaloneCodeEditor => {
	//const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);
	
	const editor = monaco.editor.create(ref.value, {
					
					model: null,
					language: 'typescript',
                    
				}); 
		    
	return editor;
};