import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Articles from "./pages/Articles";
import ArticleDetails from "./pages/ArticleDetails";
import { Toaster } from "sonner";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  const basePath = import.meta.env.BASE_URL;
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Toaster position="bottom-right" richColors />
        <Routes>
          <Route path={`${basePath}`} element={<Home />} />
          <Route path={`${basePath}/articles`} element={<Articles />} />
          <Route
            path={`${basePath}/articles/:id`}
            element={<ArticleDetails />}
          />
          <Route path={`${basePath}/about`} element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
