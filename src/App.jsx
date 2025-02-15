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
          <div className='bg-black border-b py-2 border-gray-400 h-16'>
            <SearchBar />
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
