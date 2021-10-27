# A frontend boilerplate for XYCloud applications

## Supports

- Language: `typescript`
- Vue: `vue3`, `vite`, `vuex@next`, `vue-router@next`
- CSS Preprocessor: `sass`, `scss`, `less`
- UI Library: `ant-design-vue@next`
- Testing Library: `jest`, `cypress`
- WebSocket Client: `socket.io-client`

## Enhancements

- Vuex type intellisense
  - **.vue**: :fire: Type intellisense also support on `.vue`. That's right! Try yourself to feel the difference.
  - **Actions**: The `action context` properties are all supporting type intellisense
    - including `commit`, `dispatch`, `state`, `rootState`, `getters`, `rootGetters`
  - **Getters**: The `getter context` parameters are all supporting type intellisense
    - including `state`, `rootState`, `getters`, `rootGetters`
- Antd
  - Styles import on demand
  - Theme customization
- WS x Vuex Plugin
  - Receiving WS events will be triggered to dispatch the same name actions of a specified namespaced store.
- Code-split & Gzip

## Please follow steps to scaffold your project based on `xycloud-starter`

### 1. Clone `xycloud-starter` and change directory inside

```shell
git clone https://gitlab.ict888.net/CWD/xycloud-starter.git your-project-name
cd your-project-name
```

### 2. Remove `.git` folder to discard git history of `xycloud-starter`

```shell
rmdir /s /q .git # Windows
rm -rf .git # MacOS or Linux
```

### 3. Init git for `your-project-name` and create first commit

```shell
git init
git add .
git commit -m "project init"
```

### 4. open your vscode and have fun!

```shell
code .
yarn install
yarn dev # wait on localhost:3000
```

## Bonus: You can copy & paste one-line command to finish all these steps.

### Windows

```shell
git clone https://gitlab.ict888.net/CWD/xycloud-starter.git your-project-name & cd your-project-name & rmdir /s /q .git & git init & git add . & git commit -m "project init" & code .
```

### MacOS or Linux

```
git clone https://gitlab.ict888.net/CWD/xycloud-starter.git your-project-name & cd your-project-name & rm -rf .git & git init & git add . & git commit -m "project init" & code .
```

## Folder structure

```
├── build                           # all about vite/rollup build
|   ├── generateModifyVars.ts       # customize theme(antd)
│   └── styleImport.ts              # [DNC] introduces component library(antd) styles on demand
├── public
│   └── favicon.ico
├── src
│   ├── asseets
│   ├── components
│   ├── composables                 # divide your component's logical concerns
|   |   ├── useFeatureFilters.ts
|   |   └── useFeatures.ts
│   ├── interfaces
|   |   └── FeatureInterface.ts     # view model interface for component
│   ├── models
|   |   └── FeatureModel.ts         # model for api response
│   ├── router
|   |   ├── menu                    # menu items
|   |   ├── routes                  # route items
|   |   └── index.ts
│   ├── services
|   |   └── FeatureService.ts       # requests to api
│   ├── store
|   |   ├── feature
|   |   |   ├── actions.ts          # module store actions
|   |   |   ├── declarations.ts     # [DNC] type/interface utils
|   |   |   ├── getters.ts          # module store getters
|   |   |   ├── index.ts            # module store
|   |   |   ├── mutations.ts        # module store mutations
|   |   |   ├── state.ts            # module store state
|   |   |   └── types.ts            # module store types for actions/mutations
|   |   ├── declaration.ts
|   |   └── index.ts
│   ├── styles
|   |   ├── modules                 # scss modules
|   |   |   ├── _color.scss
|   |   |   └── _font_.scss
|   |   └── index.scss              # global scss
│   ├── utils
|   |   └── http
|   |   |   └── axios.ts            # axios client
|   |   └── ws
|   |       ├── declarations.ts     # [DNC] type/interface plugin options
|   |       └── socket-io.ts        # socket-io client plugin
│   ├── views
│   ├── App.vue
│   ├── env.d.ts                    # [DNC] provided from vite
│   └── main.ts
└── tests
    ├── e2e
    |   ├── fixtures                # [DNC]
    |   ├── integration             # e2e tests
    |   |   └── basic.spec.ts
    |   ├── plugins                 # [DNC]
    |   ├── support                 # [DNC]
    |   └── tsconfig.json           # [DNC]
    └── unit
        └── components
            ├── FeatureList.spec.ts # unit tests
            └── setupTests.ts       # [DNC]

[DNC]: means 'DO NOT CHANGE'
* declarations.ts: contains related types and interfaces
```

