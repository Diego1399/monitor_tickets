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

    sendChat(chat: any): void {
      this.socket.emit('chat', chat);
    }

    // Escuchar mensajes del servidor
    onMessage(): Observable<string> {
        return new Observable((observer) => {
            this.socket.on('message', (msg: string) => {
                observer.next(msg);
            });
        });
    }

    onChat(): Observable<any> {
      return new Observable((observer) => {
        this.socket.on('chat', (obj: any) => {
          observer.next(obj)
        })
      })
    }


    getTickets(user: string): Observable<any>  {
      this.socket.emit('get-tickets-list', user);
      return new Observable((observer) => {
        this.socket.on('user-ticket-list', (list) => {
          observer.next(list)
        });
        this.socket.on('error', (error) => {
          observer.error(error)
        })
      })
    }
    
}
