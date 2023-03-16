import React from 'react';
import AppRouter from './components/AppRouter';
import Login from './components/Login';
// import Login from './test/test';

export default function App() {

  return (
    <section className="App">
        {/* <AppRouter /> */}
        <Login/>
      {/* <div>
            <Login />
          </div> */}
    </section>
  );
};
