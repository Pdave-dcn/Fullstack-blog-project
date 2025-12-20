import Header from "./Header";

export const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex flex-col items-center">
      {/* Main content constrained */}
      <div className="">
        <Header />
        {children}
      </div>
    </div>
  );
};

PageWrapper.displayName = "PageWrapper";
