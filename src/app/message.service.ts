import { Injectable } from '@angular/core';
import {Message} from './message';
import {templateJitUrl} from '@angular/compiler';

@Injectable({ providedIn: 'root' })
export class MessageService {
  messages: Message[] = [];
  add( type: string, content: string, timout?: number) {
    console.log('message added', content, type, timout);
    const message = new Message(type, content);
    this.messages.push(message);
    if (timout) { setTimeout(() => this.clear(message), timout); }
  }

  clear(message: Message) {
    this.messages = this.messages.filter(m => m !== message);
  }
}
