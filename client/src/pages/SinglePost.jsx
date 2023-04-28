import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import axios from "axios";
import DOMPurify from "dompurify";

// contexts
import { UserContext } from "../contexts/UserContext";

const SinglePost = () => {
  const { currentUser } = useContext(UserContext);
  const { post_id } = useParams();
  const [post, setPost] = useState();
  useEffect(() => {
    axios
      .get(`/api/post/${post_id}`)
      .then((postData) => setPost(postData.data))
      .catch((err) => console.log(err));
  }, [post_id]);

  console.log(post);
  return (
    <>
      {currentUser?.username === post?.author?.username && (
        <Link
          to={`/post/edit/${post_id}`}
          className='bg-yellow-200 py-2 w-full border-2 border-black rounded-md text-center'>
          Edit Post
        </Link>
      )}
      <h1 className='font-bold text-3xl text-center'>{post?.title}</h1>
      <time className='text-sm text-center'>
        Posted @{" "}
        {post && format(new Date(post?.createdAt), "hh:mm aa MMM d, yyyy")}
      </time>
      <h2 className='font-semibold text-center'>
        Posted by: {post && post.author.username}
      </h2>
      <img
        src={`http://localhost:8000/${post?.image}`}
        alt=''
        className='w-full max-h'
      />
      {post && (
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post?.content),
          }}
        />
      )}
    </>
  );
};

export default SinglePost;
