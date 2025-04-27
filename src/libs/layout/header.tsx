'use client'

import { useState } from 'react'
import Link from 'next/link'
// import Image from 'next/image';
import { MenuIcon, XIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'

export interface MenuItem {
  name: string
  href: string
}

export interface HeaderProps {
  theme?: 'light' | 'dark'
  menuItems?: MenuItem[]
}
// Define the menu items in a centralized array
const menuItemsx: MenuItem[] = [
  { name: 'Home', href: '/' },
  { name: 'Jobs', href: '/jobs' },

  // Add more menu items here as needed
]

export default function Header({ theme = 'light', menuItems = menuItemsx }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Function to close mobile menu when a link is clicked
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false)
  }

  // Define theme-specific styles
  const isDarkTheme = theme === 'dark'
  // const containerClass = isDarkTheme
  //   ? 'bg-gray-800 text-white'
  //   : 'bg-white text-gray-900';
  const navLinkClass = (href: string) =>
    pathname === href
      ? isDarkTheme
        ? 'text-blue-400'
        : 'text-blue-600'
      : isDarkTheme
        ? 'text-gray-300 hover:text-blue-400'
        : 'text-gray-700 hover:text-blue-600'

  return (
    <header className={`bg-background shadow-sm fixed w-full z-50`}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <img
            src="/assets/img/logo.png"
            width={200}
            height={60}
            alt="Cyber Spark Jobs"
            className="object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {menuItems.map((item) => (
            <Link
              href={item.href}
              key={item.name}
              className={`${navLinkClass(item.href)} transition-colors font-medium`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`${
              isDarkTheme
                ? 'text-gray-300 hover:text-blue-400'
                : 'text-gray-700 hover:text-blue-600'
            } focus:outline-none focus:ring-2 focus:ring-blue-600 rounded`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div
          className={`md:hidden ${
            isDarkTheme ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
          } shadow-md transition-transform duration-300 ease-in-out transform`}
        >
          <nav className="px-4 pt-2 pb-4 space-y-1">
            {menuItems.map((item) => (
              <Link
                href={item.href}
                key={item.name}
                onClick={handleLinkClick}
                className={`block ${navLinkClass(
                  item.href,
                )} px-3 py-2 rounded-md text-base font-medium`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}