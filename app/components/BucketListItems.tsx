import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";

interface IBucketListItemsResponse {
  description: string;
  title: string;
  userId: string;
  __v: number;
  _id: string;
}

export const BucketListItems = () => {
  const { userId } = useAuth();
  const [bucketListItems, setBucketListItems] = useState([]) as any;
  console.log(bucketListItems);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Fetch bucket list items for a user

  const getBucketListItems = async () => {
    if (!userId) return;
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
    const url = "http://localhost:5000/bucketlist";
    let data = {};
    try {
      const response = await axios.post(
        url,
        {
          title,
          description,
          userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
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

  const deleteBucketListItem = async (itemId: string) => {
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
        bucketListItems.filter((item: any) => item._id !== itemId)
      );
    }
  };

  useEffect(() => {
    getBucketListItems();
  }, [userId]);

  const renderBucketListItems = bucketListItems?.map((item: any, index) => {
    return (
      <div key={index}>
        <h3>Bucket List Title: {item.title}</h3>
        <p>Bucket List Description: {item.description}</p>
        <button onClick={() => deleteBucketListItem(item._id)}>
          Delete Bucket List Item
        </button>
      </div>
    );
  });

  const handleTitleChange = (event: any) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event: any) => {
    setDescription(event.target.value);
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createBucketListItem();
        }}
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={handleDescriptionChange}
        />
        <button type="submit">Create Bucket List</button>
      </form>
      <h2>Bucket List Items:</h2>
      {renderBucketListItems}
    </div>
  );
};
