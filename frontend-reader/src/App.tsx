import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Articles from "./pages/Articles";
import ArticleDetails from "./pages/ArticleDetails";
import { Toaster } from "sonner";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import ScrollToTop from "./components/ScrollToTop";
import { PageWrapper } from "./components/layout/PageWrapper";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Toaster position="bottom-right" richColors />
        <Routes>
          <Route
            path="/"
            element={
              <PageWrapper>
                <Home />
              </PageWrapper>
            }
          />
          <Route
            path={`/articles`}
            element={
              <PageWrapper>
                <Articles />
              </PageWrapper>
            }
          />
          <Route
            path={`/articles/:id`}
            element={
              <PageWrapper>
                <ArticleDetails />
              </PageWrapper>
            }
          />
          <Route
            path={`/about`}
            element={
              <PageWrapper>
                <About />
              </PageWrapper>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
