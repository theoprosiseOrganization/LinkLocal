import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../../../components/ui/navigation-menu";

import "./NavHeader.css";

import { Link } from "react-router-dom";
import { logoutUser } from "../../api";

export default function NavHeader() {
  return (
    <div className="nav-header">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/">Home</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/friends">Friends</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/suggested">Suggested</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link to="/plan">Plan</Link>
          </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/profile">Profile</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/signin">Sign In</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/signup">Sign Up</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link onClick={logoutUser}>Logout</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
