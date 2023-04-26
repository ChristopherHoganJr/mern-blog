import React from "react";

const EntryPreview = () => {
  return (
    <div className='border-2 border-black p-2 rounded-md'>
      <div className='flex justify-between gap-2 mb-1'>
        <h3 className='font-bold'>Chris Hogan</h3>
        <time dateTime='2023-04-25 20:00' className='text-sm my-auto'>
          2023-04-25 20:00
        </time>
      </div>
      <div className='mb-2'>
        <img
          src='https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'
          alt='Norway'
          className='max-w-full rounded-md'
        />
      </div>
      <div className='py-2 px-2'>
        <h2 className='text-xl font-bold text-center mb-1'>
          Contrary to popular belief, Lorem Ipsum is not simply random text.
        </h2>
        <p className='text-center'>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.
        </p>
      </div>
    </div>
  );
};

export default EntryPreview;
