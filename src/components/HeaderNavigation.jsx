import { NavigationMenuLink } from "@radix-ui/react-navigation-menu";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList
} from "@radix-ui/react-navigation-menu";


function MenuList({ menuItems }) {
  return (
    <ul className="flex flex-col gap-2 w-48">
      {menuItems.map((item, index) => (
        <li key={index}>
          <NavigationMenuLink asChild>
            <Link to={item.to}>
              {item.title}
            </Link>
          </NavigationMenuLink>
        </li>
      ))}
    </ul>
  );
}

export default function HeaderNavigation({ items }) {
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex flex-row gap-3">
        {items.map((menu, index) => (
          <NavigationMenuItem key={index}>
            <NavigationMenuTrigger>{menu.title}</NavigationMenuTrigger>
            <NavigationMenuContent className="absolute top-full left-0 mt-2 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50">
              <MenuList menuItems={menu.subItems || []} />
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

