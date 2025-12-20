import { HOMEPAGE_DATA } from "@/lib/homepage-data";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { Moon_4 } from "../ui/svgs";
import { cn } from "@/lib/utils";
import { spacing, typography } from "@/lib/design-tokens";

export const HeroSection = () => {
  return (
    <section className="flex md:justify-between bg-primary text-secondary py-10 overflow-hidden">
      <div
        className={cn(
          spacing.padding_x,
          "md:w-[60%] flex flex-col items-center text-center text-pretty md:items-start md:text-start"
        )}
      >
        <h1
          className={cn(
            typography.hero.title,
            "font-bold mb-6 leading-tight lg:leading-22"
          )}
        >
          {HOMEPAGE_DATA.hero.title}
        </h1>
        <p
          className={cn(typography.hero.subtitle, "mb-8 text-muted-foreground")}
        >
          {HOMEPAGE_DATA.hero.subtitle}
        </p>
        <div>
          <Link to="/articles">
            <Button size="lg" variant="secondary">
              {HOMEPAGE_DATA.hero.ctaText}
              <div className="ml-2">
                <ArrowRight size={20} />
              </div>
            </Button>
          </Link>
        </div>
      </div>
      <div className="hidden md:block">
        <Moon_4 />
      </div>
    </section>
  );
};
