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
  thumbnails: Array<Thumbnail>;
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

export interface Thumbnail {
  size: number;
  guid: string;
  url: string;
}

interface ConfirmFileUploadApiInput {
  guid: string;
  actions: Actions;
  metadata: Metadata;
  tags: Tags;
  owner?: string;
}

interface FileEntryApiInput {
  path: string;
  owner?: string;
}

interface FolderEntryApiInput {
  folder: string;
  owner?: string;
}

interface RequestFileUploadApiInput {
  contentType: string;
  owner: string;
  folder?: string;
}

// TODO Should be auto-generated
export class FileApi extends Api {
  confirmFileUpload({ guid, owner, actions, metadata, tags }: ConfirmFileUploadApiInput) {
    return this.$publish('confirmFileUpload', { guid, owner, actions, metadata, tags });
  }
  deleteFileEntry({ path, owner }: FileEntryApiInput) {
    return this.$publish('deleteFileEntry', { path });
  }
  getFileEntry({ path, owner }: FileEntryApiInput) {
    return this.$publish('getFileEntry', { path, owner });
  }
  getFileEntryList({ folder, owner }: FolderEntryApiInput) {
    return this.$publish('getFileEntryList', { folder, owner });
  }
  requestFileUpload({ contentType, folder, owner }: RequestFileUploadApiInput) {
    return this.$publish('requestFileUpload', { contentType, folder, owner });
  }
}
