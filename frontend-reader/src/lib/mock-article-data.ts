interface BlogPost {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Getting Started with React and TypeScript",
    content:
      "TypeScript has become an essential tool for React developers. It provides type safety, better IDE support, and helps catch errors before runtime. In this article, we'll explore how to set up a React project with TypeScript and discuss best practices for component typing. We'll cover props interfaces, generic components, and how to leverage TypeScript's powerful type system to write more maintainable code. Whether you're new to TypeScript or looking to improve your skills, this guide will help you write better React applications.",
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    title: "Modern CSS Techniques: Grid and Flexbox",
    content:
      "CSS has evolved significantly over the years, and modern layout systems like Grid and Flexbox have revolutionized how we build web interfaces. This article dives deep into both layout models, explaining when to use each one and how they complement each other. We'll explore practical examples, common patterns, and responsive design strategies. By the end, you'll understand how to create complex layouts with minimal code and maximum flexibility. Learn how to master these powerful CSS tools and elevate your front-end development skills.",
    createdAt: "2024-02-20T14:45:00Z",
  },
  {
    id: "3",
    title: "Understanding Async/Await in JavaScript",
    content:
      "Asynchronous programming is a fundamental concept in JavaScript, and async/await syntax has made it much more approachable. This comprehensive guide breaks down how promises work under the hood and how async/await simplifies asynchronous code. We'll cover error handling, parallel execution, and common pitfalls to avoid. Through practical examples, you'll learn how to write cleaner, more readable asynchronous code. Whether you're fetching data from APIs or handling complex workflows, mastering async/await is crucial for modern JavaScript development.",
    createdAt: "2024-03-10T09:15:00Z",
  },
  {
    id: "4",
    title: "Building Accessible Web Applications",
    content:
      "Web accessibility isn't just a nice-to-have feature—it's a necessity. In this article, we explore the principles of accessible design and how to implement them in your web applications. We'll cover ARIA attributes, semantic HTML, keyboard navigation, and screen reader compatibility. Learn how to test your applications for accessibility and understand WCAG guidelines. Building accessible applications ensures that everyone, regardless of their abilities, can use your products. Discover practical techniques and tools that make accessibility an integral part of your development process.",
    createdAt: "2024-04-05T16:20:00Z",
  },
  {
    id: "5",
    title: "State Management Patterns in Modern Web Apps",
    content:
      "Managing application state is one of the most challenging aspects of front-end development. This article examines various state management approaches, from React's built-in hooks to libraries like Redux and Zustand. We'll discuss when to use local state versus global state, how to structure your state for scalability, and patterns for handling asynchronous state updates. Understanding these concepts will help you make informed decisions about state management in your applications. Learn the pros and cons of different approaches and choose the right solution for your project's needs.",
    createdAt: "2024-05-12T11:00:00Z",
  },
];
