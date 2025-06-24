import "./App.css";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import FriendsPage from "./components/FriendsPage/FriendsPage";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import SuggestedPage from "./components/SuggestedPage/SuggestedPage";
import CreateEventPage from "./components/CreateEventPage/CreateEventPage";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/friends" element={<FriendsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/suggested" element={<SuggestedPage />} />
          <Route path="/createEvent" element={<CreateEventPage />} />
        </Routes>
      </Router>
  );
}

export default App;
