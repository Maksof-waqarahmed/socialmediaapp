import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCY16_IV9-1dxKS47Tg_hXpkMxj4AmzR8M",
  authDomain: "social-media-app-82a7e.firebaseapp.com",
  projectId: "social-media-app-82a7e",
  storageBucket: "social-media-app-82a7e.appspot.com",
  messagingSenderId: "831870041008",
  appId: "1:831870041008:web:f186432657e736cc2b3475"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const fbAuthProvider = new FacebookAuthProvider();

export async function register(userInfo) {
  try {
    const { firstName, lastName, username, email, gender, password } = userInfo;

    await createUserWithEmailAndPassword(auth, email, password);

    await addDoc(collection(db, "users"), {
      firstName,
      lastName,
      username,
      email,
      gender
    });

    console.log("Registration successful");
    alert("Successfully registered!");
  } catch (error) {
    console.error("Error during registration:", error);
    alert(error.message);
  }
}

export async function login(userInfo) {
  try {
    const { email, password } = userInfo;

    await signInWithEmailAndPassword(auth, email, password);

    console.log("Login successful");
    alert("Logged In Successfully");
  } catch (error) {
    console.error("Login error:", error);
    alert(error.message);
  }
}

export async function postAds(itemInfo) {
  console.log(itemInfo);
  try {
    const { image, caption, location } = itemInfo;
    const storageRef = ref(storage, `images/${image.name}`);
    await uploadBytes(storageRef, image);
    const imgUrl = await getDownloadURL(storageRef);
    await addDoc(collection(db, "userItem"), {
      imgUrl,
      caption,
      location
    });
    alert("Post successfully!");
  } catch (e) {
    alert(e.message);
  }
}

export const getData = async () => {
  const postAds = []
  const querySnapshot = await getDocs(collection(db, "userItem"));
  querySnapshot.forEach((doc) => {
    const dat = doc.data()
    dat.id = doc.id
    postAds.push(dat)
  });
  return postAds
}

export const getUsers= async () => {
  const users = []
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    const dat = doc.data()
    dat.id = doc.id
    users.push(dat)
  });
  return users
}


export async function updateData(e) {
  console.log("e:", e);

  try {
    if (!e.image) {
      throw new Error("Please select an image");
    }

    // If there's an old image, update it
    if (e.oldImage) {
      // Delete the existing profile image from storage
      const oldImageRef = ref(storage, e.oldImage);
      await deleteObject(oldImageRef);
      console.log("Old image deleted:", e.oldImage);

      // Update the existing document with the new profile image URL
      const userRef = doc(db, "users", e.uid);
      await updateDoc(userRef, { image: e.url }); // Assuming you're passing the new image URL as 'e.url'
      console.log("User document updated with new profile image URL");
    } else {
      // If there's no old image, it means it's a new user or the user didn't have an image before
      // Upload the new profile image to storage
      const storageRef = ref(storage, `profile image/${e.image.name}`);
      await uploadBytes(storageRef, e.image);
      const url = await getDownloadURL(storageRef);
      console.log("URL:", url);

      // Add a new document with the updated user data including the new profile image URL
      await addDoc(collection(db, "users"), {
        firstname: e.firstname,
        lastname: e.lastname,
        email: e.email,
        image: url
      });
      console.log("New user document added");
    }

    alert("Profile is updated");

  } catch (error) {
    console.error("Error updating profile:", error.message);
    alert("Profile update failed: " + error.message);
  }
}




export const FacebookAuth = async () => {
  const fbAuth = signInWithPopup(auth, fbAuthProvider);
  return fbAuth;
}