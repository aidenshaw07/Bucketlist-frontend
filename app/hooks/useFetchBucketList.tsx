"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import "../style/useFetchBucketList.scss";
import { useStoreForBucketListPage } from "@/store/useStore";

interface IBucketListItemResponse {
  description: string;
  title: string;
  userId: string;
  __v: number;
  _id: string;
}

export const useFetchBucketList = () => {
  const { userId, userName } = useAuth();
  const [bucketListItems, setBucketListItems] = useState([]) as any;
  const {
    title,
    description,
    editingItemId,
    updatedTitle,
    updatedDescription,
    setTitle,
    setDescription,
    setEditingItemId,
    setUpdatedTitle,
    setUpdatedDescription,
  } = useStoreForBucketListPage();

  // Fetch bucket list items for a user

  const getBucketListItemsForAUser = async () => {
    if (!userId) {
      return;
    }
    const url = `http://localhost:5000/bucketlist/user/${userId}`;
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setBucketListItems(response.data);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  // Create a bucket list item

  const createBucketListItem = async () => {
    if (!title || !description) {
      alert("Please provide a title and description");
      return;
    }
    const url = "http://localhost:5000/bucketlist";
    let data = {};
    try {
      const response = await axios.post(
        url,
        {
          title,
          description,
          userId,
          userName,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        data = response.data;
      } else {
        throw new Error("Failed to create bucket list item");
      }
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      setTitle("");
      setDescription("");
      setBucketListItems([...bucketListItems, data]);
    }
  };

  const handleTitleChange = (event: any) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event: any) => {
    setDescription(event.target.value);
  };

  // Delte a bucket list item

  const handleDeleteItem = async (itemId: string) => {
    const url = `http://localhost:5000/bucketlist/${itemId}`;
    try {
      const response = await axios.delete(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status !== 200) {
        const errorData = response.data;
        throw new Error(
          errorData.message || "Failed to delete bucket list item"
        );
      }
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      setBucketListItems(
        bucketListItems.filter(
          (item: IBucketListItemResponse) => item._id !== itemId
        )
      );
    }
  };

  // Update a bucket list item

  const handleUpdateItem = async (itemId: string) => {
    const url = `http://localhost:5000/bucketlist/${itemId}`;

    try {
      const response = await axios.put(url, {
        title: updatedTitle,
        description: updatedDescription,
      });

      // Handle the successful update
      console.log("Item updated:", response.data);
      setBucketListItems((prevItems) => {
        console.log("prevItems:", prevItems);
        const updatedItems = prevItems.map((item) => {
          if (item._id === itemId) {
            return {
              ...item,
              title: updatedTitle,
              description: updatedDescription,
            };
          }
          return item;
        });
        return updatedItems;
      });
      // Reset the editing state and clear the updated values
      setEditingItemId("");
      setUpdatedTitle("");
      setUpdatedDescription("");
    } catch (error) {
      // Handle the error
      console.error("Failed to update item:", error);
    }
  };

  // // sort bucket list items by creation date
  // bucketListItems?.sort((a: any, b: any) => {
  //   return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  // });

  const renderBucketListItems = bucketListItems
    ?.sort((a: any, b: any) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    })
    .map((item: any, index) => {
      const isEditing = editingItemId === item._id; // Check if the item is currently being edited

      return (
        <div className="render-bucket-list-items" key={index}>
          {isEditing ? (
            // Render editable text fields if item is being edited
            <div>
              <input
                type="text"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
              />
              <input
                type="text"
                value={updatedDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}
              />
            </div>
          ) : (
            // Render title and description as text if item is not being edited
            <div>
              <h3>username: {item.userName}</h3>
              <h4>Bucket List Title: {item.title}</h4>
              <p>Bucket List Description: {item.description}</p>
            </div>
          )}

          <div className="update-delete-buttons">
            {isEditing ? (
              // Render update and cancel buttons if item is being edited
              <div>
                <button
                  hidden={item.userId === userId ? false : true}
                  onClick={() => handleUpdateItem(item._id)}
                >
                  Save
                </button>
                <button
                  hidden={item.userId === userId ? false : true}
                  onClick={() => cancelEditing()}
                >
                  Cancel
                </button>
              </div>
            ) : (
              // Render update and delete buttons if item is not being edited
              <div>
                <button
                  hidden={item.userId === userId ? false : true}
                  onClick={() => startEditing(item._id)}
                >
                  Update Item
                </button>
                <button
                  hidden={item.userId === userId ? false : true}
                  onClick={() => handleDeleteItem(item._id)}
                >
                  Delete Item
                </button>
              </div>
            )}
          </div>
        </div>
      );
    });

  const startEditing = (itemId: string) => {
    // Set the editing state and initialize the updated title and description values
    const item = bucketListItems.find((item) => item._id === itemId);
    setEditingItemId(itemId);
    setUpdatedTitle(item?.title || "");
    setUpdatedDescription(item?.description || "");
  };

  const cancelEditing = () => {
    // Clear the editing state and reset the updated title and description values
    setEditingItemId("");
    setUpdatedTitle("");
    setUpdatedDescription("");
  };

  useEffect(() => {
    getBucketListItemsForAUser();
  }, [userId]);

  return {
    bucketListItems,
    createBucketListItem,
    handleTitleChange,
    handleDescriptionChange,
    renderBucketListItems,
    title,
    description,
  };
};
