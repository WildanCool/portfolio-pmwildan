import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { label: "HOME", href: "/#home", type: "anchor" },
  { label: "ABOUT", href: "/#about", type: "anchor" },
  { label: "PROJECTS", href: "/#projects", type: "anchor" },
];

export default function Navbar() {
  const location = useLocation();

  const handleAnchorClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (location.pathname === "/") {
      event.preventDefault();

      const id = href.split("#")[1];
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        PORTFOLIO<span>.</span>
      </Link>

      <div className="navbar-menu">
        {menuItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={(event) => handleAnchorClick(event, item.href)}
          >
            {item.label}
          </a>
        ))}

        <Link
          to="/contact"
          className={location.pathname === "/contact" ? "active" : ""}
        >
          CONTACT
        </Link>
      </div>
    </nav>
  );
}
