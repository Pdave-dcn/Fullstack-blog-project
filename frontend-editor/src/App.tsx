import { SidebarProvider } from "./components/ui/sidebar";
import AppSidebar from "./components/AppSidebar";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";

const App = () => {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          <div className="flex-1 overflow-auto">
            <Dashboard />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default App;
