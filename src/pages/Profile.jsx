import React from 'react'
import { useState } from 'react';
import {getAuth, updateProfile} from "firebase/auth";
import { useNavigate } from 'react-router';
import {toast} from 'react-toastify';
import {db} from "../firebase"
import { doc,updateDoc } from "firebase/firestore"; // Import Firestore functions

export default function Profile() {
  const auth =getAuth();
  const [formData,setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const [changeDetails, setChangeDetails] = useState(false);
  const navigate = useNavigate();
  function onChange (e) {
    setFormData((prevState)=> ({
      ...prevState,
      [e.target.id] : e.target.value,
    })
    );
  }
  async function onSubmit () {
    try{
        if(auth.currentUser.displayName !== name){
          await updateProfile(auth.currentUser,{
            displayName:name,
          });

          //firestore
          const docRef =doc(db,"users",auth.currentUser.uid)
          await updateDoc(docRef,{
            name,
          });
        }
        toast.success('profile details updated')
    }catch(error){
      toast.error("could not upadate profile details")
    }

  }
  const{name,email} =formData;
  function onLogout(){
    auth.signOut();
    navigate("/");
  }
  return (
    <div className='w-full md:w-[50%] mt-6 px-3'>
    <section className='max-w-6xl mx-auto flex justify-center items-center flex-col'>
      <h1 className='text-3xl text-center mt-6 font-bold'> My Profile</h1>
      <div>
        <form>
          < input type="text" id="name" value={name} disabled={!changeDetails} onChange={onChange} className={`mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out ${changeDetails && "bg-red-200 focus:bg-red-200"}`}/>
          < input type="email" id="email" value={email} disabled className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"/>
          <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6'> 
            <p className='flex items-center'> Do you want to change your name?<span onClick={() => {changeDetails && onSubmit(); setChangeDetails((prevState) => !prevState);}} className='text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer'> 
            {changeDetails ? "apply change" : "Edit"}
            </span></p>
            <p onClick={onLogout} className='text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out cursor-pointer'> Sign Out</p>
          </div>
        </form>
      </div>
      </section>      
    </div>
  )
}
