export const getExcerpt = (content: string, maxLength: number = 150) => {
  let plainText = content.replace(/<[^>]*>/g, "").replace(/[#*`]/g, "");

  const entityMap: { [key: string]: string } = {
    "&nbsp;": " ",
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#39;": "'",
    "&hellip;": "...",
    "&mdash;": "—",
    "&ndash;": "–",
  };

  plainText = plainText.replace(/&[a-zA-Z0-9#]+;/g, (match) => {
    return entityMap[match] || match;
  });

  plainText = plainText.replace(/\s+/g, " ").trim();

  if (plainText.length <= maxLength) return plainText;

  const truncated = plainText.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");
  return truncated.substring(0, lastSpace) + "...";
};
