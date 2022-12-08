# D3 with TypeScript notes

Had to install the types like this:

npm i --save-dev @types/d3

## Typing props

In src\features\graphs\ChartContainer.tsx

```js
const ChartContainer = ({ data }) => {
```

Has the following error:

Binding element 'data' implicitly has an 'any' type.ts(7031) 
No quick fixes available

The solution is to type our own props:

```javascript
interface Props {
  data: any;
}

const ChartContainer = ({ data }: Props) => {
```

Now only two more errors remain in ths ChartContainer.tsx file.

```js
const ChartContainer = ({ data }: Props) => {
  const netGraphRef = useRef(null);
  const [graph, setGraph] = useState(null);
  useEffect(() => {
    if (!graph) {
      setGraph(new D3Chart(netGraphRef.current));
    } else {
      graph.update(data);
    }
  }, [graph, data]);
```

Error one is on new D3Chart(), and one on the update function.

Argument of type 'D3Chart' is not assignable to parameter of type 'SetStateAction<null>'.
  Type 'D3Chart' provides no match for the signature '(prevState: null): null'.ts(2345)

Error two is on the update function call:

Property 'update' does not exist on type 'never'.ts(2339)

Error one is about typing the setGraph function when it's declared.  TypeScript has to try to infer it the type. It sees null passed in a, so it assumes this state is (and always will be) null.

The cheap way out looks like this:

```javascript
const [graph, setGraph] = useState<any | null>(null);
```

This solves both errors.  But what type should it be?

If I mouse over the setGraph now, it says this:

```js
const setGraph: React.Dispatch<any>
```

For now, I want to see if the app runs.  Add the <ChartContainer /> to the App.tsx.  But now there is this error on that usage:

Property 'data' is missing in type '{}' but required in type 'Props'.ts(2741)
ChartContainer.tsx(5, 3): 'data' is declared here.

That data is actually an optional parameter.  The data set used in the demo is created in the D3Chart.ts file.  We can make it optional with the ? in the interface like this:

```js
interface Props {
  data?: any;
}
```

Now, provided the styles needed for the bar graph are in the index.css, the chart works!

## What's next

I'm not sure.  I would like to replace the data with something from the store.

The number of posts, the number of characters per post.  A timeline of posts.  What makes sense?  Maybe each post can have it's own graph?

The objects in the sample data array look like this:

```js
{ 
  subject: "Cats", 
  count: 135 
},
```

First we need a unit test for this new feature.
