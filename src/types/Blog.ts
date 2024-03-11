export interface Blog {
    comments: Object;
    content: string;
    createdAt: string;
    idUser: string | null;
    images: Object;
    imgUrl: string;
    industry: string;
    isApproved: boolean;
    reaction: number;
    tags: string;
    title: string;
    view: number;
}