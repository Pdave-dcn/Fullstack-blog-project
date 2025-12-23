import { create } from "zustand";

interface CommentState {
  articleId: string;

  openReplies: Set<string>;
  openCommentForm: Set<string>;
  editingComments: Set<string>; // ✅ Add this

  setArticleId: (articleId: string) => void;

  toggleCommentForm: (commentId: string) => void;
  toggleReplies: (commentId: string) => void;
  toggleEditMode: (commentId: string) => void;
}

export const useCommentStore = create<CommentState>((set) => ({
  articleId: "",

  openReplies: new Set(),
  openCommentForm: new Set(),
  editingComments: new Set(),

  setArticleId: (articleId: string) => set({ articleId }),

  toggleReplies: (commentId) =>
    set((state) => {
      const next = new Set(state.openReplies);
      if (next.has(commentId)) {
        next.delete(commentId);
      } else {
        next.add(commentId);
      }
      return { openReplies: next };
    }),

  toggleCommentForm: (commentId) =>
    set((state) => {
      const next = new Set(state.openCommentForm);
      if (next.has(commentId)) {
        next.delete(commentId);
      } else {
        next.add(commentId);
      }
      return { openCommentForm: next };
    }),

  toggleEditMode: (commentId) =>
    set((state) => {
      const next = new Set(state.editingComments);
      if (next.has(commentId)) {
        next.delete(commentId);
      } else {
        next.add(commentId);
      }
      return { editingComments: next };
    }),
}));
