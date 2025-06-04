export interface BlogComment {
  id: number;
  content: string;
  createdAt: string;
  parentId?: number | null;
  user: {
    id: number;
    name: string;
    username: string;
  };
  parent?: {
    id: number;
    user: {
      id: number;
      username: string;
      name: string;
    };
  } | null;
  replies?: BlogComment[];
  _count?: {
    replies: number;
  };
}
