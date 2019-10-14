import { cloneDeep } from 'lodash';

import { Store } from '../../src';
import { BasicState, INITIAL_STATE } from './state';

/**
 * Creates a specific Store by extending abstract Store
 * by providing a specific state interface and a default state.
 */
export class BasicStore extends Store<BasicState> {
  constructor() {
    super(INITIAL_STATE, { cloneStrategy: cloneDeep });
  }
}

export class BasicLogStore extends Store<BasicState> {
  constructor() {
    super(INITIAL_STATE, { logChanges: true });
  }
}

export class BasicShallowCloneStore extends Store<BasicState> {
  constructor() {
    super(INITIAL_STATE);
  }
}
