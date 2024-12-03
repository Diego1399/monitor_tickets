import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private barckendUrl = 'http://localhost:3000/';

  socket = io("localhost:3000", {autoConnect:false});
  
  constructor() { 
    this.socket.on("connect", () => {
      console.log("Conectado al back")
    })
    this.socket.connect()
  }

  // Enviar mensaje al servidor
    sendMessage(message: string): void {
        this.socket.emit('message', message);
    }

    // Escuchar mensajes del servidor
    onMessage(): Observable<string> {
        return new Observable((observer) => {
            this.socket.on('message', (msg: string) => {
                observer.next(msg);
            });
        });
    }
}
