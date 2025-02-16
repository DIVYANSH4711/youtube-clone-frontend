import React from 'react';
import Sidebar from './components/Sidebar/Sidebar.jsx';
import { Outlet } from 'react-router-dom';
import SearchBar from './components/SearchBar/SearchBar.jsx';

function App() {
  return (
    <>
      <div className='flex h-screen w-screen bg-black'>
        <div className='w-1/6'>
          <Sidebar />
        </div>
        <div className='w-5/6 bg-black'>
          <div className='bg-black border-b py-2 border-gray-400 h-16 flex justify-around items-center'>
            <SearchBar />
            <div className='flex justify-around items-center space-x-1 h-2/3 w-30 text-black bg-white rounded-full p-2 russo-one-regular border border-cyan-400 cursor-pointer hover:p-1 hover:transition-transform duration-200 hover:border-2 hover:border-gray-300'>
              Portfolio
              <img src="/share.png" alt="redirect-to-creator" className='h-full'/>
            </div>
          </div>
          <div>
            {/* <Outlet /> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
