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
            <Link
              to={item.to}
              className="block w-full px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            >
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
    <NavigationMenu viewport={false}>
      <NavigationMenuList className="flex flex-row gap-4">
        {items.map((menu, index) => (
          <NavigationMenuItem key={index} className="relative"> {/* Make parent relative */}
            <NavigationMenuTrigger>
              <div className="block w-full p-2">
                {menu.title}
              </div>
            </NavigationMenuTrigger>
            <NavigationMenuContent
              className="absolute top-full left-0 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50"
            >
              <MenuList menuItems={menu.subItems || []} />
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
