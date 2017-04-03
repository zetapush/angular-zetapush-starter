import { CacheEntry } from './user-cache.service';
import { Injectable } from '@angular/core';
import debounce from 'lodash.debounce';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { UserApi, User } from './user-api.service';

enum CacheEntryStatus {
  PENDING,
  CACHED,
  MISSING
}

export interface CacheEntry<T> {
  id: string;
  createdAt: number;
  status: CacheEntryStatus;
  value: ReplaySubject<T>;
}

@Injectable()
export class UserCache {
  private cache = new Map<string, CacheEntry<User>>();

  constructor(private api: UserApi) {
    this.fetch = debounce(() => {
      this.doFetch();
    }, 50);
  }

  /** Overritten by constructor */
  private fetch() {}

  get(userKey: string): ReplaySubject<User> {
    console.log('UserCache::get', userKey);
    let entry: CacheEntry<User>;
    if (this.cache.has(userKey)) {
      entry = this.cache.get(userKey);
    } else {
      entry = this.addCacheEntry(userKey);
      this.fetch();
    }
    return entry.value;
  }

  private addCacheEntry(userKey: string, user: User = this.getNotAvailableUser(userKey)): CacheEntry<User> {
    console.log('UserCache::addCacheEntry', userKey);

    const entry = {
      id: userKey,
      createdAt: Date.now(),
      status: CacheEntryStatus.PENDING,
      value: new ReplaySubject<User>(1)
    };
    this.cache.set(userKey, entry);
    entry.value.next(user);
    return entry;
  }

  private getNotAvailableUser(userKey: string): User {
    return {
      userKey,
      login: `<not-available>`,
      email: '<not-available>',
      firstname: '<not-available>',
      lastname: '<not-available>'
    };
  }

  private getNotFoundUser(userKey: string): User {
    return {
      userKey,
      login: `<not-found>`,
      email: '<not-found>',
      firstname: '<not-found>',
      lastname: '<not-found>'
    };
  }

  private getEntriesByStatus(status: CacheEntryStatus) {
    const entries = Array.from(this.cache.values());
    return entries.filter((entry) => entry.status === status);
  }

  private doFetch() {
    console.log('UserCache::doFetch');
    const userKeys = this.getEntriesByStatus(CacheEntryStatus.PENDING).map(({ id }) => id);
    this.api.getUserList({ userKeys }).then(({ list }) => {
      console.log('UserCache::onGetUserList', list);
      list.forEach(({ found, user }: { found: boolean, user: User }) => {
        const { userKey } = user;
        const entry = this.cache.get(userKey);
        if (found) {
          this.cache.set(userKey, {
            ...entry,
            status: CacheEntryStatus.CACHED
          });
          entry.value.next(user);
        } else {
          this.cache.set(userKey, {
            ...entry,
            status: CacheEntryStatus.MISSING
          });
          entry.value.next(this.getNotFoundUser(userKey));
        }
      });
    });
  }
}
