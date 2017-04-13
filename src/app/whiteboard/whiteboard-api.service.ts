import { Observable } from 'rxjs/Observable';
import { Api } from 'zetapush-angular';

// TODO Refactor with Lerna
import { Metadata } from '../core';
// TODO Refactor with Lerna
import { Group } from '../group/';

interface ApiInputWhiteboardObject {
  room: Group;
  whiteboard: string;
  type: string;
  value: any;
  metadata: Metadata;
}

// TODO Should be auto-generated
export class WhiteboardApi extends Api {
  onAddWhiteboardObject: Observable<any>;
  onCreateWhiteboard: Observable<any>;
  onPurgeWhiteboardObjectList: Observable<any>;
  onUpdateWhiteboardObject: Observable<any>;

  addWhiteboardObject({ room, whiteboard, type, value, metadata }: ApiInputWhiteboardObject) {
    return this.$publish('addWhiteboardObject', { room, whiteboard, type, value, metadata });
  }
  createWhiteboard({ room }: { room: Group }) {
    return this.$publish('createWhiteboard', { room });
  }
  getWhiteboardObjectList({ room, whiteboard, page }: { room: Group, whiteboard: string, page?: any }) {
    return this.$publish('getWhiteboardObjectList', { room, whiteboard, page });
  }
  purgeWhiteboardObjectList({ room, whiteboard }: { room: Group, whiteboard: string }) {
    return this.$publish('purgeWhiteboardObjectList', { room, whiteboard });
  }
  updateWhiteboardObject({ id, room, value, whiteboard }): Promise<any> {
    return this.$publish('updateWhiteboardObject', { id, room, value, whiteboard });
  }
}
