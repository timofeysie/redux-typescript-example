# React Redux TypeScript Example

This project is based on the example apps from the official [Redux Essentials](https://redux.js.org/tutorials/essentials/part-1-overview-concepts).  This trail focuses on vanilla Javascript.  The goal on this project is to demonstrate a TypeScript implementation of this, as well as provide unit testing where non exists.

It contains the classic counter example along with a small social media feed app.  The code for the project can be found [here](https://github.com/timofeysie/redux-typescript-example).  There are branches named after some of the steps to provide a jumping off point if needed.

## Workflow

```shell
npm start
npm test
```


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

These are not in the vanilla Redux example.  About this the above link says: *extract the RootState type and the Dispatch type so that they can be referenced as needed. Inferring these types from the store itself means that they correctly update as you add more state slices or modify middleware settings.*

There is a discussion of using connect with hooks which the counter example doesn't have.  At the end there are some helpful links which will become important in the next blog post about the small social media feed app that is started in part 3.

- [Redux docs: Usage with TypeScript](https://redux.js.org/recipes/usage-with-typescript): Examples of how to use Redux Toolkit, the Redux core, and React Redux with TypeScript
- [Redux Toolkit docs: TypeScript Quick start](https://redux-toolkit.js.org/tutorials/typescript): shows how to use RTK and the React-Redux hooks API with TypeScript
- [React+TypeScript Cheatsheet](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet): a comprehensive guide to using React with TypeScript
- [React + Redux in TypeScript Guide](https://github.com/piotrwitek/react-redux-typescript-guide): extensive information on patterns for using React and Redux with TypeScript

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

There are no tests also for the new code.  There eventually should be for the api/client.js and api/server.js and maybe the spinner, but it's time to move on now.

By the way, you may see code samples with semi-colons ending statements, and sometimes none.  They are not actually needed in JavaScript.  You might notice that the examples from the Redux site have no semi-colons.  For me they get added automatically by my Prettier formatting plugin, and I'm not really worried about them either way.

## Main Posts Feed

The [Main Posts Feed](https://redux.js.org/tutorials/essentials/part-3-data-flow#main-posts-feed) section of the Redux Essentials has the simple goal to only show a list of posts.  This starts in the inside the src/features folder which we already have from counter example.

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

The Redux Essentials tutorial doesn't mention anything about this.  That's understandable, as they are focusing on teaching Redux Toolkit features.  However, as a frontend developer, we always need to worry about style.  So I want to find out how the styles broke and fix them.

My first guess is the missing styles have something to do with the changes made in the router and the way the components are now used in the App.tsx.  I'm probably wrong about that.  For now, we can add our own styles that match the UI and move on.

In the src\features\posts\AddPostForm.tsx file:

The section tag can re-use the posts-list class.

```html
<section className="posts-list">
```

Then, we also need a form-input class for the inputs and the button muted-button classes for the button:

```html
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
          className="form-input"
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
          className="form-input"
        />
        <button
          type="button"
          onClick={onSavePostClicked}
          className="button muted-button"
        >
          Save Post
        </button>
```

Then, add this class in the src\index.css file:

```css
/* form styles */
.form-input {
  margin: 10px;
}

.muted-button {
  border: none;
}
```

And then things don't look so ugly now.  I haven't discovered why the styles aren't like they are in the online demo yet.  When I go over this trail again on the next major version, I will be sure to try and figure it out then.

### Unit testing the save added post function

After this change a post can be added and a unit test for the add can be created in the postsSlice.spec.ts.

Similar to the form, import the reducer if it's not already there:

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

(To add to the page writings\redux-essentials-app-in-typescript.md)

## Summary so far

This is the end of step three.  I hope you have a good idea now of how to incorporate TypeScripts and unit testing into a React app using the Redux toolkit.

The commit for the above add post form work can be found [here](https://github.com/timofeysie/redux-typescript-example/commit/2d18b74728fe01bc8eb5b1c41b3a7d896b3787df).

In [the next step](https://redux.js.org/tutorials/essentials/part-4-using-data) the following will be covered:

- Creating a Single Post Page
- Editing Posts
- Updating Post Entries
- Users and Posts
- Sorting the Posts List
- Post Reaction Buttons

Use the hashtag #ReactReduxTypescriptExample and the link below on Twitter for any comments or feedback.

## Showing Single Posts

Part 4 of the Redux Essentials trail covers [Showing Single Posts](https://redux.js.org/tutorials/essentials/part-4-using-data#showing-single-posts).

Begin by copying the code from the above linked section for features/posts/SinglePostPage.js making sure to change the file extension from *.js* to *.tsx*.

There will be a few TypeScript errors at the top of the file shown here:

```ts
export const SinglePostPage = ({ match }) => {
  const { postId } = match.params

  const post = useSelector(state =>
    state.posts.find(post => post.id === postId)
  )
  ...
}
```

The first line has this error on the match argument:

```err
Binding element 'match' implicitly has an 'any' type.ts(7031)
No quick fixes available
```

Next, the state inside the useSelector has this error:

```err
Object is of type 'unknown'.ts(2571)
```

And lastly, on the same line as the state error, post similarly shows this error:

```err
Parameter 'post' implicitly has an 'any' type.ts(7006)
```

### Typing props

The first error on the *match* object in the SinglePostPage highlights an important part of TypeScript with React.

The error reads: Binding element 'match' implicitly has an 'any' type.ts(7031)

Objects with props need types like this: 

```javascript
{a,b} : {a:any, b:any}
```

We want to try harder and avoid the 'any' cop-out if we can.  And we have some details about the match object in the docs: *React Router will pass in a match object as a prop that contains the URL information we're looking for. When we set up the route to render this component, we're going to tell it to parse the second part of the URL as a variable named postId, and we can read that value from match.params.*

There was no mention of the match prop for React Router 6 in the cheat-sheet.

In general, to type props, you create an interface at the top of the file after the imports.  The object name + "Props" is the usual naming standard.  It looks something like this:

```ts
interface SinglePostPageProps {
    match: {
        params: any;
    }
}

export const SinglePostPage = ({ match }: SinglePostPageProps) => { ... }
```

This will work to make the error go away, but again, we don't want to rely on any if it can be helped.  It would be OK to get this feature working and then come back and type it when we know what it is.  There are changes to the Router v6 which I will talk about in a minute.

### useAppSelector not useSelector

The next error comes from the useSelector.

```ts
const post = useSelector(state =>
  state.posts.find(post => post.id === postId)
)
```

It causes this error:

```err
Object is of type 'unknown'.ts(2571)
```

The post object similarly shows this error:

```err
Parameter 'post' implicitly has an 'any' type.ts(7006)
```

To use useAppSelector, first import it and just switch it in:

```ts
import { useAppSelector } from "../../app/hooks"
...
  const post = useAppSelector(state =>
    state.posts.find(post => post.id === postId)
  )
```

Errors begone!  We will deal with the post ID next.

### The Single page Router

We have to use React Router 6 syntax again for the single page route.  It seems like this should work:

```ts
import { SinglePostPage } from "./features/posts/SinglePostPage";

...

<Route
  path="/posts/:postId"
  element={
    <section>
      <React.Fragment>
        <SinglePostPage />
      </React.Fragment>
    </section>
  }
/>
```

However, we get this error:

```err
Property 'match' is missing in type '{}' but required in type 'SinglePostPageProps'.ts(2741)
SinglePostPage.tsx(5, 5): 'match' is declared here.
```

Apparently, as of React Router v6, there is no passing of props via the router.  Instead we are meant to use functional components and router hooks to detect url changes.  Why oh why all the breaking changes?  OK, I'm sure they had a good reason to break from v5.

The React hooks that are provided by the router are:

- useLocation
- useParams
- useNavigate

What this means for our app here is that you can forget all that about typing the props from above.  I'm not sure if this is the best practice for getting the router param, but this does work:

In the App.tsx file, we don't actually need the React.Fragment, section or other wrapper.  This is the basic form:

```ts
<Route
  path="/posts/:postId"
  element={<SinglePostPage />
  }
/>
```

Then, we need to import the useParams hook, and use it to get the ID.

```ts
import { useParams } from "react-router-dom";
...
export const SinglePostPage = () => {
  const params = useParams();
  const postId = params.postId;
  ...
}
```

Then in the PostsList.tsx:

```ts
...
import { Link } from 'react-router-dom'

export const PostsList = () => {
  const posts = useAppSelector((state) => state.posts);
  const renderedPosts = posts.map((post: Post) => (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  ))
  ...
}
```

Then if you run the app, the routing works and we have a detail page.

To get back to the main page, this step also adds a link in the app/Navbar.js (which is app/Navbar.tsx for us).  That will happen after we test the initial route first.

### Testing the routes

Next, we want to test the routing to give us confidence in case something breaks it in the future.

The recommended way to test the router is by seeing what's on the page, choosing a route, and then see what's on the page again after the router does it's thing.  Since the test will be looking at the DOM, we can dust off that old App.test.tsx which renders the App and checks for the string "Redux".

[The official testing library docs](https://testing-library.com/docs/example-react-router/) for the router show how to use the MemoryRouter which allows us to manually control the router history.

Testing a route in App.test.tsx looks like this:

```ts
import { render, screen } from "@testing-library/react"
import { Provider } from 'react-redux'
import { store } from './app/store'
import App from './App'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

test('full app rendering/navigating', async () => {
  render(<Provider store={store}>
    <App />
  </Provider>)
  const user = userEvent.setup()
  expect(screen.getByText(/posts/i)).toBeInTheDocument()
  await user.click(screen.getAllByText(/View Post/i)[0])
  expect(screen.getByText(/First Post!/i)).toBeInTheDocument()
})
```

In the first expect we verify page content for default route which contains the title "Posts".
The userEvent.click function from the testing library clicks the button.  Since all the buttons have the same text "View Post", we have to use the getAllByText and take the first one in the array.
The last expect verifies page content for the expected route after navigating to the post.

### Using a test id

The last expect could also now fail if someone changes the initial posts which is just dummy content added for the tutorial.  Eventually we will have real content, but we don't want a test failing for something that is not a problem with the app itself.  So what we can do here is use a test id.  We can put this in the detail page

data-testid="location-display"

Next, if we want to test the post not found page, we have a bit of a problem with the way the router is set up.  The App.tsx file has the router and the route.  We want to do this to test the bad page route:

```ts
test("landing on a bad page", () => {
  const badRoute = "/posts/100";
  render(
    <MemoryRouter initialEntries={[badRoute]}>
      <Provider store={store}>
        <App />
      </Provider>
    </MemoryRouter>
  );
  expect(screen.getByText(/Post not found!/i)).toBeInTheDocument();
});
```

Wrapping a router with a router will give the following error.

*You cannot render a <Router> inside another <Router>. You should never have more than one in your app.*

The solution is to move the router to index.js (index.tsx).

```ts
import {
  BrowserRouter as Router,
} from "react-router-dom";
... omitted code ...
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);
```

Also remove <Router> from the App.tsx.  Since the router was the enclosing tag, we would get an error if we just remove it.

```ts
function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
      ... omitted code ...
      </div>
    </Router>
  )
}
```

Remove router there and you will see an error - *JSX expressions must have one parent element.ts(2657)*

I have seen many people add an empty tag as a parent element.  I've also heard that this is not considered a best practice.  

```ts
function App() {
  return (
    <>
      <Navbar />
      ... omitted code ...
    </>
  )
}
```

It's called a React fragment.  It fixes the issues without adding extra nodes to the DOM.

Now however, the first two test will fail with a message like this.

*useRoutes() may be used only in the context of a <Router> component.*

We have to add a router wrapper to those App components also.  It is actually done with a wrapper.

```JavaScript
const { container } = render(
  <Provider store={store}>
    <App />
  </Provider>, {wrapper: BrowserRouter})
```

And there we go, more tests and hopefully able to sleep a bit better.

Next the tutorial adds a link back to the main posts page in the <Navbar> component.

```ts
import { Link } from 'react-router-dom'
...
<div className="navContent">
  <div className="navLinks">
    <Link to="/">Posts</Link>
  </div>
</div>
```

Another test can be written for this as well.  If you run the tests after making the above change, you will notice that our first router test is failing now.

We were looking for the work "Posts", of which there are two now, causing the *TestingLibraryElementError: Found multiple elements with the text: /Posts/i* message.

This can also be fixed with a test-id.  Add this to the title on the PostsList.tsx file:

```ts
<h2 data-testid="post-list-title">Posts</h2>
```

We also want to add a test id to to the src\features\posts\SinglePostPage.tsx:

```JavaScript
  return (
    <section data-testid="location-display">
      <article className="post">
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
      </article>
    </section>
  );
```

The App.test.tsx can be updated to use the id.

```ts
expect(screen.getByTestId('post-list-title')).toBeInTheDocument()
await user.click(screen.getAllByText(/View Post/i)[0])
expect(screen.getByText(/First Post!/i)).toBeInTheDocument()
expect(screen.getByTestId('location-display')).toBeInTheDocument()
```

Now the presence of the id is being looked for and wont be affected by content change.

We can use the same method to test the nav link which should be back to the posts list.

Put a test id on the nav link:

```JavaScript
<div className="navLinks">
  <Link to="/" data-testid="nav-post-link">Posts</Link>
</div>
```
a
Add the below at the end of the same test case and we have another regression test ready to go.

```ts
await user.click(screen.getByTestId("nav-post-link"));
expect(screen.getByTestId('post-list-title')).toBeInTheDocument();
```

```txt
Test Suites: 3 passed, 3 total
Tests:       9 passed, 9 total
Snapshots:   0 total
Time:        2.353 s, estimated 7 s
```

That's enough for this section.  Next up in step four of the Redux essentials tutorials is [editing the posts](https://redux.js.org/tutorials/essentials/part-4-using-data#editing-posts).

Step four is a big one.  After editing a post there is a section for Users and Posts and another for More Post Features.  Instead of creating separate posts for those, I will keep adding sections here.

I hope you enjoyed the content.  Please reach out on twitter with the hashtag #ReduxEssentialsInTypeScript if you have any questions or feedback.  See you next time.

## Editing a post with Redux and TypeScript

[Editing Posts](https://redux.js.org/tutorials/essentials/part-4-using-data#editing-posts) is part of step 4 from the Redux Essentials learning trail.

In this part we create an <EditPostForm> component to do the following:

- take an existing post ID,
- read that post from the store
- edit the title and post content
- save the changes to update the post in the store

This functionality requires

- a new reducer function in the postsSlice
- an action to dispatch and update posts

### tip

To follow along with this article in code you can clone the current state of the Redux Essentials demo app in TypeScript from [the current state of the last section in this repo](https://github.com/timofeysie/redux-typescript-example/tree/part-4-showing-single-posts).

### The reducer and the action object

Inside of the createSlice() reducers object add a new function.  Remember that the reducer is responsible for determining how the state should be updated.  Our first reducer was called postAdded, so let's call this one postUpdated.  The reducer name will show up as part of the action type string in the Redux DevTools.

The action object generated by the create slice function will look like this:

```javascript
{
  type: 'posts/postUpdated',
  payload: {
    id, title, content
  }
}
```

- The Type field is a descriptive string
- The payload field will be an object with the form fields

The action generated by createSlice accepts one argument which goes into the action object as action.payload.

The reducer must:

- find the right post object based on the ID
- update the title and content fields in that post

We also must export the action creator function that createSlice generated for us,
so that the UI can dispatch the new postUpdated action when the user saves the post.

Given all those requirements, here's how our postsSlice definition should look after we're done:

```js
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    ... omitted code for the postAdded reducer ...
    postUpdated(state, action) {
      const { id, title, content } = action.payload
      const existingPost = state.find(post => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    }
  }
});

export const { postAdded, postUpdated } = postsSlice.actions
```

You can see there how we find a post object based on the ID and update the title and content fields.  This all happens inside the createSlice function and we export the action created by this at the end.

The id, title and content variables are set with [destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment).  This would be equivalent to doing it the long way like this:

```JavaScript
const id = action.payload.id;
const title = action.payload.title;
const content = action.payload.content;
```

### The EditPostForm

Take the features/posts/EditPostForm.js code shown in the [editing posts](https://redux.js.org/tutorials/essentials/part-4-using-data#editing-posts) section and rename it EditPostForm.tsx in our project.  If you don't see any errors in your VSCode editor, make sure that you have used the .tsx extension for the file.  This will trigger the TypeScript checking which will underline errors in red squiggly lines and provide the mouse-over messages.  The good thing about TypeScript is that you see these errors before you run the app and have to discover the errors (or not) by using the app.

The first error is this:

 ```javascript
import { useHistory } from 'react-router-dom'
```

*Module '"react-router-dom"' has no exported member 'useHistory'.ts(2305)*

In react-router-dom v6 useHistory() is replaced by useNavigate().  Also, the 'match' param will have to be replaced as it was in the SinglePostPage.tsx component.

```javascript
import { postUpdated } from './postsSlice'

export const EditPostForm = ({ match }) => {
  const { postId } = match.params

  const post = useSelector(state =>
    state.posts.find(post => post.id === postId)
  )
  ...
}
```

Instead of useSelector, we have useAppSelector.  Also import the useParams so we can replace the match param with a hook version using useParams:

```javascript
import { useAppSelector } from "../../app/hooks"
import { useParams } from "react-router-dom"

export const EditPostForm = () => {
    const params = useParams();
    const postId = params.postId;
    const post = useAppSelector((state) =>
      state.posts.find((post) => post.id === postId)
    );
```

The next issue comes from these lines.

```javascript
const [title, setTitle] = useState(post.title)
const [content, setContent] = useState(post.content)
```

The error being that *Object is possibly 'undefined'.ts(2532)*

With the release of TypeScript 3.7, optional chaining is available.

Optional chaining uses "?" to avoid undefined properties.

The solution is to use that for post: ```post?.title``` and ```post?.content```

Next, the event objects need to be typed.

```javascript
const onTitleChanged = e => setTitle(e.target.value)
const onContentChanged = e => setContent(e.target.value)
```

As was done previously, we need to see what kind of input the event is coming from to type if correctly.

```html
<input
  type="text"
  id="postTitle"
  name="postTitle"
  placeholder="What's on your mind?"
  value={title}
  onChange={onTitleChanged}
/>
<textarea
  id="postContent"
  name="postContent"
  value={content}
  onChange={onContentChanged}
/>
```

So our types will be the same as the AddPostForm.tsx:

```javascript
const onTitleChanged = (e: React.FormEvent<HTMLInputElement>) =>
  setTitle((e.target as HTMLInputElement).value)
const onContentChanged = (e: React.FormEvent<HTMLTextAreaElement>) =>
  setContent((e.target as HTMLInputElement).value)
```

Since this is repeating exactly what was done there, it would be good to refactor later and have one shared component for the create and update form.  Just an idea.  It's also a good idea to keep a list of things you want to refactor so it doesn't get lost in the deluge of work.

Now there is only one error left with the new form.

```javascript
const onSavePostClicked = () => {
  if (title && content) {
    dispatch(postUpdated({ id: postId, title, content }))
    history.push(`/posts/${postId}`)
  }
}
```

The error on "push" says: *Property 'push' does not exist on type 'NavigateFunction'.ts(2339)*

The useNavigate hook returns a function, not a history object with a push method.
Rename history to navigate so there's no future confusion: ```const navigate = useNavigate()```

Then replace the push line with this:

```javascript
navigate(`/posts/${postId}`);
```

You might also want to add styles to the form like last time so it looks nice.

```html
<section className="posts-list">
...
  <form className="post-excerpt form-container">
  ...
  <button className="button muted-button"
```

### Using the form

Now we import and add the form component to the App.tsx routes.  The tutorial is currently using the React Router v5 and it's format looks like this:

```javascript
<Route exact path="/editPost/:postId" component={EditPostForm} />
```

Since we are using Router v6 here, our version should look like this:

```javascript
<Route path="/editPost/:postId" element={<EditPostForm />} />
```

The link goes on the SinglePostPage.tsx component where we import the

```javascript
<Link to={`/editPost/${post.id}`} className="button">
  Edit Post
</Link>
```

## Test the forms

Testing the edit for can be done the same way that the add post form was tested in the "Unit testing the save added post function" section.  The src/features/posts/postsSlice.spec.ts can use the postUpdated action.  We pass it the postAddedState which is the same one we used for the add post test, and then edit the third item there and expect the result.

```javascript
const postUpdatedState = [
  { id: "1", title: "First Post!", content: "Hello!" },
  { id: "2", title: "Second Post", content: "More text" },
  { id: "3", title: "test-title-edit", content: "test-content-edit" },
];
it('edit a post', () => {
  const actual = postsReducer(postAddedState, postUpdated({
    id: "3",
    title: "test-title-edit",
    content: "test-content-edit",
  }));
  expect(actual).toEqual(postUpdatedState);
});
```

There is probably a better way to setup and run the test that doesn't rely on arrays like this, but this will do for now.

```text
Test Suites: 3 passed, 3 total
Tests:       10 passed, 10 total
```

This gives one confidence that the app is working, which helps when refactoring.  It just so happens that in the next section, the id field is refactored to use a Redux toolkit nano id, which will make it interesting for these tests since they rely on simple id values.

[Here](https://github.com/timofeysie/redux-typescript-example/tree/part-4-edit-post) is the branch for the completed code from this section.

## Refactoring with reducer prepare callback

In the [Preparing Action Payloads](https://redux.js.org/tutorials/essentials/part-4-using-data#preparing-action-payloads) there is a discussion about where to put the logic to create the id.  The solution is to use a "prepare callback" which takes multiple arguments, generate random values like unique IDs, and run whatever other synchronous logic is needed to decide what values go into the action object.

Since the toolkit createSlice function generates the action for us, the prepare callback is a way to include logic that in the past would have been put into the hand-written action.  Here is the example of how to do this:

features/posts/postsSlice.js

```javascript
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload)
      },
      prepare(title, content) {
        return {
          payload: {
            id: nanoid(),
            title,
            content
          }
        }
      }
    },
    // other reducers here
  }
})
```

We will have to add nanoid to the imports of the slice also.

Then we have to remove the nano id from the dispatch in the add post form.

src/features/posts/AddPostForm.tsx

```javascript
dispatch(
  postAdded({
    id: nanoid(),
    title,
    content,
  })
);
```

The above now becomes:

```javascript
dispatch(postAdded(title, content))
```

To make this change, you have to move the import from the add post form to the posts slice file.

Then you might notice a few errors remaining in both files.

The red squiggly underline of "prepare" in the posts slice file has an extremely long and very common type of TypeScript error when you mouse over it:

```error
Type '(title: any, content: any) => { payload: { id: string; title: any; content: any; }; }' is not assignable to type '((title: any, content: any) => { payload: { id: string; title: any; content: any; }; }) & ((...a: never[]) => Omit<PayloadAction<any, string, any, any>, "type">)'.
  Type '(title: any, content: any) => { payload: { id: string; title: any; content: any; }; }' is not assignable to type '(...a: never[]) => Omit<PayloadAction<any, string, any, any>, "type">'.
    Type '{ payload: { id: string; title: any; content: any; }; }' is missing the following properties from type 'Omit<PayloadAction<any, string, any, any>, "type">': meta, errorts(2322)
postsSlice.ts(17, 7): The expected type comes from property 'prepare' which is declared here on type '{ reducer(state: WritableDraft<{ id: string;
  title: string; content: string; }>[], action: PayloadAction<any, string, any, any>): void; prepare(title: any, content: any): { ...; }; } & { ...; }'
```

That's a lot of detail to get in a little mouseover window.  Reformatting the error could make it more understandable:

```error
Type '(title: any, content: any) => { payload: { id: string; title: any; content: any; }; }'
is not assignable to
type '((title: any, content: any) => { payload: { id: string; title: any; content: any; }; })
& ((...a: never[]) => Omit<PayloadAction<any, string, any, any>, "type">)'.

Type '(title: any, content: any) => { payload: { id: string; title: any; content: any; }; }'
is not assignable to type
'(...a: never[]) => Omit<PayloadAction<any, string, any, any>, "type">'.

Type '{ payload: { id: string; title: any; content: any; }; }'
is missing the following properties from type 'Omit<PayloadAction<any, string, any, any>, "type">': meta, errorts(2322)

postsSlice.ts(17, 7):
The expected type comes from property 'prepare' which is declared here on type
'{ reducer(state: WritableDraft<{ id: string;
  title: string; content: string; }>[], action: PayloadAction<any, string, any, any>): void; prepare(title: any, content: any): { ...; }; } & { ...; }'
```

The format of these kind of type errors is:

```error
Type 'x' is not assignable to type 'y'.
Type 'x' is not assignable to type 'z'.
Type 'x' is missing the following properties from type 'z': meta, errorts(2322)
The expected type comes from property 'prepare' which is declared here on type ''
```

Where:

```txt
x = { payload: { id: string; title: any; content: any; }; }
z = Omit<PayloadAction<any, string, any, any>, "type"> (the callback)
y = x + z
```

There is a section on the Redux "Usage with TypeScript" page about [Typing prepare Callbacks](https://redux.js.org/usage/usage-with-typescript#typing-prepare-callbacks) which shows a special notation for defining the prepare callback.

The code example there is from some fictitious receiveAll reducer:

```javascript
receivedAll: {
  reducer(
    state,
    action: PayloadAction<Page[], string, { currentPage: number }>
  ) {
    state.all = action.payload
    state.meta = action.meta
  },
  prepare(payload: Page[], currentPage: number) {
    return { payload, meta: { currentPage } }
  }
}
```

Compare this to our postAdded function, and you will see, they are quite different.

```javascript
postAdded: {
  reducer(state, action) {
    state.push(action.payload)
  },
  prepare(title, content) {
    return {
      payload: {
        id: nanoid(),
        title,
        content
      }
    }
  }
},
```

I'm not sure how to use the PayloadAction type.  I started with 'any' and the app ran.  Then I played around with it until this worked also.

We must replace this:

```javascript
reducer(state, action) {
  state.push(action.payload)
},
```

With this:

```javascript
reducer(
  state,
  action: PayloadAction<{ id: string; title: string; content: string }>
) {
  state.push(action.payload);
},
```

PayloadAction also needs to be added to the toolkit import.

Aren't we were removing the id from the action?  The id is there because the prepare callback adds the id to the payload, so even though it doesn't match the dispatched action from the form, it's there because the end result is an action that includes an id.

The new id will look something like this: id:"ZOPIUMfyw6hgZ3RFMDyhN"

However, if you run the app at this point, there is an error in postsSlice.spec.ts:

```txt
TS2554: Expected 2 arguments, but got 1.
```

Even though the app should run, it's a shame that an out of date test will break it.

### Fixing the slice unit test

The unit test has been working of incremental numbers previously.  Run the tests and you will get something like this:

```errors
FAIL  src/features/posts/postsSlice.spec.ts
 ● posts reducer › should handle post
   expect(received).toEqual(expected) // deep equality
   - Expected  - 1
   + Received  + 1
   @@ -9,9 +9,9 @@
         "id": "2",
         "title": "Second Post",
       },
       Object {
         "content": "test-content",
   -     "id": "3",
   +     "id": "XaAJCkKYzv-ZXMiErLrjn",
         "title": "test-title",
       },
     ]
```

That's because this is what we are expecting:

```javascript
const expectedPostAddedState = [
  { id: "1", title: "First Post!", content: "Hello!" },
  { id: "2", title: "Second Post", content: "More text" },
  { id: "3", title: "test-title", content: "test-content" },
];
```

The simplest way to fix this is just check for length:

```javascript
expect(actualState.length).toEqual(initialState.length + 1);
```

The postAdded call also needs to be updated to remove the id:

```javascript
postAdded("test-title", "test-content")
```

We don't need the awkward expectedPostAddedState array anymore, so delete that.

We can also then individually check the title or content or both for the expected values if we need more safety.

```javascript
const actualText  = actualState[initialState.length].title;
const expectedText = "test-title";
expect(actualText).toEqual(expectedText);
```

Now there are ten passing tests once again.  Refactor complete.

## Authors and Posts

The next step is [Users and Posts](https://redux.js.org/tutorials/essentials/part-4-using-data#users-and-posts).  It consists of two parts:

- Adding a Users Slice
- Adding Authors for Posts

Note: to follow along, the starting point for this code is in the [part-4-preparing-action-payloads](https://github.com/timofeysie/redux-typescript-example/tree/part-4-preparing-action-payloads) branch of my [redux-typescript-example](https://github.com/timofeysie/redux-typescript-example) repo.

Now, the Users and Posts section calls for creating a new feature directory called users.  The first file to go in it is this:

```text
features/users/usersSlice.js
```

Lets create that directory and file and change the extension to usersSlice.ts

Copy the source from the [code example](import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  { id: '0', name: 'Tianna Jenkins' },
  { id: '1', name: 'Kevin Grant' },
  { id: '2', name: 'Madison Price' }
]

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {}
})

export default usersSlice.reducer) and there are no TypeScript errors with this new file.  So time to create a unit test file for it also:

```text
features/users/usersSlice.spec.ts
```

Similar to the posts slice spec, we just set it up to test the initial state:

```javascript
import usersReducer from "./usersSlice"
describe("posts reducer", () => {
  const initialState = [
    { id: "0", name: "Tianna Jenkins" },
    { id: "1", name: "Kevin Grant" },
    { id: "2", name: "Madison Price" },
  ];
  it("should handle initial state", () => {
    expect(usersReducer(undefined, { type: "unknown" })).toEqual(initialState)
  })
})
```

We are only testing the initial state of the createSlice function with no reducers yet, so this test should pass.

Next this new usersReducer is imported into the store file in app/store.ts and added it to the setup.

Next is [Adding Authors for Posts](https://redux.js.org/tutorials/essentials/part-4-using-data#adding-authors-for-posts).  In the postSlice.ts file update the postAdded action creator prepare callback to accept a user ID as an argument and include that in the action

Next update the existing post entries in initialState to have a post.user field with one of the user IDs

Then in the AddPostForm, read the list of users and put them in a dropdown. Add validation to the form so that the user can only click the "Save Post" button if the title and content inputs have text.

features/posts/AddPostForm.js

const users = useSelector(state => state.users)

'state' is of type 'unknown'.ts(18046)

From the [Define Typed Hooks](https://redux.js.org/usage/usage-with-typescript#define-typed-hooks) (from the useful links below) we use the example of the RootState type to fix this:

```javascript
import type { RootState } from "../../app/store";
...
const users = useSelector((state: RootState) => state.users);
```

The last and next error is then solved by typing the DOM click event which its proper HTML type which is in this case a select element.

This:

```javascript
const onAuthorChanged = (e) => setUserId(e.target.value);
```

Becomes this:

```javascript
const onAuthorChanged = (e: React.FormEvent<HTMLSelectElement>) => setUserId((e.target as HTMLInputElement).value);
```

Then in order to run the app again, we also need to update the postsSlice.spec.ts postAdded function call to include an id and sole this error:

```txt
Expected 3 arguments, but got 2.
    24 |     const actualState = postsReducer(
    25 |       initialState,
  > 26 |       postAdded("test-title", "test-content")
```

This is the author id from the hard-wired list of users, not a post id, so is not using nano yet.  We can update the function like this:

```javascript
postAdded("test-title", "test-content", 0)
```

I'm noticing some inconsistences now with this function.

Here the update function has a different signature.

```javascript
      postUpdated({
        id: "3",
        title: "test-title-edit",
        content: "test-content-edit",
      })
```

Here the id is a string, and the argument is an object.  Should there be a consistent pattern that the id is either first or last on all of them to avoid a developer getting used to one method of usage and all of a sudden make a mistake when one exception is used.

### The PostAuthor component

Continuing on in the [Users and Posts](https://redux.js.org/tutorials/essentials/part-4-using-data#users-and-posts) section, next a PostAuthor component is added to show the name of the post's author in two places:

1. inside the post list items
2. in the <SinglePostPage> component

First create the file PostAuthor.tsx (shown as features/posts/PostAuthor.js in the tutorial)

```javascript
import React from 'react'
import { useSelector } from 'react-redux'

export const PostAuthor = ({ userId }) => {
  const author = useSelector(state =>
    state.users.find(user => user.id === userId)
  )

  return <span>by {author ? author.name : 'Unknown author'}</span>
}
```

The useSelector hook is the standard way to get data from the store.

Next userId, state and user all need to be typed.

Using RootState can fix up state and user the same way as was done in AddPostForm.

How about userId?  That will require typing the props!

```javascript
interface PostAuthorProps {
  userId: string;
}

export const PostAuthor = ({ userId }: PostAuthorProps) => {
  ...
```

In the SinglePostPage.tsx file, there is now an error under the post.user: Property 'user' does not exist on type 'Post'.ts(2339)

 ```javascript
 <PostAuthor userId={post.user} />
```

The quick fix is to add a user property to the post interface.

I think at this point we will have to update the interface for a post to something like this:

src\features\posts\Post.ts

```javascript
export interface Post {
  id: string;
  title: string;
  content: string;
  userId?: string;
  user?: string;
}
```

It seems like this should be author, not user, but a user is an author, so whatever.

Next, the red squiggly line moved to userId:

```txt
Type 'string | undefined' is not assignable to type 'string'.
  Type 'undefined' is not assignable to type 'string'.ts(2322)
PostAuthor.tsx(6, 3): The expected type comes from property 'userId' which is declared here on type 'IntrinsicAttributes & PostAuthorProps'
```

The solution to this type of error is to add a possible undefined type like this:

```javascript
interface PostAuthorProps {
  userId: string | undefined;
}
```

That's called a [union type](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types) which let you combine types.

Now when you add a post, you can choose a user from the select and the author field will appear in the new post.  However, the current posts will be by unknown users.  If you want to fix this, you would have to update the initial state in the posts slice to contain a user field:

const initialState: Post[] = [
  { id: "1", title: "First Post!", content: "Hello!", user: "0" },
  { id: "2", title: "Second Post", content: "More text", user: "2" },
];

### Adding users to the tests

If you run the tests now, there will be one failing:

```jest
 FAIL  src/features/posts/postsSlice.spec.ts
  ● counter reducer › should handle initial state

    expect(received).toEqual(expected) // deep equality

    - Expected  - 0
    + Received  + 2

      Array [
        Object {
          "content": "Hello!",
          "id": "1",
          "title": "First Post!",
    +     "user": "0",
        },
        Object {
          "content": "More text",
          "id": "2",
          "title": "Second Post",
    +     "user": "2",
        },
      ]

      18 |   ];
      19 |   it("should handle initial state", () => {
    > 20 |     expect(postsReducer(undefined, { type: "unknown" })).toEqual(initialState);
         |                                                          ^
      21 |   });
      22 |
      23 |   it("should handle increment", () => {
```

Since it's mentioning the counter there, I feel like there was some cutting and pasting from the original counter demo going on.  It's easy to forget to update the *human readable* portion of tests with comments on what is actually testing.  That can also be updated now.

Anyhow, to fix the error, you have to add the user ids to the src\features\posts\postsSlice.spec.ts initialState, expectedPostAddedState and postUpdatedState arrays and then the tests will be green once again.


## More Post Features

The last section of part 4 is called [More Post Features](https://redux.js.org/tutorials/essentials/part-4-using-data#more-post-features).  It details adding three features commonly found is social media apps.

- Storing Dates for Posts
- Sorting the Posts List
- Post Reaction Buttons

### Storing Dates for Posts

In the [Storing Dates for Posts](https://redux.js.org/tutorials/essentials/part-4-using-data#storing-dates-for-posts) section the tutorial shows adding a TimeAgo.js component.  First, in the postsSlice.tsx file we will add a new date to the prepare callback payload in a similar manner to how the id was created.

```javascript
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            user: userId,
          },
        }
      },
```

Next we create the time ago component: features/posts/TimeAgo.js.

As usual, ours will be a TypeScript version, so use the .tsx extension TimeAgo.tsx:

```javascript
import React from 'react'
import { parseISO, formatDistanceToNow } from 'date-fns'

export const TimeAgo = ({ timestamp }) => {
  let timeAgo = ''
  if (timestamp) {
    const date = parseISO(timestamp)
    const timePeriod = formatDistanceToNow(date)
    timeAgo = `${timePeriod} ago`
  }

  return (
    <span title={timestamp}>
      &nbsp; <i>{timeAgo}</i>
    </span>
  )
}
```

This will require the date-fns library.   So install that as so:

```shell
npm i date-fns
```

As with all things TypeScript, we will also need types for this package:

```shell
npm i @types/date-fns
```

Next, the timestamp prop needs to be typed, which we can do with an interface to fix this error:

```err
Binding element 'timestamp' implicitly has an 'any' type.ts(7031)
```

That looks like this:

```javascript
interface TimeAgoProps {
  timestamp: string | undefined;
}

export const TimeAgo = ({ timestamp }: TimeAgoProps) => {
```

The TimeAgo component will be added to two places:

1. <PostsList>
2. <SinglePostPage>

Since the posts are being kept oldest-first in the store, the tutorial shows how to sort them to be newest first.  This is done by comparing the timestamps in PostsList.tsx.

```javascript
const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
const renderedPosts = orderedPosts.map(post => {
```

At this point we will have to add the date to the Post interface to avoid this error:

```err
Property 'date' does not exist on type 'Post'.ts(2339)
```

Add that to the interface and we see this:

'b.date' is possibly 'undefined'.ts(18048)

There is also this error in the <section> tag in the return template.

```err
This JSX tag's 'children' prop expects a single child of type 'ReactNode', but multiple children were provided.ts(2746)
```

This is a little tricky, because it's not that tag that's the issue, it's the posts.  We have to put the empty tags around the renderedPosts to fix that.

```javascript
  return (
    <section className="posts-list">
      <h2 data-testid="post-list-title">Posts</h2>
      <>
        {renderedPosts}
      </>
    </section>
  );
```

The code should run now, except the post slice spec test will not let you:

```err
Compiled with problems:
ERROR in src/features/posts/postsSlice.spec.ts:30:7
TS2345: Argument of type '{ id: string; title: string; content: string; user: string; }[]' is not assignable to parameter of type 'Post[]'.
  Type '{ id: string; title: string; content: string; user: string; }' is missing the following properties from type 'Post': userId, date
    28 |   it("should handle increment", () => {
    29 |     const actualState = postsReducer(
  > 30 |       initialState,
       |       ^^^^^^^^^^^^
    31 |       postAdded("test-title", "test-content", 0)
    32 |     );
    33 |     expect(actualState.length).toEqual(initialState.length + 1);
```

Right, have to add dates to the sample posts now.

There is also an error in the postSlice.tsx postAdded reducer now:

```javascript
    postAdded: {
      reducer(
        state,
        action: PayloadAction<{ id: string; title: string; content: string }>
      ) {
        state.push(action.payload);
      },
```

Time to update that PayloadAction.  In the src\features\posts\postsSlice.ts file import the Post interface and use it like this:

```javascript
action: PayloadAction<Post>
```

Check [this commit](https://github.com/timofeysie/redux-typescript-example/commit/a95a12570be09491eb958791af674c369628362d) to see the changes made so far in adding the date and sorted list.

## Dates and unit tests

There are currently a few failing tests due to the introduction of dates.

```err
 FAIL  src/features/posts/postsSlice.spec.ts
  ● posts reducer › should handle initial state
    expect(received).toEqual(expected) // deep equality
    - Expected  - 2
    + Received  + 2
      Array [
        Object {
          "content": "Hello!",
    -     "date": "2023-02-05T02:23:08.932Z",
    +     "date": "2023-02-05T02:23:08.930Z",
```

Dates are notorious for making testing complicated.

Advice is to treat time as a dependency, so you can control it in your tests.  But we have already passed that point by moving the date creation logic inside the prepare statement of the postAdded action in the post slice.

Another issue here is that testing the initial state is not really very useful.  What you are testing? If the Redux reducer works? For sure it works, redux developers have already tested it.  We should try to focus tests on logic that could be buggy.

It serves as a starting point when creating a new slice, but I agree it's not a particularly meaningful test.  In this case, if we want to keep this test, then we can just test the length of the result to match the length of the initial state:

```javascript
expect(postsReducer(undefined, { type: "unknown" })).toHaveLength(initialState.length);
```

The meaning of each unit test should build up and create a picture of what we think is important in a feature.  In conjunction with the other tests, this might add a small certainty.  Of course, the contents of the initial state could be wrong.  We could test individual properties, but since the initial state is pretty much guaranteed, doing that is not really helpful.

There is one other failing test at this point:

```err
 FAIL  src/App.test.tsx
  ● navigates to the first post and back again
    TestingLibraryElementError: Unable to find an element with the text: /First Post!/i. This could be because the text is broken up by multiple elements. In this case, you can provide a function for your text matcher to make your matcher more flexible.
    
    Ignored nodes: comments, script, style
    ...
        <div
          class="App"
        >
          <section
            data-testid="location-display"
          >
            <article
              class="post"
            >
              <h2>
                Second Post
              </h2>
```

This is because the order of the posts has now changed.  We should be able to update the test like this to make it pass:

```javascript
  await user.click(screen.getAllByText(/View Post/i)[1]);
  expect(screen.getByText(/First Post!/i)).toBeInTheDocument();
```

But that surprisingly doesn't work.  Playing around with it a bit and this passes.

```javascript
  await user.click(screen.getAllByText(/View Post/i)[1]);
  expect(screen.getByText(/Second Post/i)).toBeInTheDocument();
```

I'm a bit confused by this.  I revert that change and the failing test is gone.  Strange.  We will have to keep an eye on this test.

## Emoji reaction buttons

Next up [Post Reaction Buttons](https://redux.js.org/tutorials/essentials/part-4-using-data#post-reaction-buttons) are added at the bottom of <PostsList> and <SinglePostPage>. It's basically a set of counters, the classic todo app of Redux, but this time with multiple counts.

Create the features/posts/ReactionButtons.tsx file.  The post prop will need to be types:

```javascript
export const ReactionButtons = ({ post }) => {
```

This means creating an interface to use like this:

```javascript
import { Post } from "./Post";

interface Props {
    post: Post;
}

export const ReactionButtons = ({ post }: Props) => {
```

Next, there is an error because we don't have the reactions field on the Post interface yet.

```javascript
{emoji} {post.reactions[name]}
```

The error is: Property 'reactions' does not exist on type 'Post'.ts(2339)

Add that to the list of things to do:

- add reactions field on the Post interface
- update the initialState post objects in the slice
- add reactions to the postAdded prepare callback function
- update the unit tests to have the reactions field

First of all, it's not clear how to add reactions to the initial state.

They are just an object of various types:

```javascript
const reactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀'
}
```

When something is not clear like this, and there is nowhere in the article where the solution is shown, this my friend, is where real learning happens.  We will have to solve this ourselves.  To do that requires internalizing the the problem and actually understanding what the solution is.

Is it OK to put an empty array as a type?

```javascript
export interface Post {
  id: string;
  title: string;
  content: string;
  user: string;
  date: string;
  reactions: [];
}
```

This seems pretty lax to me.  Are we going to be adding arbitrary reactions?  Then it makes sense.  Why not allow the user to choose what kind of reaction to add, and others can either echo that or add their own.

But the goal here is not to develop our own app, but to implement the provided example app in Typescript.  So I suppose I would accept the code to compile and run with the minimal changes for now.

The typescript error;

```err
Type '(title: any, content: any, userId: any) => { payload: { id: string; date: string; title: any; content: any; user: any; reactions: never[]; }; }' 
is not assignable to type '((title: any, content: any, userId: any) => { payload: { id: string; date: string; title: any; content: any; user: any; reactions: never[]; }; }) & ((...a: never[]) => Omit<{ payload: Post; type: string; }, "type">)'.
  Type '(title: any, content: any, userId: any) => { payload: { id: string; date: string; title: any; content: any; user: any; reactions: never[]; }; }' is not assignable to type '(...a: never[]) => Omit<{ payload: Post; type: string; }, "type">'.
    Call signature return types '{ payload: { id: string; date: string; title: any; content: any; user: any; reactions: never[]; }; }' and 'Omit<{ payload: Post; type: string; }, "type">' are incompatible.
      The types of 'payload.reactions' are incompatible between these types.
        Type 'never[]' is not assignable to type '[]'.
          Target allows only 0 element(s) but source may have more.ts(2322)
postsSlice.ts(42, 7): The expected type comes from property 'prepare' which is declared here on type '{ reducer(state: WritableDraft<Post>[], action: { payload: Post; type: string; }): void; prepare(title: any, content: any, userId: any): { payload: { id: string; ... 4 more ...; reactions: never[]; }; }; } & { ...; }'
```

When you see this kind of error, it helps at first to reformat it to see what it's actually saying.  Separate the text from the code, and make sure the code is lined up with itself so you can see the differences easily:

```err
Type 
'(title: any, content: any, userId: any) => { payload: { id: string; date: string; title: any; content: any; user: any; reactions: never[]; }; }' 
is not assignable to type 
'((title: any, content: any, userId: any) => { payload: { id: string; date: string; title: any; content: any; user: any; reactions: never[]; }; }) & ((...a: never[]) => Omit<{ payload: Post; type: string; }, "type">)'.
  
Type 
'(title: any, content: any, userId: any) => { payload: { id: string; date: string; title: any; content: any; user: any; reactions: never[]; }; }' 
is not assignable to type 
'(...a: never[]) => Omit<{ payload: Post; type: string; }, "type">'.
    
Call signature return types 
'{ payload: { id: string; date: string; title: any; content: any; user: any; reactions: never[]; }; }' and 
'Omit<{ payload: Post; type: string; }, "type">' 
are incompatible.
      
The types of 'payload.reactions' are incompatible between these types.
Type 'never[]' is not assignable to type '[]'.
Target allows only 0 element(s) but source may have more.ts(2322)
postsSlice.ts(42, 7): 

The expected type comes from property 'prepare' which is declared here on type 
'{ reducer(state: WritableDraft<Post>[], action: { payload: Post; type: string; }): void; prepare(title: any, content: any, userId: any): { payload: { id: string; ... 4 more ...; reactions: never[]; }; }; } & { ...; }'
```

In this case, my unease with the lax type seems warrented.  But this is a learning exercise, so lets break it down a bit.

```err
Type 
'() => { payload: { }' 
is not assignable to type 
'(() => { payload: { }; }) & ((...a: never[]) => Omit<{ payload: Post; type: string; }, "type">)'.
```

As you can see, there is some fundamental issue here.  The simple solution is to use the 'any' cop-out:

```ts
reactions: any[];
```

There you go.  The giant error goes away with three letters.  What is the actual emoji type is a bit tricky to define.  But since this is about getting on with it, that can stand for now until there is a better idea.  There is more error fun to come.

In the src\features\posts\ReactionButtons.tsx file, the 'name' property has an error:

```tsx
<button
    key={name}
    type="button"
    className="muted-button reaction-button"
>
    {emoji} {post.reactions[name]}
</button>
```

The error is:

```err
Element implicitly has an 'any' type because index expression is not of type 'number'.ts(7015)
No quick fixes available
```

Typescript has a "as keyof" syntax which comes to mind here.  But as  the answer to this StackOverflow questions[Element implicitly has an 'any' type because index expression is not of type 'number' [7015]](https://stackoverflow.com/questions/53526178/element-implicitly-has-an-any-type-because-index-expression-is-not-of-type-nu) points out, *This is happening because you're attempting to index an object with a numeric index signature with string keys.*

The solutions given is: *A way to get this working (a hacky way) would be to cast the indexer to a string*.  For us, this looks like this:

```js
{emoji} {post.reactions[name as any]}
```

The only thing left to do then is the fix the test which is breaking the build.

In src\features\posts\postsSlice.spec.ts, add an empty reactions array to each test object:

```js
const initialState = [
  {
      id: "1",
      title: "First Post!",
      content: "Hello!",
      user: "0",
      date: dateSub10,
      reactions: [],
  },
  ...
```

Do that for all the objects and the app runs once more.

We still have to import and add the <ReactionButtons post={post} /> in src\features\posts\PostsList.tsx

We also need to update the <ReactionButtons> component to dispatch the reactionAdded action when the user clicks a button.

But this feature is not working.  There are no numbers next to the reaction buttons.  Also, when clicking on a reaction button, we see the following console error:

```err
errors.ts:49 Uncaught Error: [Immer] Immer only supports setting array indices and the 'length' property
    at n (errors.ts:49:1)
```

This is an interesting error.  Actually, I don't see where the error is coming from.  Here is the full stack trace:

```err
[Immer] Immer only supports setting array indices and the 'length' property
    at n (errors.ts:49:1)
    at on.set (proxy.ts:229:1)
    at reactionAdded (postsSlice.ts:38:1)
    at createReducer.ts:294:1
    at produce (immerClass.ts:94:1)
    at createReducer.ts:293:1
    at Array.reduce (<anonymous>)
    at reducer (createReducer.ts:260:1)
    at reducer (createSlice.ts:372:1)
    at combination (redux.js:560:1)
```

Going back to the step 4 tutorial, it is shown in a paragraph that the initial state for the postSlice file should indeed include this:

```js
reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0}
```

Adding that to the initial state then causes this error:

```err
Type '{ thumbsUp: number; hooray: number; heart: number; rocket: number; eyes: number; }' is not assignable to type 'any[]'.
  Object literal may only specify known properties, and 'thumbsUp' does not exist in type 'any[]'.ts(2322)
```

It turns out the Post interface was using an array instead of an object.  Change it to the 'any' type and everything works:

```js
reactions: any;
```

Say we did want to handle this type properly:

```js
export interface Post {
    id: string;
    title: string;
    content: string;
    user: string;
    date: string;
    reactions: {
        thumbsUp: number;
        hooray: number;
        heart: number;
        rocket: number;
        eyes: number;
    };
}
```

Usually a sub-type like that will be a separate interface, possibly in it's own file.  That would look like this if it was in the same file:

```js
export interface Post {
    id: string;
    title: string;
    content: string;
    user: string;
    date: string;
    reactions: Reaction;
}

export interface Reaction {
    thumbsUp: number;
    hooray: number;
    heart: number;
    rocket: number;
    eyes: number;
}
```

But then we get some more interesting errors.  In the posts slice, this line:

```js
existingPost.reactions[reaction]++
```

Causes this error:

```err
Element implicitly has an 'any' type because expression of type 'any' can't be used to index type 'WritableDraft<Reaction>'.ts(7053)
```

Great!  Never heard of WritableDraft before.  Yay, something new to learn!

I read this StackOverflow description:  *Redux Toolkit allows you to either return a new state (type State | WritableDraft<State> at the time of this answer, or type State | Draft<State> in newer versions of RTK) or modify the draft state and not return anything (type void). You get a Typescript error because returning number is neither or these.*

At this point, I'm OK with logging issues like this here and moving on with 'any' as a solution.  The post has grown long, and progress is slow.  At some point real life intrudes on well laid plans.  Priorities need to be considered.  The priority now for me is to get the RTK Query sooner rather than later.  Typescript and unit tests are still priorities, but not as important now as getting to the end of all the steps.

Here we are at the end of step 4.  Step 5 and 6 will finish off this app as far as functionality.  I'm assuming, though I don't know for sure, that step 7 and 8 will only refactor the solution to use RTK Query.  Given the slow speed, it's good to think how long this might take.

This post was started 2022-11-20.  It is now 2023-02-22.  However, during December I was able to spend more time on it.  This wont be the case going forward.  The post starts off at step three, as the first two were the counter example which was done previously.  So that's two steps in three months.  So a month and a half minimum for each step.  I'm not optimistic regarding time I can spend on this, so if we push that to two months a step, we wont be finished for another eight months.  You see the problem.  This is why, at this point, the "any" type will do.

### Testing the reactions

I'm surprised there is only one failure:

```txt
 FAIL  src/App.test.tsx (5.494 s)
  ● navigates to the first post and back again
    TestingLibraryElementError: Unable to find an element with the text: /First Post!/i. This could be because the text is broken up by multiple elements. In this case, you can provide a function for your text matcher to make your matcher more flexible.
    ...
             await user.click(screen.getAllByText(/View Post/i)[0]);
    > 29 |   expect(screen.getByText(/First Post!/i)).toBeInTheDocument();
         |                 ^    
```

If we look instead for (/View Post/i)[1]), the tests pass the first time, then fail the next.

Anyhow, we need at least one test for the the reactions feature.

Going a little deeper into the Redux documentation, I read [this about testing Redux](https://redux.js.org/usage/writing-tests): *Redux code can be treated as an implementation detail of the app, without requiring explicit tests for the Redux code in many circumstances.*

For a discussion on why testing implementation detail is not recommended, check out [one of my other articles on the TDD](https://timothycurchod.com/writings/tdd-react-anagram).  Basically, it's considered not good form to test implementation details.  This is because if you test the inner workings of a function, then it's a barrier to refactoring, and refactoring is a key of an iterative problem solving process.  I go into this problem solving method a bit more in my [RGR Coding Game Getting Started](https://timothycurchod.com/writings/rgr-coding-game-getting-started) article.  Sorry in advance for plugging two of my articles in one paragraph!

There are three other points of guidelines:

1. Prefer writing integration tests with everything working together. For a React app using Redux, render a <Provider> with a real store instance wrapping the components being tested. Interactions with the page being tested should use real Redux logic, with API calls mocked out so app code doesn't have to change, and assert that the UI is updated appropriately.
2. If needed, use basic unit tests for pure functions such as particularly complex reducers or selectors. However, in many cases, these are just implementation details that are covered by integration tests instead.
3. Do not try to mock selector functions or the React-Redux hooks! Mocking imports from libraries is fragile, and doesn't give you confidence that your actual app code is working.

Given this details, we would want to write a test for the reducer, not because it's complex, but because we need practice at that so when we do encounter a complex reducer, it's not a new thing.

I'm seriously considering point one and integration tests because on the job now we have started using [Cypress](https://testing-library.com/docs/cypress-testing-library/intro/) for integration testing, and it's coming along pretty well.

For now, I will write a simple reducer test, which can be done in the src\features\posts\postsSlice.spec.ts file.

We know that the initial state has zero for each reaction.  If we dispatch a thumbs up action, and put a one for thumbs up in the existing postUpdatedState array, then they should match.

This is what that would look like:

```js
  it("increments a reaction", () => {
      const actual = postsReducer(
          initialState,
          reactionAdded({ postId: 0, reaction: "thumbsUp" })
      );
      expect(actual).toEqual(postUpdatedState);
  });
```

However, now we have more broken tests because other tests rely on comparing the whole state.

```txt
Test Suites: 2 failed, 1 passed, 3 total
Tests:       3 failed, 8 passed, 11 total
```

A simple fix for this would be to add thumbs up value of 1 in the expectedPostAddedState array which is used in the "edit a post" test to compare it to the postUpdatedState array and then there is just one failing test.

The test then however looks for the second post, not the first one.  So I change the thumbs up value of the second post in the postUpdatedState array, but still the test fails.  This whole comparing the entire state is making me very uncomfortable.  There has to be a better way.

For now, I'm going to leave the tests where they are and move on to the next step.  This article is far too long, and given the fundamental issues with unit testing, it will all have to be revisited again.  Probably after a new major version of Redux is released.

## The mock API

The sample code uses and interesting [Mock Service Worker API tool](https://mswjs.io/) that's worth looking at for it's types, especially as we're all about Typescript here.

src\api\server.js

```js
export const db = factory({
  user: {
    id: primaryKey(nanoid),
    firstName: String,
    lastName: String,
    name: String,
    username: String,
    posts: manyOf('post'),
  },
  post: {
    id: primaryKey(nanoid),
    title: String,
    date: String,
    content: String,
    reactions: oneOf('reaction'),
    comments: manyOf('comment'),
    user: oneOf('user'),
  },
  comment: {
    id: primaryKey(String),
    date: String,
    text: String,
    post: oneOf('post'),
  },
  reaction: {
    id: primaryKey(nanoid),
    thumbsUp: Number,
    hooray: Number,
    heart: Number,
    rocket: Number,
    eyes: Number,
    post: oneOf('post'),
  },
})
```

Interesting to see the comments property there.  As far as I know, comments on posts are not covered in any of the steps.

## Thunk vs Saga Middleware

Async logic is known as middleware in the React/Redux world.  Coming from the Angular world where services expose observables and [RxJs](https://angular.io/guide/rx-library) provides all the operators you could ever want to do the same thing, it can take a while to get the hang of how the same things are done in Redux.

There are different kinds of middleware.  A popular choice is [Redux Sagas](https://redux-saga.js.org/).  If you're interested in the difference you can read [this blog](https://blog.logrocket.com/redux-toolkits-new-listener-middleware-vs-redux-saga/) on the subject.

Generally, thunks are for logic that requires talking to the store, and listeners if the app needs to react to actions or state changes. If the default functionalities in RTK does not meet a use case, then sagas would be used.  I'm not personally aware of any use cases that would require a saga instead of a thunk, but I will let you know when I run in to one.

The recommended library now redux-thunk, and that's what is covered in the Redux Essentials.  It *lets you write plain functions that may contain async logic directly*.  The Toolkit provides configureStore to set up thunks.

## [Loading posts](https://redux.js.org/tutorials/essentials/part-5-async-logic#loading-posts)

In this part, the following will be accomplished:

- Replace hardcoded sample data in the postsSlice initial state with an empty array of posts and fetch a list of posts from the mock server.
- Change the postsSlice state from an array of posts to an object a posts array and loading state fields to keep track of the API request state.
- Components that read posts from state.posts need to change to match the new data.

### Reusable selector functions in the slice

In the [Extracting Posts Selectors](https://redux.js.org/tutorials/essentials/part-5-async-logic#extracting-posts-selectors) section, we are shown how to make selectors which can hid the kind of changes we intend to makes in the state.  The tutorial puts it this way:

*It would be nice if we didn't have to keep rewriting our components every time we made a change to the data format in our reducers. One way to avoid this is to define reusable selector functions in the slice files, and have the components use those selectors to extract the data they need instead of repeating the selector logic in each component. That way, if we do change our state structure again, we only need to update the code in the slice file.*

In vanilla Javascript, this is what it is talking about:

```js
const posts = useSelector((state) => state.posts)
```

The line above is described as: *the inlined anonymous selectors we wrote directly inside of useSelector*.  We have to know that posts is a direct property on the state.  We cant move that inside another object for example without breaking the app.  Using a selector, the posts can be gotten now like this:

```js
const posts = useSelector(selectAllPosts)
```

Likewise with finding a post:

```js
const post = useSelector(state => state.posts.find(post => post.id === postId))
```

Can be:

```js
const post = useSelector(state => selectPostById(state, postId))
```

You can also create "memoized" selectors that can help improve performance later on.

### Converting to Typescript

Lets go through the code changes needed to implement the changes listed above and covert them to Typescript.

In the features/posts/postsSlice.js file (which for Typescript uses the .ts file extension: postsSlice.tsx), two selectors are added at the bottom of the file:

```js
export const selectAllPosts = state => state.posts

export const selectPostById = (state, postId) =>
  state.posts.find(post => post.id === postId)
```

There are a few TS errors there, the first being on the state in the first line:

```txt
Parameter 'state' implicitly has an 'any' type.ts(7006)
```

This is a little strange, as so far in the app sate hasn't had to be typed anywhere else.  The easy way out looks like this:

```js
 (state: any) => state.posts
```

By the way, my Prettier formatting plugin added the brackets around the state parameter there for me, as it's considered a best practice.  I highly recommended using Prettier to ensure all developers are on the same page when it comes to formatting.

We already have a type for this that is created by the Redux Toolkit configureStore function in the state.ts file.  It is exported like this:

```js
export type RootState = ReturnType<typeof store.getState>;
```

So all we have to do is import that and use it in our code:

```js
import { RootState } from "../../app/store";
...
export const selectAllPosts = (state: RootState) => state.posts;

export const selectPostById = (state: RootState, postId: string) =>
    state.posts.find((post) => post.id === postId);
```

The postId has a similar error, which is why it's typed also.  It is usually a number, but in a string format.  An Id is often a string of letters and numbers, so that's fine.

Next, in the features/posts/PostsList.js which in our project is PostsList.tsx, we can use that selector.  The tutorial shows it used like this:

```js
const posts = useAppSelector((state) => state.posts);
```

But if you've been following along with the earlier steps in this app, we use the custom typed useAppSelector like this:

```js
const posts = useAppSelector(selectAllPosts);
```

In the SinglePostPage.tsx we do the same thing:

```js
const post = useSelector(state => selectPostById(state, postId))
```

Using the RootState again (and Prettier formatting), this becomes:

```js
  const postId = params.postId 

  const post = useAppSelector((state: RootState) =>
      selectPostById(state, postId)
  );
```

But now, there is a new issue with postId:

Argument of type 'string | undefined' is not assignable to parameter of type 'string'.
  Type 'undefined' is not assignable to type 'string'.ts(2345)

To fix this we can add a type guard to ensure that postId is not undefined before passing it to the selectPostById function.  But for this case, we can do something like this:

```js
   const postId = params.postId ?? "";

  const post = useAppSelector((state: RootState) => 
      selectPostById(state, postId)
  );
```

The same thing is done in the EditPostForm component.  Now, nothing has really changed in the app.  Just we have some reusable selectors.  Regarding this, the tutorial says to start an app with no selectors and *add some later when you find yourself looking up the same values in many parts of your application code.*

## Loading State

In [the next step](https://redux.js.org/tutorials/essentials/part-5-async-logic#loading-state-for-requests) the tutorial covers how to track loading states as a single enum value.  It actually shows a code snippet in Typescript for the firs time:

```js
{
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null
}
```

In features/posts/postsSlice.js (postsSlice.ts) for us, add the initial state which replaces the current sample data with an empty array:

```js
const initialState = {
  posts: [],
  status: 'idle',
  error: null
}
```

Then we have to make the change to the structure of the state, so instead of the flat state:

```js
postAdded: {
  reducer(
    state,
    action: PayloadAction<Post>
  ) {
    state.push(action.payload);
  },
```

We have this:

```js
postAdded: {
  reducer(state, action) {
    state.posts.push(action.payload)
  },
```

This should give us now an empty array of posts, but there are errors.  All the post properties such as id, title and content have errors like this:

```txt
Property 'id' does not exist on type 'never'.ts(2339)
```

This is because now our initial state is not typed anymore.  Before, we had this:

```js
const initialState: Post[] = [ ... ]
```

Because there was only an array of posts on the state.  Now that our state has an array of posts, a status and an error, we will need a new interface for this.

To make these errors go away, we can use the hint given earlier about the loading state enum and create an interface:

```js
interface InitialState {
    posts: Post [];
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: string | null
}
```

We can use it like this:

```js
const initialState: InitialState = {
    posts: [],
    status: "idle",
    error: null,
};
```

### Testing the implementation

If you have followed along from the counter example along to the creation of this app, you will know that I have created unit tests in Jest for each step.  Once upon a time I was a Java developer smitten with XP (extreme programming) which uses TDD (test driven development) as a method to create features.  However, there are a number of issues with this.

Currently the tests are breaking because the implementation has changed.  It might be great to have coverage of all the features, but no one wants to maintain old tests.  It might make sense to practice TDD when developing some complex business logic, but after it's working, those tests become a liability.

If coverage of features is what is needed, integration and end-to-end testing is the way to go.  If we had tested just adding a post, and that the post appears on the list, then that test wouldn't be failing now that the internal structure of the store is changing.

Of course, my goal was just to get more practice at writing tests, so no harm done.  I want to practice unit testing for TDD, but a tutorial is not TDD.  But to practice TDD in the wild, you need to know how to test all kinds of things.  So that practice has to come from somewhere.

I'm just bringing this up because I'm not going to be commenting out failing unit tests for now and implementing Cypress for testing soon.

## [Fetching Data with createAsyncThunk](https://redux.js.org/tutorials/essentials/part-5-async-logic#fetching-data-with-createasyncthunk)

The new Thunk added looks like this:

```js
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts')
  return response.data
})
```

The createAsyncThunk function automatically dispatch loading state actions actions.  That's great!

The first argument is the prefix for the generated action types.

It's a Promise based response, but the API docs really show this:

```js
createAsyncThunk<any, void>(typePrefix: string, payloadCreator: AsyncThunkPayloadCreator<any, void, AsyncThunkConfig>, options?: AsyncThunkOptions<void, AsyncThunkConfig> | undefined): AsyncThunk<...> (+1 overload)
```

I have to trust the description of what is going on within this magic.

*We typically write (an AJAX Promise) using the JS async/await syntax, which lets us write functions that use Promises while using standard try/catch logic instead of somePromise.then() chains.*

I have to say I like Promises.  Coming from Angular where we were expected to use RxJs for everything I thought overcomplicated things.  It's nice to know that now Angular has ditched RxJs for Signals which are a kind hook, or so I've heard.

In the dispatch action, we have an Typescript error to deal with:

```js
    useEffect(() => {
        if (postStatus === "idle") {
            dispatch(fetchPosts());
        }
    }, [postStatus, dispatch]);
```

The fetchPosts() function shows this:

```txt
Argument of type 'AsyncThunkAction<any, void, AsyncThunkConfig>' is not assignable to parameter of type 'AnyAction'.ts(2345)
```

This is because the return type is not clear.  The easy way out is to use the evil *any*.

```js
export const fetchPosts: any = createAsyncThunk("posts/fetchPosts", async () => {
```

I'm not proud of this, but just trying to get this series done at this point, so corners need to be cut.

## Reducers and Loading Actions

The next step, [Reducers and Loading Actions](https://redux.js.org/tutorials/essentials/part-5-async-logic#reducers-and-loading-actions) is to handle these actions in the reducers.

The createSlice function creates our actions, and has an "extraReducers" functional argument that receives a "builder" parameter to handle async thunk actions.

Adding an action there looks like this:

```js
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // omit existing reducers here
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        state.posts = state.posts.concat(action.payload)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})
```

I don't thing we need any Typescript-specific changes here.

Next up, we [display the loading states](https://redux.js.org/tutorials/essentials/part-5-async-logic#reducers-and-loading-actions) in the UI.

There is already a spinner component in the '../../components/Spinner' file.  We import that into the posts list component.

The tutorial shows adding a PostExcerpt that should really be in a separate file, but in this case it's a separate component which would make it easy to extract later:

```js
const PostExcerpt = ({ post }) => {
  return (
    <article className="post-excerpt">
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>

      <ReactionButtons post={post} />
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  )
}
```

The post prop has an error: ```Binding element 'post' implicitly has an 'any' type.ts(7031)```

We need an interface for the props to fix this.  We can use the same interface that was created for the reaction buttons from the [last article](https://timothycurchod.com/writings/redux-essentials-app-in-typescript):

```js
interface Props {
    post: Post;
}
```

It's then used like this:

```js
const PostExcerpt = ({ post }: Props) => {
```

Both of these should ideally be in separate files.  But that can happen later during a refactor round.

Inside the PostsList functional component we create an error selector to use.

```js
  const error = useSelector(state => state.posts.error)
```

We need to add the state: RootState type as usual to that:

```js
  const error = useSelector(state: RootState => state.posts.error)
```

After implementing the error state and content in the posts list like this:

```js
export const PostsList = () => {
    const dispatch = useDispatch();

    const posts = useAppSelector(selectAllPosts);
    const orderedPosts = posts
        .slice()
        .sort((a: Post, b: Post) => b.date.localeCompare(a.date));

    const postStatus = useSelector((state: RootState) => state.posts.status);
    const error = useSelector((state: RootState) => state.posts.error);

    useEffect(() => {
        if (postStatus === "idle") {
            dispatch(fetchPosts());
        }
    }, [postStatus, dispatch]);

    let content;

    if (postStatus === "loading") {
        content = <Spinner text="Loading..." />;
    } else if (postStatus === "succeeded") {
        // Sort posts in reverse chronological order by datetime string
        const orderedPosts = posts
            .slice()
            .sort((a, b) => b.date.localeCompare(a.date));

        content = orderedPosts.map((post) => (
            <PostExcerpt key={post.id} post={post} />
        ));
    } else if (postStatus === "failed") {
        content = <div>{error}</div>;
    }

    const renderedPosts = orderedPosts.map((post: Post) => {
        return (
            <article className="post-excerpt" key={post.id}>
                <h3>{post.title}</h3>
                <div>
                    <PostAuthor userId={post.user} />
                    <TimeAgo timestamp={post.date} />
                </div>
                <p className="post-content">{post.content.substring(0, 100)}</p>
                <ReactionButtons post={post} />
                <Link to={`/posts/${post.id}`} className="button muted-button">
                    View Post
                </Link>
            </article>
        );
    });

    return (
        <section className="posts-list">
            <h2 data-testid="post-list-title">Posts</h2>
            <h2>Posts</h2>
            {content}
        </section>
    );
};
```

### Fetching error

After the changes for this section there is an error from the fetch when running the app:

```Unexpected token '<', "<!DOCTYPE "... is not valid JSON```

In the network tab, headers sections it shows:

```err
Request URL: http://localhost:3000/fakeApi/posts
Request Method: GET
Status Code: 304 Not Modified
Preview: You need to enable JavaScript to run this app.
```

This is a new error for me.  I didn't have an issue like this when I went through with the vanilla Javascript code.  Why would the Typescript version cause this kind of error?  Maybe something is not being transpiled?

There are plenty of StackOverflow hits for this kind of error, such as [this](https://stackoverflow.com/questions/50286927/i-am-getting-error-in-console-you-need-to-enable-javascript-to-run-this-app-r) which recommends putting this in the package.json: ```"proxy": "http://localhost:3000",```.  But then the error is slightly different.

```err
Request URL: http://localhost:3000/fakeApi/posts
Request Method: GET
Status Code: 431 Request Header Fields Too Large
```

What we should get, as seen in the [live demo here](https://codesandbox.io/s/github/reduxjs/redux-essentials-example-app/tree/checkpoint-3-postRequests/?from-embed) is an array of posts like this:

```json
{
    "id": "Z9SIaQsvAdrzwvf5UlNLj",
    "title": "soluta facere neque",
    "date": "2023-03-09T00:27:20.943Z",
    "content": "Sequi sint molestias hic ad iure ... voluptatem qui.",
    "reactions": {
        "id": "LTo_Sq0uInSqw2ivYOgtT",
        "thumbsUp": 0,
        "hooray": 0,
        "heart": 0,
        "rocket": 0,
        "eyes": 0
    },
    "user": "4E5O6cJXWu5jma1QV50Z-"
}
```

It's time to consider that the fake api which is written in Javascript might not be working in our Typescript setting.

Check out this file: ```src\api\server.js```

Changing that file extension to .ts reveals a nightmare of problems, starting with the first line such as:

```js
import { rest, setupWorker } from 'msw'
```

This would involve installing the types for this package.  That would be done like this:

```shell
npm install @types/msw
```

However, there are a huge number of errors in that file.  It could take a while to fix them, and some of them might be pretty tricky.  Is there a way to leave those .js file as is?

An answer on [this StackOverflow question](https://stackoverflow.com/questions/74766575/how-to-use-plain-javascript-react-component-in-a-typescript-react-project) says to put this in the tsconfig.json file: ```allowJs: true```.

Status Code: 431 Request Header Fields Too Large

It would be nice to have a simple solution like this, but it doesn't work.

Another thing I thought of would be to create a vanilla node.js app to run the server and client.

It would also have been nice if I had thought about this problem before I started this whole Typescript conversion project.

Just trying the above npm command results in:

```shell
npm ERR! code E404
npm ERR! 404 Not Found - GET https://registry.npmjs.org/@types%2fmsw - Not found
```

I'm not going to lie, this is a big unexpected problem.

These are APIs the app depends on:

```txt
/fakeApi/posts GET
/fakeApi/posts POST
/fakeApi/posts/:postId GET
/fakeApi/posts/:postId PATCH
/fakeApi/posts/:postId/comments GET
/fakeApi/posts/:postId/reactions POST
/fakeApi/notifications GET
/fakeApi/users GET
```

Quite a bit of work there no matter what we do.

The thing is, this is all about async data fetching with Typescript.  I *could* create a simple [Next.js](https://docs.nestjs.com/) backend for this app pretty easily.

I have an old Node.js app that I would like to upgrade, so it's not a bad idea getting some practice in for that.

I'm also interested in [MACH architecture](https://devops.com/introduction-to-mach-architecture/), which means a cloud based db solution like a hosted database.

FYI, MACH stands for:

- Microservices
- API-first
- Cloud-native
- Headless

It's pretty vague, and I'm wondering if Nest.js and say a Mongo db deployed on some free cloud services fits in with MACH.  We have our API, and just want CRUD functions to support it.

Since we're in to Typescript here, it's not a bad idea.  [Nest](https://docs.nestjs.com/techniques/database) *uses TypeORM because it's the most mature Object Relational Mapper (ORM) available for TypeScript. Since it's written in TypeScript, it integrates well with the Nest framework.*

So as it is the options for going forward with this article then would be:

1. Use .js files in a .ts project.
2. Convert server.js and client.ts to .ts.
3. Recreate the APIs in a Node.js backend.
4. End things here.
5. Raise an issue on the [Redux GitHub](https://github.com/reduxjs/redux-essentials-example-app/issues) and see if they have any ideas.

To start I have [raised an issue here](https://github.com/reduxjs/redux-essentials-example-app/issues/51) so stay tuned to see what happens there.

It was very nice for the maintainer [Mark Erikson](https://github.com/markerikson) to reply regarding the client fakeApi issue, as well as possible plans for a Typescript version:

*I actually did recently make the decision to convert the entire "Essentials" tutorial to be TS-first.  However, I don't yet have any idea when I'll be able to spend the time to do that :) I am kinda confused on the request error you're describing. That doesn't seem anything that would be related to TS at all - that's some kind of a request/URL mismatch.*

In the meantime, I decided to bite the bullet, go with option #3 and create my own Typescript backend which can be used with the project.  Since I would eventually like to deploy the app after some changes, it can be used later for that.

[Here is the repo](https://github.com/timofeysie/flash) and I will be creating another article about how to implement all the API calls with that when they are done.

Now we can move on to the next part.

## [Loading Users](https://redux.js.org/tutorials/essentials/part-5-async-logic#loading-users)

The next step involves fixing the fact that the posts all have "Unknown author" instead of the user name.  To fix this the app needs to fetch the users on application start.

This also means that for the backend app the CRUD endpoints for a users API will have to be scaffolded.  Using Nestjs with TypeORM makes that super easy.

Adding a user interface and using fetchUsers with createAsyncThunk as well as adding that action to the extraReducers to mutate the state looks like this:

```js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../api/client";
import { User } from './User';

const initialState: User [] = [];

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
    const response = await client.get("/fakeApi/users");
    return response.data;
});

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            return action.payload;
        });
    },
});

export default usersSlice.reducer;
```

The builder returns the action.payload directly thanks to Immer which has two possibilities here:

A. mutate the existing state value (which here was an empty array)
B. return a new result (replace the existing state completely)

If we return a new value, that will replace the existing state completely with whatever we return. (Note that if you want to manually return a new value, it's up to you to write any immutable update logic that might be needed.)

The tutorial points out we could use ```state.push(...action.payload)``` to mutate but here we want to replace the users with the server response.

Then, in the src\index.tsx we import that action at dispatch it there.

### Scaffolding the users CRUD API

With the Nestjs CLI, it's as easy as this:

```txt
> nest generate resource
? What name would you like to use for this resource (plural, e.g., "users")? users
? What transport layer do you use? REST API
? Would you like to generate CRUD entry points? Yes
CREATE src/users/users.controller.ts (894 bytes)
CREATE src/users/users.controller.spec.ts (566 bytes)
CREATE src/users/users.module.ts (247 bytes)
CREATE src/users/users.service.ts (609 bytes)
CREATE src/users/users.service.spec.ts (453 bytes)
CREATE src/users/dto/create-user.dto.ts (30 bytes)
CREATE src/users/dto/update-user.dto.ts (169 bytes)
CREATE src/users/entities/user.entity.ts (21 bytes)
UPDATE src/app.module.ts (1122 bytes)
```

Then we need to edit these four files:

1. posts.entity.ts
2. posts.module.ts
3. posts.service.ts
4. posts.controller.ts

The user interface is super simple:

```js
export interface User {
  id: any;
  name: string;
}
```

The entity file looks like this:

```js
@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;
}
```

The ObjectIdColumn decorator will create an ID for us, so that doesn't have to be in the POST to create a user.

Next the entity is imported into the user module.  It can't get any more Angular than this (Angular may well yet survive on the server):

```js
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  ...
})
```

The service provides the CRUD framework:

```js
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: MongoRepository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.usersRepository.save(createUserDto);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: any) {
    return this.usersRepository.findOne(id);
  }

  update(id: any, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }

  remove(id: any) {
    return this.usersRepository.delete(id);
  }
}
```

Again with the Angular.  If you think classes are gross, this option may not be for you.

A note on [decorators](https://devblogs.microsoft.com/typescript/announcing-typescript-5-0/#decorators), these have actually just been added to TypeScript 5, so not a bad thing getting used to them if you're interested in Typescript.

The controller doesn't really need to be modified much at all.  Mainly the ids might be a combination of numbers and letters, so we do this:

```js
  @Get(':id')
  findOne(@Param('id') id: any) {
    return this.usersService.findOne(id);
  }
```

Then Bob is a close family relative.  With [Northflank](https://northflank.com/), we just make a commit and push to the master branch and create some Postman test calls to check it once the build is done.

A little house keeping such as adding some users, deleting the old posts with random ids, adding new posts with actual ids, and then we can test out the user fetch.  It all looks good, and again, Bob is part of the family.  Of course, there is a lot of magic going on behind the scenes here.  If you run into problems, well, no one knows Bob and your on your own.  That's why sometimes boilerplate code some sometimes be a good thing.

## [Adding New Posts](https://redux.js.org/tutorials/essentials/part-5-async-logic#loading-users)

make an API call that will create the new post

we send a request body like { title, content, user: userId }

the server will generate an IDs date and return the completed post.

```js
export const addNewPost = createAsyncThunk(
    "posts/addNewPost",
    // The payload creator receives the partial `{title, content, user}` object
    async (initialPost) => {
        // We send the initial data to the fake API server
        const response = await axios.get(API_URL+"/posts", initialPost);
        // The response includes the complete post object, including unique ID
        return response.data;
    }
);
```

The initialPost arg causes this error: ```Argument of type 'void' is not assignable to parameter of type 'AxiosRequestConfig<any> | undefined'.ts(2345)```

The type for the dispatch looks like this:

```js
createAsyncThunk<any, void>(typePrefix: string, payloadCreator: AsyncThunkPayloadCreator<any, void, AsyncThunkConfig>, options?: AsyncThunkOptions<void, AsyncThunkConfig> | undefined): AsyncThunk<...> (+1 overload)
```

```js
  await dispatch(
      addNewPost({ title, content, user: userId })
  ).unwrap();
```

Argument of type 'AsyncThunkAction<any, any, AsyncThunkConfig>' is not assignable to parameter of type 'AnyAction'.ts(2345)

We already have a ThunkAction which can be used to type the dispatch like this in the store.ts file:

```js
export type AppDispatch = typeof store.dispatch;
```

It's used like this:

```js
import { ThunkAction } from "redux-thunk";
...
const dispatch = useDispatch<AppDispatch>();
```

There is good discussion on the official [Type Checking Redux Thunks](https://redux.js.org/usage/usage-with-typescript#type-checking-redux-thunks) guide with a more in-depth solution shown.

This will wrap up part five.  You can find all the code in the example app [repo part-5-async-login-and-data-fetching branch](https://github.com/timofeysie/redux-typescript-example/tree/part-5-async-login-and-data-fetching).

## Part 6: Performance and Normalizing Data

Despite the title of this article being for part 5, I think it's easier to continue with part six here rather than start with a new article.  Honestly, the rug has been pulled out from under this project by the React teams new documentation which is now not recommending using create-react-app anymore, which is how this project was started.  This means that the Redux team will have to follow suit and update their documentation to account for this, meaning the days are numbered for this project as a demonstration of best practices.

In this section, [Redux Essentials, Part 6: Performance and Normalizing Data](https://redux.js.org/tutorials/essentials/part-6-performance-normalization), we will be covering the following.

- Memoize selector functions to optimize performance
- Optimize React component rendering with Redux
- Normalization (no duplication of data) state structure, and keeping items stored in a lookup table by item ID
- createEntityAdapter API helps manage normalized data in a slice

Feature-wise, this will include:

1. add a page to show the list of all users
2. add a page to show all posts by a specific user.
3. notifications to send a message, leave a comment, or reacted to a posts

If you want to see the finished project (in Javascript not Typescript), you can [open the official repo in a code sandbox here](https://codesandbox.io/s/github/reduxjs/redux-essentials-example-app/tree/checkpoint-4-entitySlices/?from-embed).

### [Adding User Pages](https://redux.js.org/tutorials/essentials/part-6-performance-normalization#adding-user-pages)

Here a new <UsersList> component is added to the user feature.

- features/users/UsersList.js -> features/users/UsersList.tsx

If you are wondering why we don't use the ".ts" file extension, try that out and you would see errors like this on ending tags: ```Unterminated regular expression literal.ts(1161)```

To support the user list component, we add some selectors.  This will require typing with the root state:

```js
import { RootState } from "../../app/store";
...
export const selectAllUsers = (state: RootState) => state.users;
```

- features/users/UserPage.js -> UserPage.tsx

Some usual issues here with the props and state:

```js
export const UserPage = ({ match }) => {
    const { userId } = match.params;

    const user = useSelector((state) => selectUserById(state, userId));

    const postsForUser = useSelector((state) => {
        const allPosts = selectAllPosts(state);
```

The TS error on match is: ```Binding element 'match' implicitly has an 'any' type.ts(7031)```

When you see this kind of error on a component prop, you know that you will need an interface for it.  I'm not sure about the match type at this point, so will start of with the ominous ```any```:

```js
interface UserPageProps {
    match: any | undefined;
}

export const UserPage = ({ match }: UserPageProps) => { ... }
```

Next, the state variables have this error: ```(parameter) state: unknown - Argument of type 'unknown' is not assignable to parameter of type '{ counter: CounterState; posts: InitialState; users: User[]; }'.ts(2345)```

That is also solved by importing and using the root state type:

```js
    const user = useSelector((state: RootState) => selectUserById(state, userId));

    const postsForUser = useSelector((state: RootState) => { ... })
```

One last issue is that user has this error: ```const user: User | undefined - 'user' is possibly 'undefined'.ts(18048)```

```html
<h2>{user.name}</h2>
```

We can fix that with [optional chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining).

Next, the routes need to be added.  Here is the react-router-dom version 5 code shown:

```js
<Route exact path="/users" component={UsersList} />
<Route exact path="/users/:userId" component={UserPage} />
```

Here is what we need for version 6:

```js
<Route path="/users" element={<UsersList />} />
<Route path="/users/:userId" element={<UserPage />} />
```

However, there is still an error on the user page: ```Property 'match' is missing in type '{}' but required in type 'UserPageProps'.ts(2741)
UserPage.tsx(10, 5): 'match' is declared here.```

One solution to this would be to make the match prop optional in the interface like this:

```js
interface UserPageProps {
    match?: any | undefined;
}
```

The users list works, but the user detail page has this error:

```err
UserPage.tsx:14 Uncaught TypeError: Cannot read properties of undefined (reading 'params')
    at UserPage (UserPage.tsx:14:1)
    at renderWithHooks (react-dom.development.js:16305:1)
```

I've forgotten that also with the change of the links in the React DOM router, there are changes to how the parameters are handled.  Similar to what was done in the SinglePostPage.tsx component, we can remove our props interface and use the useParams hook like this:

```js
export const UserPage = () => {
  const params = useParams();
  const userId = params.userId ?? "";
```

And then both new pages work.

Next up, [Adding Notifications](https://redux.js.org/tutorials/essentials/part-6-performance-normalization#adding-notifications).

## Useful links

Here are some links from the tutorial that I found useful when working on this article.

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
