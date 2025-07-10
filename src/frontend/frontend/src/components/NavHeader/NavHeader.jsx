import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
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
            <NavigationMenuTrigger className="navigation-menu__trigger">
              Sign In/Up
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[200px] gap-4">
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className="trigger-link">
                    <Link to="/signin">Sign In</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuLink asChild className="trigger-link">
                  <Link to="/signup">Sign Up</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="trigger-link">
                  <Link onClick={logoutUser}>Logout</Link>
                </NavigationMenuLink>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
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
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
