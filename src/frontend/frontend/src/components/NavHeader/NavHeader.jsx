import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "../../../components/ui/navigation-menu";
import { Switch } from "../../../components/ui/switch";
import { Label } from "../../../components/ui/label";

import "./NavHeader.css";

import { Link } from "react-router-dom";
import { logoutUser } from "../../api";

export default function NavHeader({ darkMode, setDarkMode }) {
  return (
    <div
      className="nav-header"
    >
      <NavigationMenu>
        <NavigationMenuList>
  <div className="flex items-center w-full">
    {/* Left: LinkLocal */}
    <div className="flex items-center flex-1">
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link to="/">LinkLocal</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </div>
    {/* Right: Other links */}
    <div className="flex items-center gap-2 justify-end">
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          background: "var(--color-primary)",
          padding: "0.5rem 1rem",
          borderRadius: "0.5rem",
        }}
      >
        <Label
          htmlFor="dark-mode"
          style={{ color: "var(--color-primary-foreground)" }}
        >
          {darkMode ? "Dark" : "Light"}
        </Label>
        <Switch
          id="dark-mode"
          checked={darkMode}
          onCheckedChange={setDarkMode}
          aria-label="Toggle dark mode"
        />
      </div>
    </div>
  </div>
</NavigationMenuList>

      </NavigationMenu>
      
    </div>
  );
}
