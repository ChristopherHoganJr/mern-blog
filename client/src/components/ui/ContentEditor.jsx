import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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
    ["link"],
    ["clean"],
  ],
};

const ContentEditor = ({ value, setValue }) => {
  return (
    <ReactQuill
      value={value.content}
      onChange={(e) => setValue({ ...value, content: e })}
      theme={"snow"}
      modules={modules}
    />
  );
};

export default ContentEditor;
