import React, { useRef, useEffect, useState, forwardRef, ForwardRefRenderFunction, Ref, RefObject } from 'react';

import "./SciFiPanel.css";
import { Post } from "../features/posts/Post";
import PostAuthor from "../features/posts/PostAuthor";
import { TimeAgo } from "../features/posts/TimeAgo";
import { ReactionButtons } from "../features/posts/ReactionButtons";
import { Link } from "react-router-dom";

interface SciFiPanelProps {
    post: Post;
}

const SciFiPanel: React.FC<SciFiPanelProps> = ({ post }) => {
    const [parentWidth, setParentWidth] = useState<number>(0);
    const [authorRefWidth, setRefAuthorWidth] = useState<number>(0);
    const [timeAgoRefWidth, setTimeAgoWidth] = useState<number>(0);
    const postAuthorRef = useRef<HTMLDivElement>(null);
    const timeAgoRef: RefObject<HTMLDivElement> = useRef(null);
    const ForwardedTimeAgo = forwardRef(TimeAgo);
    const titleRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleResize = () => {
            if (titleRef.current) {
                setParentWidth(titleRef.current.offsetWidth);
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
      if (postAuthorRef.current) {
        const width = postAuthorRef.current.offsetWidth;
        setRefAuthorWidth(width);
      }
    }, []);

    useEffect(() => {
        if (timeAgoRef.current) {
          const width = timeAgoRef.current.getBoundingClientRect().width;
          setTimeAgoWidth(width);
        }
      }, []);

    const calculatePointValue = (width: number, scaleFactor: number): number => {
        // Calculate the point value based on the width and the scaling factor
        const pointValue = width / scaleFactor;
        return pointValue;
    };
    const strokeWidth = 3;
    const tabAngle = 5;
    const tabHeight = 75;
    let minTitleWidth = 0;
    if (post.title) {
        minTitleWidth = post.title ? post.title.length + tabAngle + 13 : 0;
        if (minTitleWidth < post.title.length - 20) {
            minTitleWidth = post.title.length;
        }
    }
    const titleWidth = minTitleWidth;
    const contentHeight = 230;
    const contentWidth = 110;
    const bottomTabStartingPoint = 5;
    const authorWidthRaw = authorRefWidth + timeAgoRefWidth;
    const scaleFactor = 4.5; // Adjust this scaling factor based on your requirements
    const authorWidth = calculatePointValue(authorWidthRaw, scaleFactor);

    const contentLength = parentWidth < 725 ? 80 : 180;
    const ellipsis = post.content.length > contentLength ? "..." : "";

    return (
        <>
            <div className="scifi-panel" ref={titleRef}>
                <div
                    className="scifi-panel-content"
                    style={{ width: `${titleWidth + 20}px` }}
                >
                    <div className="title">
                        <Link to={`/posts/${post?.id}`}>
                            {post.title}
                        </Link></div>
                </div>
                <svg
                    className="scifi-panel-border"
                    viewBox={`-1 -3 ${contentWidth} 340`}
                    preserveAspectRatio="none"
                >
                    <polygon
                        stroke="#000" // Set the stroke color to white
                        strokeWidth="3" // Set the stroke width to 2 pixels
                        vectorEffect="non-scaling-stroke"
                        points={`
                          0,${tabHeight} 
                          ${tabAngle},${strokeWidth} 
                          ${titleWidth},${strokeWidth} 
                          ${titleWidth + tabAngle},${tabHeight} 
                          ${contentWidth - 3},${tabHeight} 
                          ${contentWidth - 3},${contentHeight - tabHeight} 
                          ${contentWidth - tabAngle - 3},${contentHeight}
                          ${authorWidth + tabAngle},${contentHeight} 
                          ${authorWidth},${contentHeight + tabHeight} 
                          ${bottomTabStartingPoint + tabAngle},${contentHeight + tabHeight} 
                          ${bottomTabStartingPoint},${contentHeight} 
                          0,${contentHeight}`}
                    />
                </svg>
                <div className="content">{post.content.substring(0, contentLength)} {ellipsis}</div>
                <div className="author">
                  <PostAuthor ref={postAuthorRef}  userId={post?.user} />
                  <ForwardedTimeAgo ref={timeAgoRef} timestamp={post?.date} />
                </div>
            </div>
            <div className="reactions"><ReactionButtons post={post} /></div>
        </>
    );
};

export default SciFiPanel;
