import React from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const EntryPreview = ({ _id, title, summary, image, author, createdAt }) => {
  return (
    <Link to={`/post/${_id}`} className='border-2 border-black p-2 rounded-md'>
      <div className='flex justify-between gap-2 mb-1'>
        <h3 className='font-bold'>{author.username}</h3>
        <time className='text-sm my-auto'>
          {format(new Date(createdAt), "HH:mm MMM d, yyyy")}
        </time>
      </div>
      <div className='mb-2'>
        <img
          src={`http://localhost:8000/${image}`}
          alt='preview image'
          className='w-full rounded-md'
        />
      </div>
      <div className='py-2 px-2'>
        <h2 className='text-xl font-bold text-center mb-1'>{title}</h2>
        <p className='text-center'>{summary}</p>
      </div>
    </Link>
  );
};

export default EntryPreview;
