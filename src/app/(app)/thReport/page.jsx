"use client";
import { apiSystem } from "@/api";
import React, { useEffect, useState } from "react";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { ReportTable } from "./components";


export const thReportPage = () => {
  const [dataTh, setDataTh] = useState([]);
  const [thInventorys, setThInventorys] = useState([]);
  const [countUsers, setUsers] = useState([]);
  const [countAreas, setAreas] = useState([]);
  const [countPosts, setPosts] = useState([]);
  const [countCollaborators, setCountCollaborators] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const [refetchTh, setRefetchTh] = useState(false);

  const getThReport = async () => {
    try {
      const response = await apiSystem.get(`/thReport`);
      if (response?.data?.thReports) {
        const dataTh = response.data.thReports.map((a) => {
          // Extract the product information from the countInventory field
          let userInfo = null;
          let productInfo = null;
          let collaboratorInfo = null;
          let areaInfo = null;
          let postInfo = null;
          if (a.pk_thinventory) {
            const matchingInventory = thInventorys.find(inventory => inventory.pk_thinventory === a.pk_thinventory);
            if (matchingInventory) {
              productInfo = matchingInventory.product;
            }
          }
          if (a.pk_user) {
            const matchingUser = countUsers.find(user => user.pk_user === a.pk_user);
            if (matchingUser) {
              userInfo = matchingUser.name_user;
            }
          }
          if (a.pk_collaborator) {
            const matchingCollaborator = countCollaborators.find(collaborator => collaborator.pk_collaborator === a.pk_collaborator);
            if (matchingCollaborator) {
              collaboratorInfo = matchingCollaborator.name;
            }
          }
          if (a.pk_area) {
            const matchingArea = countAreas.find(area => area.pk_area === a.pk_area);
            if (matchingArea) {
              areaInfo = matchingArea.area;
            }
          }
          if (a.pk_post) {
            const matchingPost = countPosts.find(post => post.pk_post === a.pk_post);
            if (matchingPost) {
              postInfo = matchingPost.post;
            }
          }
          // Format the date
          const formatDateString = (dateString) => {
            const date = new Date(dateString);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
          };

          // Assuming 'date' is the field name in your data
          const formattedDate = a.d_date ? formatDateString(a.d_date) : null;

          return {
            ...a,
            thInventory: productInfo,
            user: userInfo,
            collaborator: collaboratorInfo,
            area: areaInfo,
            post: postInfo,
            formattedDate: formattedDate
          };
        });
        setDataTh(dataTh);
        console.log("que me traes", dataTh);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getThReport();
  }, [refetchTh, thInventorys, countUsers, countCollaborators, countAreas, countPosts]); // Added countUsers as a dependency to ensure it is updated

  const getProduct = async () => {
    try {
      const response = await apiSystem.get(`/thInventory`);
      if (response?.data?.thInventorys) {
        setThInventorys(response.data.thInventorys);
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
      <ReportTable thReports={dataTh} onRefetch={setRefetchTh} />
    </div>
  );
};

export default thReportPage;
