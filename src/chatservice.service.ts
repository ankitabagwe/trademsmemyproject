import { Injectable } from '@angular/core';
import { Database, onValue, push, ref, set, update } from '@angular/fire/database';
import { Observable, from } from 'rxjs';
import { AngularFireModule } from '@angular/fire/compat';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ChatserviceService {

  private baseUrl = '${environment.apiBaseUrl}/details';
  private baseUrl2 = '${environment.apiBaseUrl}/buissnessdetails';
  
  constructor(private db: Database,private http: HttpClient) { }

  getUserDetailsByMobileNumber(contactNumber: string){
    return this.http.get<any>(`${this.baseUrl}/${contactNumber}`);
  }

  getsellerDetailsByMobileNumber(contactNumber: string){
    return this.http.get<any>(`${this.baseUrl2}/${contactNumber}`);
  }


  getConversations(userId: string): Observable<any[]> {
    const conversationsRef = ref(this.db, 'conversations');
    
    return new Observable(observer => {
      onValue(conversationsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const userConversations = Object.keys(data)
            .filter(convoId => convoId.includes(userId)) // Filter where user is involved
            .map(convoId => ({
              id: convoId,
              lastMessage: data[convoId].conversationDetails.lastMessage,
              timestamp: data[convoId].conversationDetails.timestamp
            }));
          observer.next(userConversations);
        } else {
          observer.next([]);
        }
      });
    });
    
  }

  getMessages(conversationId: string): Observable<any[]> {
    const messagesRef = ref(this.db, `conversations/${conversationId}/messages`);
  
    return new Observable(observer => {
      onValue(messagesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const messages = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          }));
          observer.next(messages);
        } else {
          observer.next([]);
        }
      });
    });
  }

  // getConversationDetails(conversationId: string): Observable<any> {
  
  // }

  sendMessage(conversationId:string, message: any) {
    const messagesRef = ref(this.db, `conversations/${conversationId}/messages`);
    const newMessageKey = push(messagesRef).key;

    if (!newMessageKey) {
      console.error('Failed to generate a new message key.');
      return from(Promise.reject('Message key generation failed.'));
    }

    const messageData = {
      ...message,
      timestamp: Date.now(),
    };

    // Update the message and conversation details atomically
    const updates: Record<string, any> = {};
    updates[`conversations/${conversationId}/messages/${newMessageKey}`] = messageData;
    updates[`conversations/${conversationId}/conversationDetails`] = {
      lastMessage: message.text,
      timestamp: Date.now(),
      // participants: message.participants,
    };

    return from(update(ref(this.db), updates));
    
  }
}
