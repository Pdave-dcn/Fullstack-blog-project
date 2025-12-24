import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "./components/ui/sidebar";
import { Toaster } from "sonner";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Comments from "./pages/Comments";
import Articles from "./pages/Articles/Articles";
import NewArticle from "./pages/NewArticle";
import NotFound from "./pages/NotFound";
import ArticleDetails from "./pages/ArticleDetails/ArticleDetails";
import ArticleEdit from "./pages/ArticleEdit";

const App = () => {
  return (
    <Router>
      <SidebarProvider>
        <Toaster position="top-center" />
        <div className="flex h-screen w-full overflow-hidden">
          <div className="flex-1 flex flex-col min-w-0">
            <div className="flex-1 p-1.5 md:p-0">
              <Routes>
                <Route path="/" element={<Login />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/articles"
                  element={
                    <ProtectedRoute>
                      <Articles />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/articles/:id"
                  element={
                    <ProtectedRoute>
                      <ArticleDetails />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/articles/:id/edit"
                  element={
                    <ProtectedRoute>
                      <ArticleEdit />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/comments"
                  element={
                    <ProtectedRoute>
                      <Comments />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/new-article"
                  element={
                    <ProtectedRoute>
                      <NewArticle />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </Router>
  );
};

export default App;
