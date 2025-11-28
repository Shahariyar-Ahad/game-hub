import React, { useContext, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { updateProfile } from 'firebase/auth';
import auth from '../Firebase/Firebase.config';

const Profile = () => { 
    const {user,setUser}=useContext(AuthContext)
    const[isOpen, setIsOpen]=useState(false) 
    const handleOpenForm =() => {
      setIsOpen(!isOpen)
    } 
    console.log(isOpen) 
    const handleUpdate =(e) => {
      e.preventDefault()
      const name= e.target.name.value;
      const photoUrl=e.target.photoUrl.value
      
      updateProfile(auth.currentUser, {
  displayName: name, photoURL: photoUrl 
}).then(() => {
  setUser({...user, photoURL: photoUrl, displayName:name })
 
 
}).catch((error) => {
  // An error occurred
  // ...
  console.log(error)
});
    }
    return (
        <div className='flex  flex-col justify-center items-center m-5 border bg-white rounded-4xl w-[500px] mx-auto'>
          <div className="avatar">
  <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ">
    <img src={user?.photoURL} />
  </div>
</div>  
<p>{user?.displayName}</p>
<p>{user?.email}</p>
<button className='btn' onClick={handleOpenForm}>Update  profile</button>
{
    isOpen && (
        <form onSubmit={handleUpdate} className="fieldset   rounded-box w-xs border p-4 m-2">
  <legend className="fieldset-legend text-2xl text-black">Your  Profile</legend>

  <label className="label">Name</label>
  <input defaultValue={user.displayName} type="text" className="input bg-yellow-100" placeholder="Name" name='name' />
  <label className="label">Email</label>
  <input defaultValue={user.email} type="email" className="input bg-yellow-100" placeholder="Email" name='email' />

  
  <label className="label">photo</label>
  <input defaultValue={user.photoURL} type="text" className="input bg-yellow-100" placeholder="your photo" name='photoUrl' />

  <button className="btn btn-neutral mt-4">save</button>
</form>
    )
}
        </div>
    );
};

export default Profile;