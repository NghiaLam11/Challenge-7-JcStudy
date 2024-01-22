export interface CommentReply {
  auth: string;
  text: string;
  date: string;
  reaction: number;
}

export interface Comment {
  auth: string;
  text: string;
  reaction: number;
  date: string;
  replies: CommentReply[];
}

export interface QuizQuestion {
  titleQuestion: string;
  answers: {
    correctAnswer: string;
    answer: string;
  }[];
}

export interface Quiz {
  title: string;
  questions: QuizQuestion[];
}

export interface Lesson {
  title: string;
  desc: string;
  thumbnailImg: string;
  thumbnailVideo: string;
  industry: string;
  tags: string;
  price: number;
  comments: Comment[];
  quiz: Quiz;
}

export interface Chapter {
  title: string;
  desc: string;
  thumbnailImg: string;
  thumbnailVideo: string;
  courses: Lesson[];
}

export interface Course {
  title: string;
  desc: string;
  thumbnailImg: string;
  thumbnailVideo: string;
  imgUrl: string,
  videoUrl: string,
  industry: string;
  tags: string;
  price: number;
  comments: Comment[];
  quiz: Quiz;
  chapters: any;
  id: string;
  idUser: string;
  isApproved: boolean;
}

export interface User {
  name: string;
  id: string;
  email: string;
  isAdmin: boolean;
  password: string;
  bio: string;
  avatar: string;
  streak: number;
  studyTime: number[];
  coursesCompleted: {
    title: string;
    desc: string;
    thumbnailImg: string;
    thumbnailVideo: string;
    industry: string;
    tags: string;
    price: number;
    comments: Comment[];
    quiz: Quiz;
    chapters: Chapter[];
    isCompleted: boolean;
    isUnlock: boolean;
  }[];
  coursesUnlock: {
    title: string;
    desc: string;
    thumbnailImg: string;
    thumbnailVideo: string;
    industry: string;
    tags: string;
    price: number;
    comments: Comment[];
    quiz: Quiz;
    chapters: Chapter[];
    isCompleted: boolean;
    isUnlock: boolean;
  }[];
  coursesRegister: {
    title: string;
    desc: string;
    thumbnailImg: string;
    thumbnailVideo: string;
    industry: string;
    tags: string;
    price: number;
    comments: Comment[];
    quiz: Quiz;
    chapters: Chapter[];
    isCompleted: boolean;
    isUnlock: boolean;
  }[];
  blogsRegister: {
    title: string;
    author: string;
    industry: string;
    tags: string;
    img: string;
    content: string;
    date: string;
    statusRegister: string;
  }[];
}
