import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// components
import ContentEditor from "../components/ui/ContentEditor";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const NewPost = () => {
  const navigate = useNavigate();
  const [postDetails, setPostDetails] = useState({
    title: "",
    summary: "",
    image: "",
    content: "",
  });

  const createNewPost = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set("title", postDetails.title);
    data.set("summary", postDetails.summary);
    data.set("file", postDetails.image[0]);
    data.set("content", postDetails.content);
    axios
      .post("/api/post/new", data, { withCredentials: true })
      .then((post) => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h1>new post page</h1>
      <form
        action=''
        className='flex flex-col gap-2'
        onSubmit={(e) => createNewPost(e)}>
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

export default NewPost;
