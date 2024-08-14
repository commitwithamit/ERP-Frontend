import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/components/login"
import Root from "./pages/Root";
import Home from "./pages/home/Home";
import Team from "./pages/team";

import "./App.css";
import "./style.scss";
import Employee from "./pages/team/Employee";
import Department from "./pages/team/Department";
import Role from "./pages/team/Role";
import UsePersistLogin from "./hooks/UsePersistLogin";
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route element={<UsePersistLogin/>}>
            <Route element={<Root />}>
              <Route path="/" element={<Home />}></Route>
              <Route path="/team" element={<Team />}>
                <Route index element={<Employee />}></Route>
                <Route path="employee" element={<Employee />}></Route>
                <Route path="department" element={<Department />}></Route>
                <Route path="role" element={<Role />}></Route>
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
