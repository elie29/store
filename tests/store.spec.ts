import { Subscription } from 'rxjs';
import { skip, tap } from 'rxjs/operators';

import {
  Author,
  BasicLogStore,
  BasicShallowCloneStore,
  BasicState,
  BasicStore,
  INITIAL_STATE,
  Post
} from './mock';

describe('Test the store', () => {
  let store: BasicStore;
  let subscription: Subscription;

  beforeEach(() => {
    store = new BasicStore();
    subscription = new Subscription();
  });

  afterEach(() => {
    subscription.unsubscribe();
  });

  it('should have default state', () => {
    expect(store.value).toEqual(INITIAL_STATE);
  });

  it('should return empty values from state', () => {
    expect(store.value.post).toBeNull();
    expect(store.value.posts).toEqual([]);
    expect(store.value.author).toBeUndefined();
  });

  it('should return empty values with get from state', () => {
    expect(store.get('post')).toBeNull();
    expect(store.get('posts')).toEqual([]);
    expect(store.get('author')).toBeUndefined();
    expect(store.get('loading')).toBeFalsy();
  });

  it('should reset the store', () => {
    store.set('post', { id: 25 });
    store.set('loading', true);
    store.reset();

    expect(store.value).toEqual(INITIAL_STATE);
  });

  it('should set undefined or null values in the store when possible', () => {
    store.set('post', null);
    store.set('author', undefined);

    expect(store.value).toEqual(INITIAL_STATE);
  });

  it('should return a deep copy of the current state', () => {
    store.set('post', {
      id: 25,
      date: new Date(),
      author: { name: 'John', age: 42 }
    });

    expect(store.value).toEqual(store.value); // same state content
    expect(store.value).not.toBe(store.value); // different state reference
  });

  it('should change state reference by adding a new key', () => {
    const john = { name: 'John', age: 25 };

    store.set('author', john);
    const state1 = store.value;

    store.set('author', john);
    const state2 = store.value;

    expect(store.get('author')).toEqual(john);

    expect(state1).toEqual(state2);
    expect(state1).not.toBe(state2);
  });

  it('should dispatch event on subscription', () => {
    // Post could be null as defined in the State
    let post: Post | null = { id: 25 };
    let count = 0;

    subscription.add(
      store
        .select('post')
        .pipe(tap(_ => (count += 1)))
        .subscribe(next => (post = next))
    );

    // always one as it is a BehaviorSubject
    expect(count).toBe(1);
    expect(post).toBeNull();
  });

  it('should dispatch events for only modified values', () => {
    let post: Post | null = { id: 25 };
    let count = 0;

    subscription.add(
      store
        .select('post')
        // count dispatch events
        .pipe(tap(_ => (count += 1)))
        .subscribe(next => (post = next))
    );

    // set values in store different than post
    for (let i = 0; i < 10; i += 1) {
      store.set('author', { age: 35, name: 'John' });
    }

    // always one as it is a BehaviorSubject
    expect(count).toBe(1);
    expect(post).toBeNull();
  });

  it('should dispatch events when we set same values', () => {
    let count = 0;
    let author: Author | undefined; // as defined in the State

    subscription.add(
      store
        .select('author')
        .pipe(tap(_ => (count += 1)))
        .subscribe(next => (author = next))
    );

    // set same values in the store: it will be deep cloned
    const john: Author = { age: 42, name: 'John' };
    for (let i = 0; i < 10; i += 1) {
      store.set('author', john);
    }

    expect(count).toBe(11);
    expect(author).not.toBeNull();
  });

  it('should dispatch when we set same object content but with different reference', () => {
    let count = 0;
    let author: Author | undefined;

    subscription.add(
      store
        .select('author')
        .pipe(tap(_ => (count += 1)))
        .subscribe(next => (author = next))
    );

    // set same reference value in the store
    for (let i = 0; i < 10; i += 1) {
      store.set('author', { name: 'John', age: 25 });
    }

    expect(count).toBe(11);
    expect(author).toEqual({ name: 'John', age: 25 }); // same content but not same reference
  });

  it('should change state with value', () => {
    store.set('author', {
      age: 15,
      name: 'John'
    });

    const value = store.value; // deep copy of the state
    const author = value.author as Author;
    author.age = 24;

    // value and state has different content and reference
    expect(value).not.toEqual(store.value);
    expect(value).not.toBe(store.value);
  });

  it('should patch a slice of state', () => {
    const value = store.value;

    store.patch({
      author: {
        age: 15,
        name: 'John'
      }
    });

    // value and state has different content and reference
    expect(value).not.toEqual(store.value);
    expect(value).not.toBe(store.value);
  });

  it('should patch a slice of state and dispatch only changed values', () => {
    spyOn(console, 'log');

    store.select('loading').subscribe(next => console.log(next));
    store.select('post').subscribe(next => console.log(next));

    for (let i = 0; i < 10; i += 1) {
      store.patch({
        author: {
          age: 15,
          name: 'John'
        },
        post: { id: 15 }
      });
    }

    // 1 for loading and 11 for post
    expect(console.log).toHaveBeenCalledTimes(12);
  });

  it('should not log changes when logChanges is false', () => {
    spyOn(console, 'log');

    store.set('loading', true);
    store.reset();

    expect(console.log).toHaveBeenCalledTimes(0);
  });

  it('should log changes when logChanges is true', () => {
    spyOn(console, 'log');

    const store = new BasicLogStore();

    store.set('loading', true);
    store.reset();

    expect(console.log).toHaveBeenCalledTimes(3);
  });

  it('should watch for state changes', () => {
    spyOn(console, 'log');

    store
      .watch()
      .pipe(skip(1))
      .subscribe(next => console.log(next));

    store.set('loading', false);
    store.reset();
    store.set('loading', true);

    expect(console.log).toHaveBeenCalledTimes(3);
  });

  it('should watch for state changes with immutable data', () => {
    const author: Author = {
      age: 15,
      name: 'John'
    };

    let state: BasicState;

    store
      .watch()
      .pipe(skip(1))
      .subscribe(next => (state = next));

    store.set('author', author);

    // modifying the state outside the store should not affect the store.
    state.author.age = 25;

    expect(state).not.toEqual(store.value);
  });

  it('should return a shallow copy of the state', () => {
    const store = new BasicShallowCloneStore();

    const author: Author = {
      age: 15,
      name: 'John'
    };

    let state: BasicState;

    store
      .watch()
      .pipe(skip(1))
      .subscribe(next => (state = next));

    store.set('author', author);

    // modifying the state with shallow copy strategy affects the store
    state.author.age = 25;

    expect(state).toEqual(store.value);
    expect(state).not.toBe(store.value);
  });
});
