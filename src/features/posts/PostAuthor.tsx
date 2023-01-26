import React from "react";
import type { RootState } from "../../app/store";
import { useSelector } from "react-redux";

interface PostAuthorProps {
  userId: string | undefined;
}

export const PostAuthor = ({ userId }: PostAuthorProps) => {
  const author = useSelector((state: RootState) =>
    state.users.find((user) => user.id === userId)
  );

  return <span>by {author ? author.name : "Unknown author"}</span>;
};
