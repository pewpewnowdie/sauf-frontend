import { useState } from "react"
import { Search, Bell, User, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTheme } from "next-themes"
import { Link } from 'react-router-dom'
import HeaderNavigation from "./HeaderNavigation"

export default function Header() {
  const [search, setSearch] = useState("")
  const { theme, setTheme } = useTheme()
  const menuItems = [
    { title: "Projects", subItems: [{ title: "Project A", to: "/projects/a" }, { title: "Project B", to: "/projects/b" }, { title: "Project B", to: "/projects/b" }] },
    { title: "Issues", subItems: [{ title: "Issue 1", to: "/issues/1" }, { title: "Issue 2", to: "/issues/2" }, { title: "Issue 3", to: "/issues/3" }] }
  ];

  return (
    <header className="w-full bg-white dark:bg-gray-900 border-b dark:border-gray-700 shadow-sm px-4 py-2 flex items-center justify-between">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
          sauf :)
        </Link>

        {/* Desktop Nav */}
        <HeaderNavigation items={menuItems} />

      </div>

      {/* Center Section - Search */}
      <div className="flex flex-1 max-w-lg mx-6">
        <div className="relative w-full">
          <Search className="absolute left-2 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
          <Input
            type="text"
            placeholder="Search issues, projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 dark:bg-gray-800 dark:text-gray-200 dark:placeholder-gray-400"
          />
        </div>
      </div>

      {/* Right Section - Icons */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? (
            <Moon className="h-5 w-5 text-gray-600" />
          ) : (
            <Sun className="h-5 w-5 text-yellow-400" />
          )}
        </Button>

        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </Button>
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </Button>
      </div>
    </header>
  )
}