## About `ant-design-vue@next`

### How to customize theme

```typescript
// build/generateModifyVars.ts

...
export function generateModifyVars(dark = false) {
  const modifyVars = getThemeVariables({ dark });
  return {
    ...modifyVars,
    // custom themes
  };
}
...
```

You could go to [default theme](https://github.com/vueComponent/ant-design-vue/blob/next/components/style/themes/default.less) for available variables.

### The reason for doing below this

```typescript
// src/main.ts

if (import.meta.env.DEV) {
  import('ant-design-vue/dist/antd.less');
}
```

First of all, `xycloud-starter` is using `import styles on demand` feature for `ant-design-vue` component styles.

```typescript
// vite.config.ts
...
import { configStyleImportPlugin } from './build/styleImport';
...

export default defineConfig(({ command }: ConfigEnv): UserConfig => {
  const isBuild = command === 'build';
  return {
    ...
    plugins: [..., configStyleImportPlugin(isBuild)],
    ...
  };
});

```

But if we use `import styles on demand` feature on `development mode`, it might slow down the browser refresh speed. Therefore, we only enable in `production mode`, and import whole theme on `development mode`.

## About `interfaces` and `models`

### What's difference between `interfaces` and `models`?

A `model` is the definition of data from api service, we only define the fields we needs, and a `interface` is rewrapping from a model, like a view model for component data scheme.

Example in `xycloud-starter`

A fake feature api response:

```json
// public/data/features.json
[
  {
    "id": 1,
    "title": "Language",
    "tags": ["typescript"]
  },
  ...
]
```

A model for feature api response:

```typescript
// models/FeatureModel.ts
export interface FeatureModel {
  title: string;
  tags: string[];
}
```

A interface for FeatureList.vue:

```typescript
// interfaces/FeatureInterface.ts
import { FeatureModel } from '@/models/FeatureModel';

export interface FeatureInterface extends FeatureModel {
  highlightedTags: string[];
}
```

You can see that the `highlightedTags` field in `FeatureInterface` is just for component logic concerns, not exactly a data field, so we need a view model for division from 2 models.

## About `store`

### How to add a new `state` on existing `store`?

```typescript
// store/*/state.ts

...
export const state = {
  ...
  newState: {} as NewStateType,
};
...
```

Add a new state and define a type for it.

### How to add a new `getter` on existing `store`?

```typescript
// store/*/declarations.ts

...
export type Getters = {
  ...
  newGetter(...context: GetterContext<State, Getters>): NewGetterType;
};

// store/*/getters.ts
export const getters: GetterTree<State, RootState> & Getters = {
  ...
  newGetter: (state, getters, rootState, rootGetters) => {
    // return your `NewGetterType` value
  },
};
```

Add a definition of new getter into `Getters` type, including name(`newGetter`) and return type(`NewGetterType`), then add new getter into `getters`. According to `vuex` API documentation, each getter callback should at most have 4 parameters.

\* `GetterContext` is wrapping through our own `State`, `Getters`, `RootState` and `RootGetters` that let you use `intellisense` feature.

### How to add a new `mutation` on existing `store`?

```typescript
// store/*/types.ts

export enum MutationTypes {
  NEW_MUTATION_TYPE = 'NEW_MUTATION_TYPE',
}
```

First, add new type name of your new mutation.

```typescript
// store/*/declarations.ts

export type Mutations<S = State> = {
  ...
  [MutationTypes.NEW_MUTATION_TYPE](state: S, payload: NewMutationPayloadType): void;
};

// store/*/mutations.ts
export const mutations: MutationTree<State> & Mutations = {
  ...
  [MutationTypes.NEW_MUTATION_TYPE](state, payload: NewMutationPayloadType) {
    // mutate your state by payload
  },
};
```

Add a definition of new mutation into `Mutations` type, including name(import from `MutationTypes`) and payload type(`NewMutationPayloadType`), then add new mutation into `mutations`.

### How to add a `action` on existing `store`?

```typescript
// store/*/types.ts

export enum ActionTypes {
  NEW_ACTION_TYPE = 'NEW_ACTION_TYPE',
}
```

First, add new type name of your new action.

```typescript
// store/*/declarations.ts

export interface Actions {
  ...
  [ActionTypes.NEW_ACTION_TYPE]({ commit, dispatch, state, rootState, getters, rootGetters }: ActionContext<State, Getters>, payload: NewActionPayloadType): void;
}

// store/*/actions.ts
export const actions: ActionTree<State, RootState> & Actions = {
  ...
  [ActionTypes.NEW_ACTION_TYPE]({ commit, dispatch, state, rootState, getters, rootGetters }) {
    // commit mutation, or dispatch actions from current store
  },
};
```

Add a definition of new action into `Actions` type, including name(import from `ActionTypes`) and payload type(`NewActionPayloadType`), then add new action into `actions`. According to `vuex` API documentation, each action callback should have a context parameter which contains 6 properties.

\* `ActionContext` is wrapping through our own `commit` type, `dispatch` type, `State`, `Getters`, `RootState` and `RootGetters` that let you use `intellisense` feature.

### How to add a new `store`?

1. Clone `store/sample` folder including `*.ts` inside, and rename folder with your `module name`
2. Here are what you should change in `*.ts` file and the main store file, such as `store/index.ts` `store/declarations.ts`.

#### `store/myModule/declarations.ts`

```typescript
...
type ModuleName = 'myModule';
...
```

Change `sample` to your module name.

#### `store/declarations.ts`

```typescript
...
import {
  ModuleName as MyModuleModule,
  Store as MyModuleStore,
  State as MyModuletate,
  NamespacedActions as MyModuleActions,
  NamespacedMutations as MyModuleMutations,
  NamespacedGetters as MyModuleGetters,
} from '@/store/myModule/declarations';

export type RootState = {
  ...
  myModule: MyModuleState;
};

export type RootMutations = ... & MyModuleMutations;
export type RootActions = ... & MyModuleActions;
export type RootGetters = ... & MyModuleGetters;

export type Store = ... &
  SampleStore<Pick<RootState, MyModuleModule>>;
...
```

#### `store/index.ts`

```typescript
...
import { store as myModule } from '@/store/myModule';
...
export const store = createStore({
  plugins,
  modules: {
    ...
    myModule,
  },
});
...
```

## About `composables`

According to [Vue3 Guide](https://v3.vuejs.org/guide/composition-api-introduction.html), the purpose of `composition api` is to **extract logical concerns into standalone composition functions**, or you can think as **what functionalities should be `hooked` on this component?** and then pick them under `composables` folder.

## About `tests/unit`

According to [Vue3 Guide](https://v3.vuejs.org/guide/testing.html#unit-testing), unit tests allow you to **test individual units of code in isolation**. The purpose of unit testing is to **provide developers with confidence in their code**. By writing thorough, **meaningful tests**, you achieve the confidence that as new features are built or your code is refactored your application will remain functional and stable.

Think about these questions:

- What's `unit` in our code?
- What kind of code is that you'll `have no confidence` if you change it again?
- What kind of test is `meaningful to you`?

## About `tests/e2e`

According to [Vue3 Guide](https://v3.vuejs.org/guide/testing.html#end-to-end-e2e-testing), end-to-end (E2E) tests provide coverage on what is arguably the most important aspect of an application: **what happens when users actually use your applications**. In other words, E2E tests validate all of the layers in your application. This **not only includes your frontend code, but all associated backend services and infrastructure** that are more representative of the environment that your users will be in.

First time to use `cypress`, you can type `yarn cypress` and it'll open the dashboard window, then select `base.spec.ts` to run test.
