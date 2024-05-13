import { useState, useEffect } from 'react';
import '../style/friendRequest.css'
import { auth, getUsers } from '../config/firebase';

function FriendReq() {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [pendingUsers, setPendingUsers] = useState([]);

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
                const filteredUsers = fetchedUsers.filter(user => user.email !== authUser.email);
                setUsers(filteredUsers);
                console.log("Filtered Users", filteredUsers);
            }
        } catch (error) {
            // Handle error from getUsers() function
            console.error("Error fetching users:", error);
        }
    };

    const handleFollowBtn = (userId) => {
        // Show alert
        alert("Request Sent Successfully");
        
        // Update pending users state
        setPendingUsers((prevPendingUsers) => [...prevPendingUsers, userId]);
    };


    return (
        <div className='main_div'>
            <div className='user_div'>
                <div className='round_div'>
                    <img src='https://firebasestorage.googleapis.com/v0/b/social-media-app-82a7e.appspot.com/o/profile%20image%2FWhatsApp%20Image%202024-05-03%20at%202.51.48%20AM.jpeg?alt=media&token=18dbd4a9-dc7a-43eb-a02f-76f207f71388' alt="Profile" />
                </div>
                <div className='userName_div'>
                    <p className='userName'>Waqar Ahmed</p>
                </div>
                <div className='account_switch_div'>
                    <p>switch</p>
                </div>
            </div>
            <div>
                <p>Suggested for you</p>
            </div>
            {users && users.map((user) => (
                <div className='user_div' key={user.id}>
                    <div className='round_div'>
                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuGFjsxZCvbMuKnsJHFywAKXzJh6SsPWVsifY_z36wVT9p38WQ3IQPDPDjhFPDyxv6YQY&usqp=CAU' alt="Profile" />
                    </div>
                    <div className='userName_div'>
                        <p>{user.firstName + " " + user.lastName}</p>
                    </div>
                    <div className='account_follow_div'>
                        {pendingUsers.includes(user.id) ? (
                            <button style={{ color: 'gray' }}>Pending</button>
                        ) : (
                            <button onClick={() => handleFollowBtn(user.id)}>Follow</button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default FriendReq;
