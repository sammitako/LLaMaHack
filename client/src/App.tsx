import "./App.css";
import { MainNav } from "@/components/main-nav";
import { Search } from "@/components/search";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            {/* <TeamSwitcher /> */}
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              {/* <UserNav /> */}
            </div>
          </div>
        </div>
        <Dashboard />
      </div>
    </>
  );
}

export default App;
