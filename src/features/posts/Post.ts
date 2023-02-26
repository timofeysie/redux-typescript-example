export interface Post {
    id: string;
    title: string;
    content: string;
    user: string;
    date: string;
    reactions: any;
}

export interface Reaction {
    thumbsUp: number;
    hooray: number;
    heart: number;
    rocket: number;
    eyes: number;
}