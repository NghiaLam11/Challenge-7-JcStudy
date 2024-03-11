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
    coursesUnlocked: Object;
    coursesRegister: Object;
    blogsRegister: Object;
  }