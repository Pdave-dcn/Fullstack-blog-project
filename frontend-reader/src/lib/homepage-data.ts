export const HOMEPAGE_DATA = {
  hero: {
    title: "Welcome to TextNode",
    subtitle:
      "Discover insightful articles, expert opinions, and the latest trends in technology, development, and beyond.",
    ctaText: "Start Reading",
  },
  features: [
    {
      id: "quality-content",
      title: "Quality Content",
      description:
        "Carefully crafted articles covering the latest in tech, development, and industry insights.",
      colorScheme: {
        gradient: "from-blue-50 to-indigo-50",
        border: "border-blue-100",
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
      },
    },
    {
      id: "always-fresh",
      title: "Always Fresh",
      description:
        "Regular updates with new perspectives on emerging technologies and best practices.",
      colorScheme: {
        gradient: "from-green-50 to-emerald-50",
        border: "border-green-100",
        iconBg: "bg-green-100",
        iconColor: "text-green-600",
      },
    },
    {
      id: "for-developers",
      title: "For Developers",
      description:
        "Written by a developer, for developers. Practical insights you can apply immediately.",
      colorScheme: {
        gradient: "from-purple-50 to-violet-50",
        border: "border-purple-100",
        iconBg: "bg-purple-100",
        iconColor: "text-purple-600",
      },
    },
  ],
  recentArticles: {
    title: "Latest Articles",
    subtitle: "Fresh insights and perspectives from the world of development",
    ctaText: "View All Articles",
  },
  errors: {
    loading: {
      ariaLabel: "Loading articles",
    },
    fetchError: {
      title: "Error",
      message: "Failed to load articles. Please try again later.",
    },
    noArticles: {
      title: "No Articles Found",
      message: "Check back later for new content.",
    },
  },
} as const;

export type HomepageData = typeof HOMEPAGE_DATA;
