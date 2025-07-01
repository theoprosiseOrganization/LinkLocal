/**
 * FriendsPage Component
 * Search bar for friends pops up modal with results
 * On click of search bar, opens modal
 * Allows user to search for friends by name or email
 * Allows user to add friends from search results
 * Allow user to look at friend profiles
 * Displays a list of friends under the search bar
 *
 */
import { Search } from "lucide-react";
import Layout from "../Layout/Layout";
import SearchModal from "../SearchModal/SearchModal";
import FriendsGrid from "./FriendsGrid";

export default function FriendsPage() {
  return (
    <Layout>
      <div className="friendspage-header">
        <SearchModal />
        Friends Page
        <FriendsGrid />
      </div>
    </Layout>
  );
}
