"use client";
import React, { useState, useEffect } from "react";
import { TreeSelect } from "primereact/treeselect";
import { apiSystem } from "@/api";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const InputOptionPost = (props) => {
  const [selectedNodeKey, setSelectedNodeKey] = useState(null);
  const [posts, setPosts] = useState([]); // Estado para almacenar los posts

  const getPost = async () => {
    try {
      const response = await apiSystem.get(`/post`);
      const postData = response.data?.posts;
      // Mapeamos los datos para obtener solo los nombres de los posts
      const postNames = postData.map((r) => ({
        key: r.pk_post,
        label: r.post, // Aquí accedemos al campo "nombre usuario"
      }));
      setPosts(postNames);
    } catch (error) {}
  };

  useEffect(() => {
    getPost();
  }, []);

  const handleChange = async (e) => {
    setSelectedNodeKey(e?.value || null);
    props?.onSelect(e?.value);
  };

  return (
    <div className="card flex justify-content-center">
      <TreeSelect
        value={selectedNodeKey || props?.name}
        onChange={handleChange}
        options={posts}
        selectionMode="single"
        className="md:w-20rem w-full"
        placeholder="Seleccione al usuario"
      />
    </div>
  );
};

export default InputOptionPost;