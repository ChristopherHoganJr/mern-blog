import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

// components
import ContentEditor from "../components/ui/ContentEditor";

const EditPost = () => {
  const { post_id } = useParams();

  const navigate = useNavigate();
  const [postDetails, setPostDetails] = useState({
    title: "",
    summary: "",
    image: "",
    content: "",
  });
  console.log;

  useEffect(() => {
    axios
      .get(`/api/post/${post_id}`)
      .then((postData) => setPostDetails(postData.data))
      .catch((err) => console.log(err));
  }, [post_id]);
  console.log(postDetails);

  const updatePost = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set("author_id", postDetails.author._id);
    data.set("title", postDetails.title);
    data.set("summary", postDetails.summary);
    if (typeof postDetails.image === "string") {
      data.set("image", postDetails.image);
    } else {
      data.set("file", postDetails.image[0]);
    }
    data.set("content", postDetails.content);
    axios
      .put(`/api/post/update/${post_id}`, data, { withCredentials: true })
      .then((post) => {
        console.log(post);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h1>Edit: {postDetails?.title}</h1>
      <form
        action=''
        className='flex flex-col gap-2'
        onSubmit={(e) => updatePost(e)}>
        <div>
          <label htmlFor=''>Post Title</label>
          <input
            type='text'
            placeholder='post title'
            value={postDetails.title}
            onChange={(e) =>
              setPostDetails({ ...postDetails, title: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor=''>Post Summary</label>
          <textarea
            name=''
            id=''
            placeholder='post summary'
            value={postDetails.summary}
            onChange={(e) =>
              setPostDetails({ ...postDetails, summary: e.target.value })
            }></textarea>
        </div>
        <div>
          <label htmlFor=''>Image</label>
          <input
            type='file'
            name=''
            id=''
            onChange={(e) =>
              setPostDetails({ ...postDetails, image: e.target.files })
            }
          />
        </div>
        <div>
          <label htmlFor=''>Post Info</label>
          <ContentEditor value={postDetails} setValue={setPostDetails} />
        </div>
        <button className='py-2 px-6 border-2 border-black rounded-md'>
          Create Post
        </button>
      </form>
    </>
  );
};

export default EditPost;
