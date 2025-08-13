import axios from "axios";

const API_URL = "http://localhost:5000/posts";

export type Post =  {
  id?: number;
  userId: number;
  username: string;
  title: string;
  content: string;
};

// Get all posts
export const fetchPosts = async () => {
    try {
        const res = await axios.get(API_URL);
        return res.data;
        
    } catch (error:any) {
        const errorMessage = (error.response.data && error.response.data.message && error.message ) || error.toString()  
        throw errorMessage
    }
};

// Add a new post
export const createPost = async (newPost: Post) => {
  const res = await axios.post(API_URL, newPost);
  return res.data;
};

export const updatePost = async (updatedPost: Post) => {
  if (!updatedPost.id) throw new Error("Post ID is required for update");
  const res = await axios.put<Post>(`${API_URL}/${updatedPost.id}`, updatedPost);
  return res.data;
};

export const deletePost = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};