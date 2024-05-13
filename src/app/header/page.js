'use client'

import React, { useState, useEffect } from 'react';

import UpdateProfileImg from '../updateImg/page';

import { getUsers, auth } from '../config/firebase';

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState();
  const [currentUser, setCurrentUser] = useState(null);

  const fetchUsers = async (authUser) => {
    try {
      const fetchedUsers = await getUsers();
      if (authUser) {
        const currentLoggedInUser = fetchedUsers.find(user => user.email === authUser.email);
        setUser(currentLoggedInUser);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setCurrentUser(authUser);
        fetchUsers(authUser); // Call fetchUsers with authUser
      } else {
        setCurrentUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const fetchedUsers = await getUsers();
          const currentLoggedInUser = fetchedUsers.find(user => user.email === currentUser.email);
          setUser(currentLoggedInUser);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser(); // Call fetchUser when the component mounts
  }, [isModalOpen]);

  const openPopup = () => {
    setIsModalOpen(true);
  };

  const closePopup = () => {
    setIsModalOpen(false);
  };
  return (
    <header className="" style={{ position: 'fixed', top: '0', zIndex: '1000', backgroundColor: 'white', height: '140px' }}>
      <div className="flex gap-[25px] m-[20px]  max-w-[800px] flex-wrap">

        <div className="relative">
          {user && !user.image ? <img
            className="h-14 w-14 rounded-full p-[1.5px] border-green-500 border-2 cursor-pointer object-contain hover:scale-110 transition-transform duration-200 ease-out"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuGFjsxZCvbMuKnsJHFywAKXzJh6SsPWVsifY_z36wVT9p38WQ3IQPDPDjhFPDyxv6YQY&usqp=CAU"
            alt=""
            onClick={openPopup}
          /> :
            <img
              className="h-14 w-14 rounded-full p-[1.5px] border-green-500 border-2 cursor-pointer object-contain hover:scale-110 transition-transform duration-200 ease-out"
              src={user && user.image}
              alt=""
              onClick={openPopup}
            />}
          <UpdateProfileImg isOpen={isModalOpen} onClose={closePopup}>
            {/* Content of your modal goes here */}
            {/* <UpdateProfileImg /> */}
          </UpdateProfileImg>
        </div>
        <img
          className="h-14 w-14 rounded-full p-[1.5px] border-red-500 border-2
        cursor-pointer object-contain hover:scale-110 
        transition-transform
        duration-200 ease-out"
          src="https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg"
          alt=""
        />

        <img
          className="h-14 w-14 rounded-full p-[1.5px] border-red-500 border-2
        cursor-pointer object-contain hover:scale-110 
        transition-transform
        duration-200 ease-out"
          src="https://play-lh.googleusercontent.com/LeX880ebGwSM8Ai_zukSE83vLsyUEUePcPVsMJr2p8H3TUYwNg-2J_dVMdaVhfv1cHg"
          alt=""
        />

        <img
          className="h-14 w-14 rounded-full p-[1.5px] border-red-500 border-2
        cursor-pointer object-contain hover:scale-110 
        transition-transform
        duration-200 ease-out"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW4AdHQ5lVM_cFZYu4TogVtmEfYH4iHSGwYQ&usqp=CAU"
          alt=""
        />

        <img
          className="h-14 w-14 rounded-full p-[1.5px] border-red-500 border-2
        cursor-pointer object-contain hover:scale-110 
        transition-transform
        duration-200 ease-out"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL6vieIfIc6t6g_G4xlEUeWNyFC-_sTLmhvYutWBi_NJUKEepBrV4rovxH16NUfU4VU8s&usqp=CAU"
          alt=""
        />

        <img
          className="h-14 w-14 rounded-full p-[1.5px] border-red-500 border-2
        cursor-pointer object-contain hover:scale-110 
        transition-transform
        duration-200 ease-out"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt_4M3i4WkXG3tgeuMMA4G5C8F9iuPwz6ezg&usqp=CAU"
          alt=""
        />

        <img
          className="h-14 w-14 rounded-full p-[1.5px] border-red-500 border-2
        cursor-pointer object-contain hover:scale-110 
        transition-transform
        duration-200 ease-out"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNy0Xql4v2JXMCpb5qyCItOBMIczNL_Zj4P7Xk0A5VVg&s"
          alt=""
        />

        <img
          className="h-14 w-14 rounded-full p-[1.5px] border-red-500 border-2
        cursor-pointer object-contain hover:scale-110 
        transition-transform
        duration-200 ease-out"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKMgeLJPfDoA1X1CWNtsL7s9F47GSREE-_xg&usqp=CAU"
          alt=""
        />

      </div>
      <div className="flex items-center justify-evenly">
        <p className="text-xs w-14 truncate text-center">{user && user.firstname + " " + user.lastname}</p>
        <p className="text-xs w-14 truncate text-center">Ahad Ali</p>
        <p className="text-xs w-14 truncate text-center">Hania</p>
        <p className="text-xs w-14 truncate text-center">Umer</p>
        <p className="text-xs w-14 truncate text-center">Kashif</p>
        <p className="text-xs w-14 truncate text-center">Ilyas</p>
        <p className="text-xs w-14 truncate text-center">Mrs Waqar</p>
        <p className="text-xs w-14 truncate text-center">Aqdas</p>

      </div>
    </header>
  )
}

export default Header;