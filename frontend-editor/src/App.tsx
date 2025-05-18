import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "./components/ui/sidebar";
import AppSidebar from "./components/AppSidebar";
import Header from "./components/Header";

// Pages
import Dashboard from "./components/pages/Dashboard/Dashboard";
import Comments from "./components/pages/Comments";
import Articles from "./components/pages/Articles";
import NewArticle from "./components/pages/NewArticle";
import NotFound from "./components/pages/NotFound";
import { Toaster } from "sonner";

const App = () => {
  return (
    <SidebarProvider>
      <BrowserRouter>
        <Toaster position="bottom-right" />
        <div className="flex h-screen w-full overflow-hidden">
          <AppSidebar />
          <div className="flex-1 flex flex-col min-w-0">
            <Header />
            <div className="flex-1 overflow-auto p-4">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/articles" element={<Articles />} />
                <Route path="/comments" element={<Comments />} />
                <Route path="/new-article" element={<NewArticle />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </SidebarProvider>
  );
};

export default App;
