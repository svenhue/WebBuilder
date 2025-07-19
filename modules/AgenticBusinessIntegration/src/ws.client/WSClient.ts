import { io } from "socket.io-client";

export class WSClient{

    public socket: ReturnType<typeof io>
    

    constructor(serverUrl: string){
        try{
            if(!serverUrl)return;
            this.socket = io(serverUrl, {
            transports: ['websocket']
        })
        }catch(error){
            console.log("Error", error)
        }
  
    }

    connect(){
        this.socket.on('connect', () => {
        })
    }
}