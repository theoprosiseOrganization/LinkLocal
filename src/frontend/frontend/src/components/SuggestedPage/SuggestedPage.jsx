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
import EventSearch from "./EventSearch";

export default function SuggestedPage() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto mt-10 p-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-2 text-zinc-800 dark:text-zinc-100">
          Suggested Connections
        </h1>
        <p className="text-zinc-500 dark:text-zinc-300 mb-6">
          Discover new people you might know or want to connect with!
        </p>
        <div className="mt-4">
          <PeopleGrid type="Suggested" />
        </div>
        <div className="mt-4">
          Search Section
          <EventSearch />
        </div>
      </div>
    </Layout>
  );
}