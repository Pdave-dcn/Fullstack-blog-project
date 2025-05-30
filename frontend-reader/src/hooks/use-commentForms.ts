import { useState } from "react";

export const useCommentForm = () => {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setContent("");
    setIsSubmitting(false);
  };

  const handleSubmit = async (
    onSubmit: (content: string) => Promise<boolean>
  ) => {
    if (!content.trim()) return;

    setIsSubmitting(true);
    const success = await onSubmit(content);

    if (success) {
      resetForm();
    } else {
      setIsSubmitting(false);
    }
  };

  return {
    content,
    setContent,
    isSubmitting,
    resetForm,
    handleSubmit,
  };
};
