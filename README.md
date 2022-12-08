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

## Refactoring with reducer prepare

In the [Preparing Action Payloads](https://redux.js.org/tutorials/essentials/part-4-using-data#preparing-action-payloads) there is a discussion about where to put the logic to create the id.  The solution is to use a "prepare callback" which takes multiple arguments, generate random values like unique IDs, and run whatever other synchronous logic is needed to decide what values go into the action object.

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
