'use client'
import { useState, useEffect } from "react";
import { auth, getUsers, updateData } from '../config/firebase';

function UpdateProfileImg({ isOpen, onClose }) {

    const [firstname, setFirstName] = useState()
    const [lastname, setLastName] = useState()
    const [email, setEmail] = useState()
    const [gender, setGender] = useState()
    const [image, setImage] = useState()
    const [uid, setUid] = useState()

    const [user, setUser] = useState();
    const [currentUser, setCurrentUser] = useState(null);

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

    const fetchUsers = async (authUser) => {
        try {
            const fetchedUsers = await getUsers();
            if (authUser) {
                const currentLoggedInUser = fetchedUsers.find(user => user.email === authUser.email);
                setUser(currentLoggedInUser);
                console.log("Current Loggedin User",currentLoggedInUser)
            }
        } catch (error) {
            // Handle error from getUsers() function
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        if (user) {
            setEmail(user.email);
            setFirstName(user.firstname);
            setLastName(user.lastname);
            setGender(user.gender);
            setUid(user.id);
        }
    }, [user]);

    if (!isOpen) return null;
    console.log("Profile Image", image)

   
    const updateProfile = async (event) => {
        console.log({
          firstname,
          lastname,
          email,
          gender,
          image,
        });
      
        try {
          if (!image) {
            return alert("Please Select Image");
          }
          await updateData({
            firstname, // Adjust key names here
            lastname,   // Adjust key names here
            email,
            gender,
            image,
            uid,
          });
          console.log("Profile Image Update Successfully");
          // Redirect to another page, show a success message, etc.
        } catch (error) {
          alert("Registration failed: " + error.message);
        }
      };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg w-1/2 relative">
                <button className="absolute top-2 right-2 text-white-500" onClick={onClose}>Close</button>

                <div className="mb-4">
                    <label htmlFor="media" className="block text-sm font-medium text-gray-700">Upload Profile Image</label>
                    <input type="file" name="media" id="media" className="mt-1 p-2 w-full border border-gray-300 rounded-md" onChange={(e) => setImage(e.target.files[0])} />
                </div>
                <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" onClick={() => { updateProfile()}}>Update</button>
            </div>
        </div>
    )
}

export default UpdateProfileImg;