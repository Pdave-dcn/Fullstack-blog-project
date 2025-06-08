import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Articles from "./pages/Articles";
import ArticleDetails from "./pages/ArticleDetails";
import { Toaster } from "sonner";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Toaster position="bottom-right" richColors />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={`/articles`} element={<Articles />} />
          <Route path={`/articles/:id`} element={<ArticleDetails />} />
          <Route path={`/about`} element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
