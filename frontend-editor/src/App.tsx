import { SidebarProvider } from "./components/ui/sidebar";
import AppSidebar from "./components/AppSideBar";

const App = () => {
  return (
    <main>
      <SidebarProvider>
        <AppSidebar />
      </SidebarProvider>
    </main>
  );
};

export default App;
