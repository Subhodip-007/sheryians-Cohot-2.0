import React, { useEffect, useState } from 'react';
import BackGround from './components/backGround';
import Overlay from './components/overlay';
import Loading from './components/loading';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // show loader for 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='h-screen w-full relative bg-zinc-800 selection:text-amber-500'>
      {loading && <Loading />}

      <BackGround />
      <Overlay />
    </div>
  );
};

export default App;