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

export interface CourseChapter {
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
  courses: CourseChapter[];
}

export interface Course {
  title: string;
  desc: string;
  thumbnailImg: string;
  thumbnailVideo: string;
  industry: string;
  tags: string;
  price: number;
  comments: Comment[];
  quiz: Quiz;
  chapters: Chapter[]
  isCompleted: boolean;
  isUnlock: boolean;
}

export interface User {
  name: string;
  email: string;
  password: string;
  bio: string;
  avatar: string;
  coursesCompleted: Course[];
  coursesUnlock: Course[];
  coursesRegister: Course[];
  blogsRegister: Course[];
}
