/**
 * SuggestedPage.jsx
 * This component displays a list of suggested users for the current user.
 * It uses the PeopleGrid component to show the suggested users.
 * 
 * @component
 * @example
 * <SuggestedPage />
 * @returns {JSX.Element} The rendered SuggestedPage component. 
 *  
 */

import Layout from "../Layout/Layout";
import PeopleGrid from "../FriendsPage/PeopleGrid";
export default function SuggestedPage() {

  return (
     <Layout>
         <PeopleGrid type="Suggested" />
       </Layout>
  );
}