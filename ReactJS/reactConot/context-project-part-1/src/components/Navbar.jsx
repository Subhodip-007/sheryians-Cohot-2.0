import { NavLink } from "react-router-dom";
import { Home, CookingPot, Info } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed bottom-6 left-1/2 z-50 w-[90%] max-w-md -translate-x-1/2">
      <div className="flex items-center justify-around rounded-full border border-[#e7c9a9] bg-[#fff7ed]/90 px-3 py-1 shadow-[0_10px_40px_rgba(100,60,30,0.15)] backdrop-blur-md">
        
        {/* Home */}
        <NavLink to="/">
          {({ isActive }) => (
            <button
              className={`flex flex-col items-center gap-1 rounded-full px-5 py-2 transition-all hover:-translate-y-1 ${
                isActive
                  ? "bg-[#fef3c7] text-[#b45309]"
                  : "text-[#9a7b63] hover:text-[#b45309]"
              }`}
            >
              <Home size={21} strokeWidth={2.5} />

              <span className="text-[10px] font-medium tracking-wide">
                Home
              </span>
            </button>
          )}
        </NavLink>

        {/* Recipes */}
        <NavLink to="/recipes">
          {({ isActive }) => (
            <button
              className={`flex flex-col items-center gap-1 rounded-full px-5 py-2 transition-all hover:-translate-y-1 ${
                isActive
                  ? "bg-[#fef3c7] text-[#b45309]"
                  : "text-[#9a7b63] hover:text-[#b45309]"
              }`}
            >
              <CookingPot size={21} />

              <span className="text-[10px] font-medium tracking-wide">
                Recipes
              </span>
            </button>
          )}
        </NavLink>

        {/* About */}
        <NavLink to="/about">
          {({ isActive }) => (
            <button
              className={`flex flex-col items-center gap-1 rounded-full px-5 py-2 transition-all hover:-translate-y-1 ${
                isActive
                  ? "bg-[#fef3c7] text-[#b45309]"
                  : "text-[#9a7b63] hover:text-[#b45309]"
              }`}
            >
              <Info size={21} />

              <span className="text-[10px] font-medium tracking-wide">
                About
              </span>
            </button>
          )}
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;