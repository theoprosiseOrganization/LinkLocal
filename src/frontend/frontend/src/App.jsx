import "./App.css";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router";
import HomePage from "./components/HomePage/HomePage";
import SuggestedPage from "./components/SuggestedPage/SuggestedPage";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import FriendsPage from "./components/FriendsPage/FriendsPage";
import SignInPage from "./components/SignInPage/SignInPage";
import SingUpPage from "./components/SignUpPage/SignUpPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/suggested" element={<SuggestedPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SingUpPage />} />
      </Routes>
    </Router>
  );
}

export default App;
