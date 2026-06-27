import React, { useState } from 'react';

const Navbar = ({ backward }) => {
  const [title, setTitle] = useState('');

  const submitHandle = (e) => {
    e.preventDefault();

    backward(title);
    setTitle('');
  };

  return (
    <div className="w-full h-[10%] p-4 bg-zinc-700 flex justify-between items-center">
      <h1>hello</h1>

      <form onSubmit={submitHandle}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-4 rounded-2xl"
          type="text"
          placeholder="Enter anything"
        />
      </form>
    </div>
  );
};

export default Navbar;