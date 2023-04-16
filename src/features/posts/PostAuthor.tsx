import React from "react";
import type { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import { User } from "../users/User";
import { selectUserById } from '../users/usersSlice'

interface PostAuthorProps {
  userId: string | undefined;
}

export const PostAuthor = ({ userId }: PostAuthorProps) => {
  const author = useSelector((state: RootState) => selectUserById(state, userId!))

  return <span>by {author ? author.name : "Unknown author"}&nbsp;</span>;
};
