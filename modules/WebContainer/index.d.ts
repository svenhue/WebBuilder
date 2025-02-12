import { StartUp } from './src/StartUp.ts';
import { BuildEnvironment } from './src/Server/server.js';
export { StartUp, BuildEnvironment }

declare module 'webcontainer'{
    export{
        StartUp, BuildEnvironment
    
    }
}