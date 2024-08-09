"use client";
import { apiSystem } from "@/api";
import React, { useEffect, useState } from "react";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { ComReportTable } from "./components";


export const comReportPage = () => {
  const [dataCom, setDataCom] = useState([]);
  const [comInventorys, setComInventorys] = useState([]);
  const [comUsers, setUsers] = useState([]);
  const [comAreas, setAreas] = useState([]);
  const [comPosts, setPosts] = useState([]);
  const [comCollaborators, setCountCollaborators] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const [refetchCom, setRefetchCom] = useState(false);

  const getComReport = async () => {

    try {
      const response = await apiSystem.get(`/comReport`);
      if (response?.data?.comReports) {
        const dataCom = response.data.comReports.map((a) => {
          // Extract the product information from the comInventory field
          let userInfo = null;
          let productInfo = null;
          let collaboratorInfo = null;
          let areaInfo = null;
          let postInfo = null;
          if (a.pk_cominventory) {
            const matchingInventory = comInventorys.find(inventory => inventory.pk_cominventory === a.pk_cominventory);
            if (matchingInventory) {
              productInfo = matchingInventory.item;
            }
          }
          if (a.pk_user) {
            const matchingUser = comUsers.find(user => user.pk_user === a.pk_user);
            if (matchingUser) {
              userInfo = matchingUser.name_user;
            }
          }
          if (a.pk_collaborator) {
            const matchingCollaborator = comCollaborators.find(collaborator => collaborator.pk_collaborator === a.pk_collaborator);
            if (matchingCollaborator) {
              collaboratorInfo = matchingCollaborator.name;
            }
          }
          if (a.pk_area) {
            const matchingArea = comAreas.find(area => area.pk_area === a.pk_area);
            if (matchingArea) {
              areaInfo = matchingArea.area;
            }
          }
          if (a.pk_post) {
            const matchingPost = comPosts.find(post => post.pk_post === a.pk_post);
            if (matchingPost) {
              postInfo = matchingPost.post;
            }
          }


          return {
            ...a,
            comInventory: productInfo,
            user: userInfo,
            collaborator:collaboratorInfo,
            area:areaInfo,
            post:postInfo
          };
        });
        setDataCom(dataCom);
        console.log("que me traes", dataCom);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getComReport();
  }, [refetchCom, comInventorys, comUsers, comCollaborators, comAreas, comPosts]); // Added comUsers as a dependency to ensure it is updated

  const getProduct = async () => {
    try {
      const response = await apiSystem.get(`/comInventory`);
      if (response?.data?.comInventorys) {
        setComInventorys(response.data.comInventorys);
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUsers = async () => {
    try {
      const response = await apiSystem.get(`/user`); // Replace `/users` with your actual endpoint
      if (response?.data?.users) {
        setUsers(response.data.users);
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCollaborators = async () => {
    try {
      const response = await apiSystem.get(`/collaborator`); // Replace `/users` with your actual endpoint
      if (response?.data?.collaborators) {
        setCountCollaborators(response.data.collaborators);
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAreas = async () => {
    try {
      const response = await apiSystem.get(`/area`); // Replace `/users` with your actual endpoint
      if (response?.data?.areas) {
        setAreas(response.data.areas);
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getPost = async () => {
    try {
      const response = await apiSystem.get(`/post`); // Replace `/users` with your actual endpoint
      if (response?.data?.posts) {
        setPosts(response.data.posts);
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getProduct();
    getUsers();
    getCollaborators();
    getAreas();
    getPost();
     
  }, [refetch]);

  return (
    <div className="w-full">
    <ComReportTable comReports={dataCom} onRefetch={() => setRefetchCom(true)} />
    </div>
  );
};

export default comReportPage;
