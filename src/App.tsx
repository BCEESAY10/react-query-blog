import { useState } from "react";
import PostList from "./components/postList";
import PostForm from "./components/postForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost, updatePost, type Post } from "./services/postService";
import { Button } from "antd";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | undefined>(undefined);
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setIsModalOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setIsModalOpen(false);
      setEditingPost(undefined);
    },
  });

  const handleSubmit = (values: Post) => {
    if (editingPost) {
      updateMutation.mutate({ ...editingPost, ...values });
    } else {
      createMutation.mutate(values);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>React Query Blog</h1>
      <Button type="primary" onClick={() => setIsModalOpen(true)} style={{ marginBottom: 20 }}>
        Create New Post
      </Button>
      <PostList
        onEdit={(post) => {
          setEditingPost(post);
          setIsModalOpen(true);
        }}
      />
      <PostForm
        visible={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingPost(undefined);
        }}
        onSubmit={handleSubmit}
        initialValues={editingPost}
      />
    </div>
  );
}
