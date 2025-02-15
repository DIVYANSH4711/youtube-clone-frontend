import { NavLink } from "react-router-dom";

export default function NavItem({ to, text, icon }) { 
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center px-3 py-2 text-sm mb-2 rounded-sm transition-colors russo-one-regular 
         ${isActive ? "bg-white text-black hover:text-black" : "text-white hover:bg-zinc-800"}`
      }
    >
      {({ isActive }) => (
        <>
          <img
            src={`/${icon}.svg`}
            alt={text}
            className={`h-5 w-5 ${isActive ? "" : "invert"}`} // ✅ Only invert when NOT active
          />
          <span className="ml-4">{text}</span>
        </>
      )}
    </NavLink>
  );
}
