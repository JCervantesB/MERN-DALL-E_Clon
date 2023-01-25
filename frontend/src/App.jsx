import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import { logo } from './assets';
import { Inicio, CrearPost } from './pages';

const App = () => {
  return (
    <BrowserRouter>
      <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-slate-100">
        <Link to="/">
          <img src={logo} alt="logo" className="w-28 object-contain" />
        </Link>
        <Link to="/crear-post" className="font-inter font-medium bg-indigo-600 text-white px-4 py-2 rounded-md">Crear
        </Link>
      </header>
      <main className="sm:p-8 px-4 py-8 w-full bg-slate-50 min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/crear-post" element={<CrearPost />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App