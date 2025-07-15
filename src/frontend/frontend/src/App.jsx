import "./App.css";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router";
import HomePage from "./components/HomePage/HomePage";
import SuggestedPage from "./components/SuggestedPage/SuggestedPage";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import FriendsPage from "./components/FriendsPage/FriendsPage";
import SignInPage from "./components/SignInPage/SignInPage";
import SingUpPage from "./components/SignUpPage/SignUpPage";
import WithAuth from "./components/WithAuth/WithAuth";
import CreateEventPage from "./components/CreateEventPage/CreateEventPage";
import ViewEventPage from "./components/ViewEventPage/ViewEventPage";
import ViewUserPage from "./components/ViewUserPage/ViewUserPage";
import MapPlan from "./components/MapPlanPage/MapPlan";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/suggested"
          element={
            <WithAuth>
              <SuggestedPage />
            </WithAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <WithAuth>
              <ProfilePage />
            </WithAuth>
          }
        />
        <Route
          path="/friends"
          element={
            <WithAuth>
              <FriendsPage />
            </WithAuth>
          }
        />
        <Route
          path="/create-event"
          element={
            <WithAuth>
              <CreateEventPage />
            </WithAuth>
          }
        />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SingUpPage />} />
        <Route
          path="/view-event/:eventId"
          element={
            <WithAuth>
              <ViewEventPage />
            </WithAuth>
          }
        />
        <Route
          path="/view-user/:userId"
          element={
            <WithAuth>
              <ViewUserPage />
            </WithAuth>
          }
        />
        <Route
          path="/plan"
          element={
            <WithAuth>
              <MapPlan />
            </WithAuth>
          }
        />
        <Route
          path="/plan/:planId"
          element={
            <WithAuth>
              <PlanViewer />
            </WithAuth>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
