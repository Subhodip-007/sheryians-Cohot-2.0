import React, { useState } from 'react';
import Card from './components/card';

const App = () => {
  const [Name, setName] = useState("");
  const [UserDescp, setUserDescp] = useState("");
  const [Imgurl, setImgurl] = useState("");
  const [UserRole, setUserRole] = useState("");
    const localdata=JSON.parse(localStorage.getItem('all-users')) || []
  const [allUsers, setallUsers] = useState(localdata);




 const handledelete=(idx)=>{
  console.log("delete")
  let copyUser=[...allUsers]
  copyUser.splice(idx,1)
  setallUsers(copyUser);
    localStorage.setItem(
    'all-users',
    JSON.stringify(copyUser)
  );
 }
  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      Name,
      Description: UserDescp,
      url: Imgurl,
      Role: UserRole,
    };

    let updateduser= [...allUsers, newUser];
    setallUsers(updateduser)
    localStorage.setItem('all-users',JSON.stringify(updateduser))
    setName("");
    setUserDescp("");
    setImgurl("");
    setUserRole("");
  };

  return (
    <div className="min-h-screen w-full bg-gray-700 flex flex-col lg:flex-row items-center justify-center gap-8 p-4 lg:p-8">

      {/* Form Section */}
      <div className="w-full lg:w-[45%] max-w-xl rounded-3xl bg-amber-700 p-6 lg:p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          <div className="flex flex-col gap-2">
            <label className="text-xl font-bold text-amber-50 font-mono">
              Name
            </label>
            <input
              value={Name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-2xl bg-amber-50 p-4 outline-none"
              type="text"
              placeholder="Enter name"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xl font-bold text-amber-50 font-mono">
              Description
            </label>
            <input
              value={UserDescp}
              onChange={(e) => setUserDescp(e.target.value)}
              className="w-full rounded-2xl bg-amber-50 p-4 outline-none"
              type="text"
              placeholder="Enter description"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xl font-bold text-amber-50 font-mono">
              Profile URL
            </label>
            <input
              value={Imgurl}
              onChange={(e) => setImgurl(e.target.value)}
              className="w-full rounded-2xl bg-amber-50 p-4 outline-none"
              type="text"
              placeholder="Enter image URL"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xl font-bold text-amber-50 font-mono">
              Role
            </label>
            <input
              value={UserRole}
              onChange={(e) => setUserRole(e.target.value)}
              className="w-full rounded-2xl bg-amber-50 p-4 outline-none"
              type="text"
              placeholder="Enter role"
            />
          </div>

          <button
            className="mt-4 rounded-2xl bg-amber-100 p-4 font-mono font-semibold transition-transform active:scale-95"
            type="submit"
          >
            Create User
          </button>

        </form>
      </div>

      {/* Users Section */}
      <div className="w-full lg:w-[45%] h-[500px] lg:h-[600px] rounded-3xl bg-amber-50 p-6 lg:p-8 overflow-y-auto">

        <h1 className="mb-6 text-3xl font-bold font-mono">
          Users
        </h1>

        <div className="flex flex-col gap-4">
          {allUsers.map((elem, idx) => (
           <Card idx={idx} key={idx} elem={elem} handledelete={handledelete}/>
    
          ))}
        </div>

      </div>

    </div>
  );
};

export default App;