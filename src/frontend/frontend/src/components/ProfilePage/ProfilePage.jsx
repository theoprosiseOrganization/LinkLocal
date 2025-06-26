import Layout from "../Layout/Layout";
import CreateEventButton from "../CreateEventPage/CreateEventButton";
import VerticalEvents from "../VerticalEvents/VerticalEvents";
import "./ProfilePage.css";

export default function ProfilePage() {
  return (
    <Layout>
      <div className="homepage-split">
        <div className="homepage-left">
          Your Events
          <VerticalEvents />
          <CreateEventButton />
        </div>
        <div className="homepage-right">Your Profile Information</div>
      </div>
    </Layout>
  );
}
