/**
 * 
 * @returns 
 */

import Layout from "../Layout/Layout";
import PeopleGrid from "../FriendsPage/PeopleGrid";
import "./SuggestedPage.css";
export default function SuggestedPage() {

  return (
     <Layout>
         <PeopleGrid type="Suggested" />
       </Layout>
  );
}