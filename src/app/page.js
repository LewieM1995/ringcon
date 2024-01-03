'use client';

import MainPage from './comps/MainPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './global.css';
import Description from './Description';

export default function Home() {

  return (
      <main className="main main-container">
        <Description />
        <MainPage />
      </main>
  );
}
