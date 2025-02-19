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
          <div className="w-5/6 h-1/8 bg-[#1D1616] border border-[#c0c0c0] rounded-full text-sm flex justify-center pr-5 pl-2 russo-one-regular mb-1 space-x-3 items-center cursor-pointer text-white 
    hover:scale-105 transition-transform duration-200">

            <img src="/plus.svg" alt="upload" className="h-4/7 invert transition-transform duration-200 hover:scale-110" />

            <div>UPLOAD</div>
          </div>
          <div className="w-6/6 border-1 border-gray-300 my-2" />
          <NavItem to='/' icon="home" text="Home" />
          <NavItem to='/history' icon="time-past" text="History" />
          <NavItem to='/community' icon="population-globe" text="Community" />
          <NavItem to='/subscription' icon="channel" text="Subscriptions" />
          <NavItem to='/likedvideo' icon='likevideo' text='Liked Videos' />
        </div>
        <div className="w-full h-2/12  border-t-1 border-gray-300 bottom-0 flex flex-col justify-around bg-black">
          <div className="w-full h-2/3 flex items-center justify-between">
            <div className="flex items-center space-x-2 pl-2">
              <img src="/man.gif" alt="avatar" className="w-1/5 rounded-full cursor-pointer" />
              <div className="flex flex-col py-1">
                <div className="h-2/3 text-zinc-200 text-sm hover:underline cursor-pointer">Divyansh Kashyap</div>
                <div className="h-1/3 text-zinc-400 text-sm">@duvyansh728</div>
              </div>
            </div>
          </div>
          <div className="w-full h-1/3 bg-[#B80000] text-lg font-bold hover:underline flex items-center justify-center">
            Logout
            <img src="/logout.svg" alt="logout" className="h-2/6 pl-1" />
          </div>
        </div>
      </div>
    </>
  );
}
