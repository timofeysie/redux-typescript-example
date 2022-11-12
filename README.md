# React Redux Counter Example

## Workflow

```shell
npm start
npm test
```

## Getting started with the Redux Toolkit counter example

The Redux Essentials tutorial has 7 pages.

In [Part 1: Redux Overview and Concepts](https://redux.js.org/tutorials/essentials/part-1-overview-concepts), there is an overview of Redux and the key concepts of State Management, Immutability, Terminology and Data Flow.

The next page [Redux App Structure](https://redux.js.org/tutorials/essentials/part-2-app-structure) goes over the classic counter app which I have discussed previously in my blog for Angular, but not React.

### The Counter example

We will build a counter application to add or subtract from a number via buttons.

The app is begun in the tutorial like this:

```shell
npx create-react-app redux-essentials-example --template redux
```

However, this does not use TypeScript.  Using TypeScript as well as unit testing using TDD is the goal of this article.

### Redux + TypeScript template

The command we will use is shown [in the getting started section](https://redux-toolkit.js.org/introduction/getting-started):

npx create-react-app my-app --template redux-typescript

Bear in mind, this little nugget takes some time.  It took about five minutes on my trusty 2019 Dell laptop.  Here is the output:

```shell
npx: installed 67 in 10.152s
Creating a new React app in C:\Users\timof\repos\timofeysie\react\redux\counter-example.
Installing packages. This might take a couple of minutes.
Installing react, react-dom, and react-scripts with cra-template-redux-typescript...
...
+ react-scripts@5.0.1
+ react@18.2.0
+ react-dom@18.2.0
+ cra-template-redux-typescript@2.0.0
added 1406 packages from 624 contributors in 215.586s
Initialized a git repository.
Installing template dependencies using npm...
npm WARN @apideck/better-ajv-errors@0.3.6 requires a peer of ajv@>=8 but none is installed. You must install peer dependencies yourself.
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@2.3.2 (node_modules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@2.3.2: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})
+ @types/react-dom@18.0.8
+ @types/react@18.0.25
+ @testing-library/jest-dom@5.16.5
+ @testing-library/user-event@14.4.3
+ @types/jest@27.5.2
+ web-vitals@2.1.4
+ @types/node@17.0.45
+ typescript@4.8.4
+ @testing-library/react@13.4.0
+ react-redux@8.0.5
+ @reduxjs/toolkit@1.9.0
added 62 packages from 89 contributors and updated 1 package in 31.108s
We detected TypeScript in your project (src\App.test.tsx) and created a tsconfig.json file for you.
Your tsconfig.json has been populated with default values.
Removing template package using npm...
npm WARN @apideck/better-ajv-errors@0.3.6 requires a peer of ajv@>=8 but none is installed. You must install peer dependencies yourself.
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@2.3.2 (node_modules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@2.3.2: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})
removed 1 package and audited 1471 packages in 11.501s
found 1 high severity vulnerability
  run `npm audit fix` to fix them, or `npm audit` for details
Created git commit.
Success! Created counter-example at C:\Users\timof\repos\timofeysie\react\redux\counter-example
Inside that directory, you can run several commands:
...
Happy hacking!
```

Run the app with 'npm start' and we see the counter example already working.

There is a section on [Using the Counter App with the Redux DevTools](https://redux.js.org/tutorials/essentials/part-2-app-structure#using-the-counter-app).

A section on [Application Contents and structure](https://redux.js.org/tutorials/essentials/part-2-app-structure#application-contents).

A discussion of app/store.js

[Creating Slice Reducers and Actions](https://redux.js.org/tutorials/essentials/part-2-app-structure#creating-slice-reducers-and-actions)
 shows the features/counter/counterSlice.js
## Original Readme

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) TS template.

Rules of Reducers
Reducers and Immutable Updates

Redux Toolkit's createSlice function lets you write immutable updates an easier way!

createSlice uses a library called Immer inside. Immer uses a special JS tool called a Proxy to wrap the data you provide, and lets you write code that "mutates" that wrapped data. But, Immer tracks all the changes you've tried to make, and then uses that list of changes to return a safely immutably updated value, 

It contrasts a  handwrittenReducer with a reducerWithImmer which is all of one line.

Writing Async Logic with Thunks and the incrementAsync example.

Here is the vanilla Javascript file:

```js
export const incrementAsync = amount => dispatch => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount))
  }, 1000)
}
```

Here is the Typescript version:

```ts
export const incrementAsync = createAsyncThunk(
  'counter/fetchCount',
  async (amount: number) => {
    const response = await fetchCount(amount);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
```

createAsyncThunk is part of the [Redux toolkit](https://redux-toolkit.js.org/api/createAsyncThunk).  We don't get to see that as part of this tutorial trail until [Part 5: Async Logic and Data Fetching](https://redux.js.org/tutorials/essentials/part-5-async-logic).

There is also a section on the Counter.js component file.

Now, time for the tests.  Out of the box we have a the usual src\App.test.tsx as well as a specification test src\features\counter\counterSlice.spec.ts file.

Run 'npm test' and we see this output:

```shell
Test Suites: 2 passed, 2 total
Tests:       5 passed, 5 total
Snapshots:   0 total
Time:        4.246 s
```

In the usual src\App.test.tsx there is already a TypeScript error on this line:

```ts
src\App.test.tsx

```ts
expect(getByText(/learn/i)).toBeInTheDocument();
```

Mouseover of getByText and see this:

```txt
const getByText: (id: Matcher, options?: SelectorMatcherOptions | undefined) => HTMLElement
Avoid destructuring queries from `render` result, use `screen.getByText` insteadeslinttesting-library/prefer-screen-queries
```

We can fix that error by doing this:

```ts
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(screen.getByText("Learn")).toBeInTheDocument();
```

This should be the first commit we make for this new repo.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
