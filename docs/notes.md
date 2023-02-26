# Notes

## Fixing the first reactions test

The test:

```js
  it("increments a reaction", () => {
      const actual = postsReducer(
          initialState,
          reactionAdded({ postId: 2, reaction: "thumbsUp" })
      );
      expect(actual).toEqual(postUpdatedState);
  });
```

The failure:

```err
 FAIL  src/features/posts/postsSlice.spec.ts
  ● posts reducer › increments a reaction

    expect(received).toEqual(expected) // deep equality

    - Expected  - 15
    + Received  +  1

    @@ -20,25 +20,11 @@
          "reactions": Object {
            "eyes": 0,
            "heart": 0,
            "hooray": 0,
            "rocket": 0,
    -       "thumbsUp": 1,
    +       "thumbsUp": 0,
          },
          "title": "Second Post",
          "user": "1",
    -   },
    -   Object {
    -     "content": "test-content-edit",
    -     "date": "2023-02-26T01:14:01.781Z",
    -     "id": "3",
    -     "reactions": Object {
    -       "eyes": 0,
    -       "heart": 0,
    -       "hooray": 0,
    -       "rocket": 0,
    -       "thumbsUp": 0,
    -     },
    -     "title": "test-title-edit",
    -     "user": "2",
        },
      ]

      105 |           reactionAdded({ postId: 2, reaction: "thumbsUp" })
      106 |       );
    > 107 |       expect(actual).toEqual(postUpdatedState);
          |                      ^
      108 |   });
      109 | });
      110 |

      at Object.<anonymous> (src/features/posts/postsSlice.spec.ts:107:22)
```

It's testing id: 3 which was not updated.

Changing it to 0 or 1 ids also fails.  It does appear as if the reactionAdded reducer is not working in the test.
