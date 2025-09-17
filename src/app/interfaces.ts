interface Author {
  id: number;
  displayName: string;
}

interface Picture {
  id: number;
  image: string;
  description: string;
  title: string;
  author: Author;
  createdAt: Date;
  likes: [User];
}

interface User {
  id: number;
  email: string;
  displayName: string;
  password: string;
  role: string;
}

interface Comment {
  id: number;
  content: string;
  createdAt: Date;
  author: Author;
}

interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}
