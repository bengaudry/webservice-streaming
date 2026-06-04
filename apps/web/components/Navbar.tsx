import { NavLink } from "react-router";

export function Navbar() {
  return (
    <nav className="border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-xl font-semibold">
            <NavLink to="/">Musiques</NavLink>
        </div>
        <div className="flex gap-6">
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `transition-colors ${
                isActive ? "text-white font-medium" : "text-neutral-400 hover:text-neutral-200"
              }`
            }
          >
            Se connecter
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
