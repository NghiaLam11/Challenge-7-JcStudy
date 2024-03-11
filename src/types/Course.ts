export interface Comment {
  auth: string;
  comment: string;
  reaction: number;
  createdAt: string;
  id: string;
}


export interface Course {
  title: string;
  desc: string;
  thumbnailImg: string;
  thumbnailVideo: string;
  imgUrl: string;
  createdAt: string;
  videoUrl: string;
  industry: string;
  countUnlocked: number;
  tags: string;
  price: number;
  comments: Comment[];
  chapters: Object;
  id: string;
  idUser: string | null;
  isApproved: boolean;
  quiz: any;
}
