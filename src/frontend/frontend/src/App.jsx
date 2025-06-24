import "./App.css";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router";
import HomePage from "./components/HomePage/HomePage";
import SuggestedPage from "./components/SuggestedPage/SuggestedPage";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import FriendsPage from "./components/FriendsPage/FriendsPage";
import AuthPage from "./components/AuthPage/AuthPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/suggested" element={<SuggestedPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </Router>
  );
}

export default App;
