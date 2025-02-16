import React from 'react';
import Sidebar from './components/Sidebar/Sidebar.jsx';
import { Outlet } from 'react-router-dom';
import SearchBar from './components/SearchBar/SearchBar.jsx';

function App() {
  return (
    <>
      <div className='flex h-screen w-screen fixed top-0 left-0 bg-black'>
        <div className='w-1/6'>
          <Sidebar />
        </div>
        <div className='w-5/6 bg-black'>
          <div className='bg-black border-b py-2 border-gray-400 h-16 flex justify-around items-center'>
            <SearchBar />
            <div className='flex justify-between items-center space-x-1 h-2/3 w-30 text-black bg-white rounded-full py-2 px-3 russo-one-regular border border-cyan-400 cursor-pointer hover:py-1 hover:transition-transform duration-200 hover:border-2 hover:border-gray-300'>
              Portfolio
              <img src="/share.png" alt="redirect-to-creator" className='h-full'/>
            </div>
          </div>
          <div className='m-1 h-full overflow-y-scroll w-full pb-15'>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
