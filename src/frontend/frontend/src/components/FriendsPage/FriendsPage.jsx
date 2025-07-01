/**
 * FriendsPage.jsx
 * This component displays the user's friends, including their followers and following lists.
 * It uses the PeopleGrid component to show the lists side by side.
 * It also includes a search modal for searching friends.
 * 
 * @component
 * @example
 * <FriendsPage />
 * @returns {JSX.Element} The rendered FriendsPage component.
 */
import Layout from "../Layout/Layout";
import SearchModal from "../SearchModal/SearchModal";
import PeopleGrid from "./PeopleGrid";
import "./FriendsPage.css";

export default function FriendsPage() {
  return (
    <Layout>
      <SearchModal />
      <div className="friendspage-split">
        <div className="friendspage-left">
          <PeopleGrid type="Followers" />
        </div>
        <div className="friendspage-right">
          <PeopleGrid type="Following" />
        </div>
      </div>
    </Layout>
  );
}
