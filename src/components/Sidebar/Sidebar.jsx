import { Link, NavLink } from "react-router-dom";
import NavItem from "../NavItem/NavItem";


export default function Sidebar() {
  return (
    <>
      <div className="bg-black border-r-1 flex flex-col items-center  border-gray-300 h-screen">
        <div className="mt-2 mb-5 flex  items-center pl-4 justify-between w-5/6 h-1/12">
          <NavLink to='/' className="w-1/2 h-full flex items-center justify-start">
            <img src="/logo.gif" alt="logo" className="h-8/10 invert " />
          </NavLink>
          <button className="h-5/10">
            <img src="/sidebar.svg" alt="sidebar-flip" className="h-full invert cursor-pointer" />
          </button>
        </div>
        <div className="w-5/6 h-8/12 mb-8  p-2">
          <div className="w-full h-1/8 bg-[#1D1616] border border-[#c0c0c0] rounded-md text-sm flex justify-center pr-5 pl-2 russo-one-regular mb-1 space-x-3 items-center cursor-pointer text-white 
    hover:scale-105 transition-transform duration-200">

            <img src="/plus.svg" alt="upload" className="h-4/7 invert transition-transform duration-200 hover:scale-110" />

            <div>UPLOAD</div>
          </div>
          <div className="w-6/6 border-1 border-gray-300 my-2"/>
          <NavItem to='/' icon="home" text="Home" />
          <NavItem to='/history' icon="time-past" text="History" />
          <NavItem to='/community' icon="population-globe" text="Community" />
          <NavItem to='/subscription' icon="channel" text="Subscriptions" />
        </div>
        <div className="w-5/6 h-2/12 bg-amber-50">
        </div>
      </div>
    </>
  );
}
