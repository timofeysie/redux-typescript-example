import React, { forwardRef } from "react";
import type { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import { User } from "../users/User";
import { selectUserById } from '../users/usersSlice'

interface PostAuthorProps {
  userId: string | undefined;
}

const PostAuthor: React.ForwardRefRenderFunction<HTMLDivElement, PostAuthorProps> = ({ userId }, ref) => {
  const author = useSelector((state: RootState) => selectUserById(state, userId!))

  return <span ref={ref}>by {author ? author.name : "Unknown author"}&nbsp;</span>;
};

export default forwardRef(PostAuthor);