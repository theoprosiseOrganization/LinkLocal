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
import Layout from "../Layout/Layout";
import SearchModal from "../SearchModal/SearchModal";
import PeopleGrid from "./PeopleGrid";

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
