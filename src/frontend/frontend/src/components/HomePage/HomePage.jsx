import Layout from "../Layout/Layout";
import Map from "../Map/Map";
import "./HomePage.css"; 
import VerticalEvents from "../VerticalEvents/VerticalEvents";

export default function HomePage() {
  return (
    <Layout>
      <div className="homepage-split">
        <div className="homepage-left">
          <Map />
        </div>
        <div className="homepage-right">
          <VerticalEvents />
        </div>
      </div>
    </Layout>
  );
}