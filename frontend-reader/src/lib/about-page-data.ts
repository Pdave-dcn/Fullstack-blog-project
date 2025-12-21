export const ABOUTPAGE_DATA = {
  header: {
    title: "About TextNode",
    subtitle:
      "A personal blog project sharing thoughts, insights, and discoveries about technology, development, and whatever catches my interest",
  } as const,

  aboutMe: {
    heading: "Hey There! 👋",
    paragraph:
      "Welcome to my little corner of the internet! This blog is where I share my thoughts, experiences, and things I've learned along the way. It's a fun personal project that started as a way to document my journey and maybe help others who are on a similar path.",
    features: [
      {
        id: "personal-touch",
        title: "Personal Touch",
        description:
          "Every post comes from personal experience, lessons learned, and genuine curiosity about the world",
        icon: "",
      },
      {
        id: "learning-in-Public",
        title: "Learning in Public",
        description:
          "I believe in learning out loud - sharing both successes and failures to help others avoid the same pitfalls",
        icon: "",
      },
      {
        id: "Community",
        title: "Community",
        description:
          "While this is a personal project, I love connecting with readers and learning from your experiences too",
        icon: "",
      },
    ],
  } as const,

  whatIWriteAbout: {
    heading: "What I Write About",
    topics: [
      {
        id: "development-tech",
        title: "Development & Tech",
        description:
          "Tutorials, tips, and insights from my coding journey. From React hooks to database design, I share what I've learned building real projects.",
        colorClass: "text-blue-600",
      },
      {
        id: "problem-solving",
        title: "Problem Solving",
        description:
          'Those "aha!" moments when you figure out a tricky bug or find an elegant solution to a complex problem. I love sharing these breakthroughs.',
        colorClass: "text-green-600",
      },
      {
        id: "learning-growth",
        title: "Learning & Growth",
        description:
          "Reflections on learning new skills, overcoming imposter syndrome, and navigating the ever-changing landscape of technology.",
        colorClass: "text-purple-600",
      },
      {
        id: "tools-workflows",
        title: "Tools & Workflows",
        description:
          "Reviews and tutorials on tools, frameworks, and workflows that have made my life easier. If it saves me time, it might save you time too!",
        colorClass: "text-orange-600",
      },
    ],
  } as const,
} as const;
