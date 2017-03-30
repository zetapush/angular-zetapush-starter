// TODO Refactor with Lerna
import { Api } from '../zetapush';
// TODO Refactor with Lerna
import { Metadata, Tags } from '../core';

export interface Actions {
  [key: string]: any;
}

export interface FileUrl {
  contentType: string;
  meta: Metadata;
  guid: string;
  path: string;
  hash: string;
  size: number;
  url: string;
}

export interface File {
  tags: Tags;
  type: string;
  name: string;
  metadata: Metadata;
  creation: number;
  url: FileUrl;
  owner: string;
}

export interface FileEntry {
  exists: boolean;
  entry: File;
}

export interface FileUploadRequest {
  httpMethod: string;
  guid: string;
  url: string;
  owner: string;
}

// TODO Should be auto-generated
export class FileApi extends Api {
  confirmFileUpload({ guid, actions, metadata, tags }: { guid: string, actions: Actions, metadata: Metadata, tags: Tags }) {
    return this.$publish('confirmFileUpload', { guid, actions, metadata, tags });
  }
  deleteFileEntry({ path }) {
    return this.$publish('deleteFileEntry', { path });
  }
  getFileEntry({ path }: { path: string }) {
    return this.$publish('getFileEntry', { path });
  }
  getFileEntryList({ folder }: { folder: string }) {
    return this.$publish('getFileEntryList', { folder });
  }
  requestFileUpload({ contentType, folder }: { contentType: string, folder: string }) {
    return this.$publish('requestFileUpload', { contentType, folder });
  }
}
