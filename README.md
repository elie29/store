# Store Management

[![Build Status](https://travis-ci.org/elie29/store.svg?branch=master)](https://travis-ci.org/elie29/store)
[![Coverage Status](https://coveralls.io/repos/github/elie29/store/badge.svg?branch=master)](https://coveralls.io/github/elie29/store?branch=master)

## Frontend Application Store

A simple frontend store that manages application state using RxJS BehaviorSubject and lodash cloneDeep function. The purpose of this store is to provide a straightforward, simple and agnostic library to manage data in any frontend application that needs to share data among services, modules or containers. Moreover, data as state is managed immutably in the store, so, changing accidentally data outside the store, does not affect the store at all.

### What is a state?

In its easiest way, a state is a snapshot of an application data at a specific time. Each time data is manipulated or changed, a new state is created and saved in the store. In our case, the state is represented by extending State interface as follow:

```TS
interface BasicState extends State {
  author?: Author;
  loading: boolean;
  posts: Post[];
}
```

An initial state should implement BasicState as follow:

```TS
const INITIAL_STATE: BasicState = {
  author: undefined,
  loading: false,
  posts: []
}
```

### Why immutability is important?

- **Single Source of Truth**: The store is solely responsible of handling data.
- **State is read-only**: Modifying the state outside the store does not affect the store.
- **One-way dataflow**: A new state is published to subscribers any time the store receives data.
- **Predictable**: The state evolution can be tracked to figure out how and who made the changes.

## Install and Configure the Store

To get started with the store, we have two options. We can either download the latest release or run npm install:

- Download the [latest release](https://github.com/elie29/store/releases) and include it as a lib to our project
- Run `npm install @eli29/store`

Once the store dependency installed, we need to:

1. Define application state (cf. BasicState)
2. Create initial state (cf. INITIAL_STATE)
3. Extend abstract store class as follow:

```TS
export class BasicStore extends Store<BasicState> {
  constructor() {
    super(INITIAL_STATE);
  }
}
```

By default, we don't log state changes, so if we want to see all the logs, we should pass true the super method:

```TS
export class BasicStore extends Store<BasicState> {
  constructor() {
    super(INITIAL_STATE, true);
  }
}
```

Now BasicStore could be injected in any service or container. It could also possible to create just an instance to be shared across the application.

## Store API

The store Api is very simple and contains few public methods:

2. value: A getter for the current state deep cloned. Any manipulation of this value does not affect the store.
3. get: Retrieve a specific key from the state: eg. get('author') or get('loading').
4. set: Update a specific state key in the store: eg. set('loading', true).
5. select: Watch for a value change of a specific key in the store. It returns an observable of readonly data. eg. select('author').subscribe(next => console.log(next))

N.B.: Data passed or retrieved from the store is deep cloned. So any manipulation does not affect the store.
