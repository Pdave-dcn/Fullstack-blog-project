export const spacing = { padding_x: "px-4 md:px-10" } as const;

export const typography = {
  hero: {
    title:
      "text-4xl md:text-6xl lg:text-8xl font-bold leading-tight lg:leading-22",
    subtitle: "text-lg text-muted-foreground md:text-2xl",
  },
} as const;

export const layout = {
  headerSection:
    "bg-primary text-background py-10 lg:16 flex justify-between items-center",
  heroSection:
    "flex flex-col items-center text-center text-pretty md:items-start md:text-start md:w-[60%]",
} as const;
