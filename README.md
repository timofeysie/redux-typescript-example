# React Redux TypeScript Example

This project is based on the example apps from the official [Redux Essentials](https://redux.js.org/tutorials/essentials/part-1-overview-concepts).  This trail focuses on vanilla Javascript.  The goal on this project is to demonstrate a TypeScript implementation of this, as well as provide unit testing where non exists.

It contains the classic counter example along with a small social media feed app.  The code for the project can be found [here](https://github.com/timofeysie/redux-typescript-example).  There are branches named after some of the steps to provide a jumping off point if needed.

## Workflow

```shell
npm start
npm test
```

## Starting the social media feed app

At the start of part three we are introduced to the goal of the next few steps: *a small social media feed app, which will include a number of features that demonstrate some real-world use cases.*

This starts with *a pre-configured starter project that already has React and Redux set up, includes some default styling, and has a fake REST API*.

[Here](https://github.com/reduxjs/redux-essentials-example-app) is the starting point codebase.

We will have to diff the current counter app code and see what needs to be added to get to this point.

In the counter app there are two directories in the src:

- app
- features/counter

In the redux-essentials-example-app there is:

- api
- app
- components

Begin by copying the api and components directories here.

In tha app directory, there is also a new file:

src/app/Navbar.js

Copy that file, but change the extension to .tsx.  Do the same for src\components\Spinner.tsx.

The store.js has an empty reducer, so that doesn't need to change here.

Next, use the App.js in the App.tsx here.  This shows that we will need to install react-router-dom.

Then, our first issue:

import Switch
Module '"react-router-dom"' has no exported member 'Switch'.ts(2305)
No quick fixes available

This code is old.  There is a comment from Dec 3, 2021: *Use Routes instead of Switch.*

That's an easy *switch* to make.  But then there is another error:

Type '{ exact: true; path: string; render: () => Element; }' is not assignable to type 'IntrinsicAttributes & RouteProps'.
  Property 'exact' does not exist on type 'IntrinsicAttributes & RouteProps'.ts(2322)

The version we are using:

```json
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-redux": "^8.0.5",
    "react-router-dom": "^6.4.3",
```

The Redux example:

```json
    "react": "^17",
    "react-dom": "^17",
    "react-redux": "^7.2.4",
    "react-router-dom": "^5.1.2",
```

So that's the problem.  Use a simple example from router 6, then just use the styles from index.css and the app runs and looks good.

## Fixing the tests

Next, the App.tsx test is failing.

Remember, we are looking for the work "Learn".  Change that to "Redux" but still an error:

TestingLibraryElementError: Unable to find an element with the text: Redux.

The original getByText contained a regex.

```tsx
test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByText(/learn/i)).toBeInTheDocument();
});
```

I can see that there are different formats for it also.

We could use a data-testid.  Since there is no test in the redux-essentials-example-app, it's up to us.

This will work for now:

```tsx
test('renders learn react link', () => {
  const { container } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(container).toHaveTextContent("Redux");
});
```

That's something I saw in the comments of [this issue](https://github.com/testing-library/dom-testing-library/issues/410) on the testing-library GitHub.  It works, so time to move on.

There are no tests also for the new code.  There eventually should be for the api/client.js and api/server.js and maybe the spinner, but since this is TDD, there is no point in going back at this point and testing that working code.  Time to move on.

## Main Posts Feed

(https://redux.js.org/tutorials/essentials/part-3-data-flow#main-posts-feed)

The first goal is to only show the list of post entries.  This starts in the inside the src/features folder which we already have.

We create a posts folder and add a new file named postsSlice.ts (instead of postsSlice.js)

Since we already have a src\features\counter\counterSlice.spec.ts, time to create a postsSlice.spec.ts

As there are no reducers yet, all we can do is test the initial state.

I don't think we test the store directly.  At least not now.  We add the posts: postsReducer to the store.

### Showing the Posts List

The PostsList component needs some TypeScript changes.

posts/PostsList.js

```tsx
export const PostsList = () => {
  const posts = useSelector(state => state.posts)
```

```sh
Object is of type 'unknown'.ts(2571)
```

Remember useAppSelector from the counter example?  It's a pre-typed versions of the useSelector hook.

If we import that and use it instead of useSelector, then that error goes away.

Before the above, the next line was also showing a TypeScript error.

```tsx
  const renderedPosts = posts.map(post => (
```

```sh
Parameter 'post' implicitly has an 'any' type.ts(7006)
```

After replacing useSelector with useAppSelector, this error is also gone.

After this, the App.tsx file can import the posts list component and show it in the app.  We can leave the working counter example there if we want also.

```tsx
        <Routes>
          <Route
            path="/"
            element={
              <section>
                <React.Fragment>
                  <PostsList />
                </React.Fragment>
                <Counter />
              </section>
            }
          />
        </Routes>
```

Another TypeScript feature encouraged is typing objects with interfaces.

Without being asked to, I created the simple interface for a post:

```ts
export interface Post {
  id: string;
  title: string;
  content: string;
}
```

Now we can start to use that wherever a Post object is expected:

```tsx
const renderedPosts = posts.map((post: Post) => ( ...
```

### Adding New Posts

In [this step](https://redux.js.org/tutorials/essentials/part-3-data-flow#adding-new-posts) the AddPostForm.js is added to the posts directory.

Since this is a TypeScript JSX format file, the extension should now be using .tsx.  I'm not sure why on the website it's using .js instead of jsx.  A JSX returns JavaScript XML not JavaScript as it contains HTML in React.  If you are following along with this as a tutorial, then make the following change:

features/posts/AddPostForm.js -> AddPostForm.tsx

There are two useState hooks that need some TypeScript:

```jsx
  const onTitleChanged = e => setTitle(e.target.value)
  const onContentChanged = e => setContent(e.target.value)
```

Both event objects have the same error in VSCode:

Parameter 'e' implicitly has an 'any' type.ts(7006)

The quick way out of this kind of error is to use the any type:

const onTitleChanged = (e: any) => setTitle(e.target.value)

This is OK to get on with work and test features, but it's bad form when using TypeScript, and should only be used if using the appropriate type is causing issues, in which case, you should leave a comment that excuses it's use explicitly.

We can see that the function calling that setter is a button which looks like this (in breif):

```html
<input onChange={onTitleChanged} />
```

There is a [cheat-sheet](https://github.com/typescript-cheatsheets/react) which has a specific section for [Forms and Events](https://github.com/typescript-cheatsheets/react#forms-and-events).  This shows a few examples such as this:

```js
/** function type syntax that takes an event (VERY COMMON) */
onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
```

Using that in the add posts form looks like this:

```js
const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)
```

However, now there is an error on the onChange={onContentChanged} event:

```txt
(property) React.TextareaHTMLAttributes<HTMLTextAreaElement>.onChange?: React.ChangeEventHandler<HTMLTextAreaElement> | undefined
Type '(e: React.ChangeEvent<HTMLInputElement>) => void' is not assignable to type 'ChangeEventHandler<HTMLTextAreaElement>'.
  Types of parameters 'e' and 'event' are incompatible.
    Type 'ChangeEvent<HTMLTextAreaElement>' is not assignable to type 'ChangeEvent<HTMLInputElement>'.
      Type 'HTMLTextAreaElement' is missing the following properties from type 'HTMLInputElement': accept, align, alt, capture, and 27 more.ts(2322)
index.d.ts(2461, 9): The expected type comes from property 'onChange' which is declared here on type 'DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>'
```

React.ChangeEvent<HTMLInputElement>

This seems like another option:

React.FormEvent<HTMLInputElement>

const onTitleChanged = (e: React.FormEvent<HTMLInputElement>) => setTitle((e.target as HTMLInputElement).value)

However, the error on onChange only gets longer.

The issue here is that there are two different types needed, depending on the input.  For example:

```ts
const onTitleChanged = (e: React.FormEvent<HTMLInputElement>) => setTitle((e.target as HTMLInputElement).value)
const onContentChanged = (e: React.FormEvent<HTMLTextAreaElement>) => setContent((e.target as HTMLInputElement).value)
...
return (
      <input nChange={onTitleChanged} />
      <textarea onChange={onContentChanged} />
)
```

The input element uses HTMLInputElement and the textarea uses HTMLTextAreaElement.

Next import that component into App.tsx, and add it right above the <PostsList /> component:

The form is not  doing anything yet, so we don't need to make a test now.  After the next step, we can update the postsSlice.spec.ts which currently only tests the initial state.

### Create a reducer to save a new post

The next section is [Saving Post Entries](https://redux.js.org/tutorials/essentials/part-3-data-flow#saving-post-entries).

In the empty reducers argument to the createSlice function in the postsSlice.ts file, we create postAdded which has two arguments: the current state value, and the action object that was dispatched.  It looks like this:

```ts
reducers: {
  postAdded(state, action) {
    state.push(action.payload)
  }
}
```

We also need to createSlice automatically generates an action creator to dispatch from the UI when when the user clicks "Save Post".

```ts
export const { postAdded } = postsSlice.actions
```

The above [destructured assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) export might look a little strange to some.  What it is doing is exporting just the postAdded action which is created by the Redux Toolkit [createSlice function](https://redux-toolkit.js.org/api/createslice) which *generates action creators and action types that correspond to the reducers and state*.  The only part we need from that is the postAdded action.

No TypeScript changes need to be made for this update.

### Creating a post id on dispatch

A new post needs to have an id.  The tutorial shows how to generated a random unique ID with the Redux Toolkit nanoid function we can use for that.

AddPostForm.tsx

```ts
import { useDispatch } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
import { postAdded } from './postsSlice'
```

You can now see how the id is created and the action is dispatched:

```ts
const onSavePostClicked = () => {
  if (title && content) {
    dispatch(
      postAdded({
        id: nanoid(),
        title,
        content,
      })
    );

    setTitle("");
    setContent("");
  }
};
```

### Missing styles

If you've been following along an got to this point, you might notice that when you run the app, the styles are missing for the form.

You can see what it should look like in the [completed example vanilla app](https://codesandbox.io/s/github/reduxjs/redux-essentials-example-app/tree/tutorial-steps?file=/src/App.js) which is running on codesandbox.io.

If you inspect the form, you can see the styles are coming from a file called primitiveui.css

The Redux Essentials tutorial doesn't mention anything about this.  That's understandable, as they are focusing on teaching Redux Toolkit features.  However, as a frontend developer, we always need to worry about style.  So I want to first of all find out how the styles broke, and then how to fix them.

My first guess is the missing styles have something to do with the changes made in the router and the way the components are now used in the App.tsx.

I will update this section once I've figured out what's going on and how to fix it.

### Unit testing the save added post function

After this change a post can be added and a unit test for the add can be created in the postsSlice.spec.ts.

Similar to the form, import the reducer:

postsSlice.spec.ts

```tsx
import { postAdded } from "./postsSlice";
```

Then create an expected posts array.  The reducer takes the initial state, and the postAdded action with the wanted content.

```ts
const expectedPostAddedState = [
  { id: "1", title: "First Post!", content: "Hello!" },
  { id: "2", title: "Second Post", content: "More text" },
  { id: "3", title: "test-title", content: "test-content" },
];
it('should handle increment', () => {
  const actualState = postsReducer(initialState, postAdded({
    id: "3",
    title: "test-title",
    content: "test-content",
  }));
  expect(actualState).toEqual(expectedPostAddedState);
});
```

Now we have some decent tests that cover some of the functionality added.

```txt
Test Suites: 3 passed, 3 total
Tests:       7 passed, 7 total
```

This is the end of step three.  I hope you have a good idea now of how to incorporate TypeScripts and unit testing into a React app using the Redux toolkit.

In [the next step](https://redux.js.org/tutorials/essentials/part-4-using-data) the following will be covered:

- Creating a Single Post Page
- Editing Posts
- Updating Post Entries
- Users and Posts
- Sorting the Posts List
- Post Reaction Buttons

## Getting started with the Redux Toolkit counter example

The Redux Essentials tutorial has 7 pages.

In [Part 1: Redux Overview and Concepts](https://redux.js.org/tutorials/essentials/part-1-overview-concepts), there is an overview of Redux and the key concepts of State Management, Immutability, Terminology and Data Flow.

The next page [Redux App Structure](https://redux.js.org/tutorials/essentials/part-2-app-structure) goes over the classic counter app which I have discussed previously in my blog for Angular, but not React.

In [Part 3: Basic Redux Data Flow](https://redux.js.org/tutorials/essentials/part-3-data-flow) they start showing how to build a small social media feed app.  This will be covered in another blog post where I apply Typescript and TDD to that process.

This article is about parts 1 & 2 as they provide the foundation for the next parts.

### The Counter example

We will build a counter application to add or subtract from a number via buttons.

The app is begun in the tutorial like this:

```shell
npx create-react-app redux-essentials-example --template redux
```

However, this does not use TypeScript.  Using TypeScript as well as unit testing the example code is the goal of this article.

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

Now we have an app with .ts files instead of .js files, and .tsx instead of .jsx.

Run the app with 'npm start' and we see the counter example already working.

After this is the step 2 tutorial there is a section on [Using the Counter App with the Redux DevTools](https://redux.js.org/tutorials/essentials/part-2-app-structure#using-the-counter-app).

A section on [Application Contents and structure](https://redux.js.org/tutorials/essentials/part-2-app-structure#application-contents).

A discussion of app/store.js and [Creating Slice Reducers and Actions](https://redux.js.org/tutorials/essentials/part-2-app-structure#creating-slice-reducers-and-actions)
 shows the features/counter/counterSlice.js

This goes over the Rules of Reducers, Reducers and Immutable Updates and shows the Redux Toolkit's createSlice function which lets you write immutable updates an easier way: *createSlice uses a library called Immer inside. Immer uses a special JS tool called a Proxy to wrap the data you provide, and lets you write code that "mutates" that wrapped data. But, Immer tracks all the changes you've tried to make, and then uses that list of changes to return a safely immutably updated value*

It contrasts a  handwrittenReducer with a reducerWithImmer which is all of one line.

Writing Async Logic with Thunks shows the incrementAsync example code. Here is the vanilla Javascript file:

```js
export const incrementAsync = amount => dispatch => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount))
  }, 1000)
}
```

Here is the Typescript version we have:

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

Now, time for the tests.  

## Unit Tests

Out of the box we have a the usual src\App.test.tsx as well as a specification test src\features\counter\counterSlice.spec.ts file.

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

This should be the first commit we make for this new repo:

```shell
git add .
git commit  -m "avoiding destructuring queries from render result in the App.test.tsx and using screen.getByText instead"
```

The src\features\counter\counterSlice.spec.ts file:

```ts
describe('counter reducer', () => {
  const initialState: CounterState = {
    value: 3,
    status: 'idle',
  };
  it('should handle increment', () => {
    const actual = counterReducer(initialState, increment());
    expect(actual.value).toEqual(4);
  });
```

The above expect line is testing what happens in the Counter.tsx file on the button:

```tsx
onClick={() => dispatch(increment())}
```

### Root State and Dispatch Types​

The count from the store is created like this:

```tsx
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectCount,} from './counterSlice';
export function Counter() {
  const count = useAppSelector(selectCount);
```

In the hooks.ts file:

```ts
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

Compare this to the vanilla Javascript version which looks like this:

```js
import { useSelector } from 'react-redux';
import { selectCount } from './counterSlice';
export function Counter() {
  const count = useSelector(selectCount);
```

As you can see, there is now an extra step there in the useSelector process.

TypedUseSelectorHook is discussed in the [Usage with TypeScript](https://react-redux.js.org/using-react-redux/usage-with-typescript) section of the React Redux website.

Since React-Redux is written in TypeScript now, this helper function as the docs say make it *easier to write typesafe interfaces between your Redux store and your React components.*

So the useAppDispatch and useAppSelector are there to *create pre-typed versions of the useDispatch and useSelector hooks for usage in your application.*  This is done in a separate file as they are variables, not types, and this file allows you to import them into any component file that needs to use the hooks and avoids potential circular import dependency issues.

There is also a section called [Typing Hooks Manually​](https://react-redux.js.org/using-react-redux/usage-with-typescript) which I wont cover.

### Store types

One other thing that is different is that there are types exported in the app/store.ts file:

```ts
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
```

This are not in the vanilla Redux example.  About this the above link says: *extract the RootState type and the Dispatch type so that they can be referenced as needed. Inferring these types from the store itself means that they correctly update as you add more state slices or modify middleware settings.*

There is a discussion of using connect with hooks which the counter example doesn't have.  At the end there are some helpful links which will become important in the next blog post about the small social media feed app that is started in part 3.

- [Redux docs: Usage with TypeScript](https://redux.js.org/recipes/usage-with-typescript): Examples of how to use Redux Toolkit, the Redux core, and React Redux with TypeScript
- [Redux Toolkit docs: TypeScript Quick start](https://redux-toolkit.js.org/tutorials/typescript): shows how to use RTK and the React-Redux hooks API with TypeScript
- [React+TypeScript Cheatsheet](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet): a comprehensive guide to using React with TypeScript
- [React + Redux in TypeScript Guide](https://github.com/piotrwitek/react-redux-typescript-guide): extensive information on patterns for using React and Redux with TypeScript

## Original Readme

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) TS template.

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
