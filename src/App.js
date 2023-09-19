import "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Auth } from "./pages/auth/index";
import { ExpensePage } from "./pages/expense-page/index";
import { AccountPage } from "./pages/account-page/index";
import { Nav } from "./components/Nav";

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
          <Route path="/" exact element={<Auth />} />
          <Route path="/expense-page" exact element={<ExpensePage />} />
          <Route path="/account-page" exact element={<AccountPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
