import { Observable } from 'rxjs/Observable';
// TODO Refactor with Lerna
import { Api } from '../zetapush';
// TODO Refactor with Lerna
import { Group } from '../group';

export interface Conversation {
  room: Group;
  messages: Array<Message>;
}

export interface Message {
  type: string;
  value: any;
  createdAt: number;
  metadata: any;
  readers: any;
  targets: Array<string>;
}

export interface ConversationMessage {
  room: Group;
  message: Message;
}

export interface ConversationMessageList {
  room: Group;
  list: Array<any>;
  page: any;
}

// TODO Should be auto-generated
export class ConversationApi extends Api {
  onAddConversationMessage: Observable<ConversationMessage>;
  onCreateConversation: Observable<Conversation>;
  onCreateOneToOneConversation: Observable<Conversation>;
  onPurgeConversationMessageList: Observable<Conversation>;

  addConversationMessage({ room, type, value, metadata }): Promise<ConversationMessage> {
    return this.$publish('addConversationMessage', { room, type, value, metadata }).then(({ message }) => ({ room, message }));
  }
  createConversation({ name, members }: { name: string, members: Array<string> }): Promise<Conversation> {
    return this.$publish('createConversation', { name, members });
  }
  createOneToOneConversation({ interlocutor }): Promise<Conversation> {
    return this.$publish('createOneToOneConversation', { interlocutor });
  }
  getConversation({ id, owner }: { id: string, owner: string }): Promise<Conversation> {
    return this.$publish('getConversation', { id, owner }).then(({ room, messages }) => ({ room, messages }));
  }
  getConversationMessageList({ room, page }: { room: Group, page?: any }): Promise<ConversationMessageList> {
    return this.$publish('getConversationMessageList', { room, page }).then(({ list }) => ({ room, list, page }));
  }
  getUserConversationList({ page }: { page?: any }): Promise<Array<Conversation>> {
    return this.$publish('getUserConversationList', { page }).then(({ list }) => list);
  }
  purgeConversationMessageList({ room }: { room: Group }): Promise<Conversation> {
    return this.$publish('purgeConversationMessageList', { room }).then(() => ({ room }));
  }
}
