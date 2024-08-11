"use client";
import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { apiSystem } from "@/api";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const InputOptionPost = (props) => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([]);

  const getPost = async () => {
    try {
      const response = await apiSystem.get(`/post`);
      const postData = response.data?.posts;
      const postOptions = postData.map((r) => ({
        label: r.post,  // Nombre del post
        value: r.pk_post, // ID del post
      }));
      setPosts(postOptions);
    } catch (error) {
      console.error("Error fetching posts", error);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  const handleChange = (e) => {
    setSelectedPost(e.value);
    props?.onSelect(e.value);
  };

  const selectedPostTemplate = (option, props) => {
    if (option) {
      return <span>{option.label}</span>;
    }
    return <span>{props.placeholder}</span>;
  };

  const postOptionTemplate = (option) => {
    return (
      <div className="flex align-items-center">
        <span>{option.label}</span>
      </div>
    );
  };

  return (
    <div className="card flex justify-content-center">
      <Dropdown
        value={selectedPost || props?.name}
        onChange={handleChange}
        options={posts}
        optionLabel="label"
        placeholder="Seleccione el post"
        className="w-full md:w-20rem"
        filter
        valueTemplate={selectedPostTemplate}
        itemTemplate={postOptionTemplate}
      />
    </div>
  );
};

export default InputOptionPost;
