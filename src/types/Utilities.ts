export interface Note {
  title: string;
  createdAt: string;
  text: string;
  id: string;
  idUser: string | null;
}

export interface Task {
  title: string;
  createdAt: string;
  tasks: Object;
  id: string;
  idUser: string | null;
}

export interface Flashcard {
  title: string;
  createdAt: string;
  cards: Object;
  id: string;
  idUser: string | null;
}
export interface Timetable {
  title: string;
  createdAt: string;
  table: Object[];
  id: string;
  idUser: string | null; 
}
