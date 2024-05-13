'use client'
import { useState } from 'react';
import { postAds } from '../config/firebase';
import { useRouter } from 'next/navigation';

import '../style/addPost.css'

const AddPost = () => {
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null);

  const router = useRouter()

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const handleLocationChange = (e) => {
    console.log(e.target.value, "location")
    setLocation(e.target.value);
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    console.log(file, "File")
    setImage(file);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      await postAds({ caption, image, location });
      alert("Post submitted successfully!");
      setCaption('');
      setLocation(''); 
      setImage(null);
      router.push('/dashboard')
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the post.");
    }
  };

  return (
    <div className='adddPost_div'>
      <form onSubmit={handleSubmit}>
      <h1 className='add_heading'>Add New Post</h1>
        <div>
          <input
            type="text"
            id="caption"
            placeholder='Caption'
            value={caption}
            onChange={handleCaptionChange}
          />
        </div>
        <div>
          <input
            type="text"
            id="location"
            placeholder='Location'
            value={location}
            onChange={handleLocationChange}
          />
        </div>
        <div>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit" onChange={handleSubmit} >Submit</button>
      </form>
    </div>
  );
};

export default AddPost;