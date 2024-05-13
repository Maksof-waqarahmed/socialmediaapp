import React, { useState, useEffect } from "react";
import "../style/instagramCard.css";
import { getData, auth, getUsers } from "../config/firebase";
import { AiFillLike } from "react-icons/ai";
import { FaCommentDots } from "react-icons/fa";
import { TbLocationShare } from "react-icons/tb";

const InstagramPostcard = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null); // Initialize user state as null
  const [profileUpdate, setProfileUpdate] = useState(false); // State to track profile picture update

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        fetchUserData(authUser); // Call fetchUserData with authUser
      } else {
        setUser(null); // Reset user state if no authenticated user
      }
    });
    return () => unsubscribe();
  }, [profileUpdate]); // Trigger useEffect when profileUpdate changes

  useEffect(() => {
    if (user) {
      getPosts(); // Fetch posts if user data is available
    }
  }, [user]); // Trigger when user state changes

  const fetchUserData = async (authUser) => {
    try {
      const fetchedUsers = await getUsers();
      if (authUser) {
        const currentLoggedInUser = fetchedUsers.find(
          (user) => user.email === authUser.email
        );
        setUser(currentLoggedInUser); // Set user state with fetched user data
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const getPosts = async () => {
    const getPost = await getData();
    setPosts(getPost);
    console.log(getPost);
  };

  // Function to handle profile picture update
  const handleProfileUpdate = () => {
    // Toggle profileUpdate state to trigger useEffect
    setProfileUpdate((prev) => !prev);
  };

  return (
    <div className="card-container" style={{ paddingTop: "150px" }}>
      {posts.map((post, index) => (
        <div key={index} style={{ marginTop: "20px", maxWidth: "600px", margin: "auto", marginTop: '50px' }}>
          <div className="card" style={{ marginBottom: '20px' }}>
            {/* Header */}
            <div className="card-header">
              {user && !user.image ?<img
                src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                style={{ width: "50px", height: "50px", borderRadius: "50%", marginRight: "10px" }}
                alt=""
              />: <img
              src={user && user.image}
              style={{ width: "50px", height: "50px", borderRadius: "50%", marginRight: "10px" }}
              alt=""
            />}
              <div>
                <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '900px' }}>{user && user.firstname + " " + user.lastname}</h3>
                <p style={{ fontSize: '14px', margin: 0 }}>{post.location}</p> {/* Adjusted size and margin */}
              </div>
            </div>
            {/* Body */}
            <div className="card-body">
              <img src={post.imgUrl} className="card-img-top" alt="Post" style={{ borderRadius: "12px", marginBottom: "10px" }} />
              <p className="card-text" style={{ margin: "0", fontSize: "16px" }}>{post.caption}</p>
            </div>
            {/* Actions */}
            <div className="card-actions">
              <button className="action-btn"><AiFillLike className="action" /></button>
              <button className="action-btn"><FaCommentDots className="action" /></button>
              <button className="action-btn"><TbLocationShare className="action" /></button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InstagramPostcard;
