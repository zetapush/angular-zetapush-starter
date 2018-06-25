import { NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Api, ZetaPushClient, createApi } from 'zetapush-angular';

// TODO Refactor with Lerna
import { Group } from '../group';

export interface Room {
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

export interface RoomMessage {
  room: Group;
  message: Message;
}

export interface RoomMessageList {
  room: Group;
  list: Array<any>;
  page: any;
}

// TODO Should be auto-generated
export class RoomApi extends Api {
  onAddRoomMessage: Observable<RoomMessage>;
  onCreateRoom: Observable<Room>;
  onCreateOneToOneRoom: Observable<Room>;
  onPurgeRoomMessageList: Observable<Room>;
  onUpdateRoomMessage: Observable<RoomMessage>;

  addRoomMember({
    id,
    member,
  }: {
    id: string;
    member: string;
  }): Promise<{ id: string; member: string }> {
    return this.$publish('addRoomMember', { id, member });
  }
  addRoomMessage({ room, type, value, metadata }): Promise<RoomMessage> {
    return this.$publish('addRoomMessage', {
      room,
      type,
      value,
      metadata,
    }).then(({ message }) => ({ room, message }));
  }
  createRoom({
    name,
    members,
  }: {
    name: string;
    members: Array<string>;
  }): Promise<Room> {
    return this.$publish('createRoom', { name, members });
  }
  createOneToOneRoom({ interlocutor }): Promise<Room> {
    return this.$publish('createOneToOneRoom', { interlocutor });
  }
  getRoom({ id, owner }: { id: string; owner: string }): Promise<Room> {
    return this.$publish('getRoom', {
      id,
      owner,
    }).then(({ room, messages }) => ({ room, messages }));
  }
  getRoomMessageList({
    room,
    page,
  }: {
    room: Group;
    page?: any;
  }): Promise<RoomMessageList> {
    return this.$publish('getRoomMessageList', {
      room,
      page,
    }).then(({ list }) => ({ room, list, page }));
  }
  getUserRoomList({ page }: { page?: any }): Promise<Array<Room>> {
    return this.$publish('getUserRoomList', { page }).then(({ list }) => list);
  }
  purgeRoomMessageList({ room }: { room: Group }): Promise<Room> {
    return this.$publish('purgeRoomMessageList', { room }).then(() => ({
      room,
      messages: []
    }));
  }
  updateRoomMessage({
    id,
    room,
    value,
  }: {
    id: string;
    room: Group;
    value: any;
  }): Promise<RoomMessage> {
    return this.$publish('updateRoomMessage', { id, room, value });
  }
}

export function RoomApiFactory(client: ZetaPushClient, zone: NgZone): RoomApi {
  return createApi(client, zone, RoomApi) as RoomApi;
}

export const RoomApiProvider = {
  provide: RoomApi,
  useFactory: RoomApiFactory,
  deps: [ZetaPushClient, NgZone],
};
