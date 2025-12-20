import { Star_13, Star_1, Ellipse_8 } from "@/components/ui/svgs";

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
      icon: Star_13,
    },
    {
      id: "always-fresh",
      title: "Always Fresh",
      description:
        "Regular updates with new perspectives on emerging technologies and best practices.",
      icon: Star_1,
    },
    {
      id: "for-developers",
      title: "For Developers",
      description:
        "Written by a developer, for developers. Practical insights you can apply immediately.",
      icon: Ellipse_8,
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
