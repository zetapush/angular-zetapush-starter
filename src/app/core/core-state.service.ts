import { EventEmitter, Injectable } from '@angular/core';

export interface Module {
  name: string;
  path: string;
}

@Injectable()
export class CoreState {

  state = new EventEmitter<Array<Module>>();

  modules: Array<Module> = [];

  constructor() { }

  register(module: Module) {
    this.modules.push(module);
    this.state.emit(this.modules);
  }
}
