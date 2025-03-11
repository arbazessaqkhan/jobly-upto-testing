"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {collections} from "@/app/sparkcms.config";

const navItems = collections.map((collection) => {
  return {
    href: `/${collection.config.slug}`,
    label: collection.config.label.plural,
  }
})

export default function Navbar() {
  const pathname = usePathname();
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light border-bottom">
        <div className="container">
          <Link className="navbar-brand" href="/public">
            Jobly
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse flex-end" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {navItems.map((item) => (
                <li key={item.href} className="nav-item">
                  <Link
                    href={item.href}
                    className={`nav-link ${
                      pathname.includes(item.href) ? "active" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
