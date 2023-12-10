import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { MainNav } from "@/components/main-nav";
import { Search } from "@/components/search";
// import Dashboard from "@/pages/dashboard";
// import { useEffect } from "react";
// import axios from "axios";
import Upload from "./pages/upload";
import Dashboard from "./pages/dashboard";
import { UserNav } from "./components/user-nav";

function App() {
  // const fetchTest = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:3000/api/evaluateImage"
  //     );
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     console.log("Done!");
  //   }
  // };

  // useEffect(() => {
  //   fetchTest();
  // }, []);

  return (
    <Router>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            {/* <TeamSwitcher /> */}
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <UserNav />
            </div>
          </div>
        </div>

        <Routes>
          <Route path="/" element={<Navigate to="/upload" replace />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
