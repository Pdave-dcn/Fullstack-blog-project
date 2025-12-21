import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ABOUTPAGE_DATA } from "@/lib/about-page-data";

export const WhatIWriteAboutSection = () => {
  return (
    <section>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            {ABOUTPAGE_DATA.whatIWriteAbout.heading}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ABOUTPAGE_DATA.whatIWriteAbout.topics.map((topic) => (
              <div key={topic.id}>
                <Card className="h-full text-center text-balance lg:text-start">
                  <CardHeader>
                    <CardTitle className="text-xl">{topic.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-lg">
                      {topic.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
