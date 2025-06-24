import Layout from "../Layout/Layout";
import Map from "../Map/Map";
import "./HomePage.css"; 

export default function HomePage() {
  return (
    <Layout>
      <div className="homepage-split">
        <div className="homepage-left">
          <Map />
        </div>
        <div className="homepage-right">
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}