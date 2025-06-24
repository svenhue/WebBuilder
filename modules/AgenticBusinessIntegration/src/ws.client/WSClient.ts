import { io } from "socket.io-client";

export class WSClient{

    public socket: ReturnType<typeof io>
    

    constructor(serverUrl: string){
        this.socket = io(serverUrl, {
            transports: ['websocket']
        })
    }

    connect(){
        this.socket.on('connect', () => {
        })
    }
}