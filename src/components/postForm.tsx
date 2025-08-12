import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost, type Post} from "../services/postService";

export default function PostForm() {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<Post>({
    userId: 0,
    username: "",
    title: "",
    content: ""
  });

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setFormData({ userId: 0, username: "", title: "", content: "" });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.username || !formData.content) return;
    mutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 grid gap-4 grid-cols-1 md:grid-cols-3 grid-rows-3">
      <h2 className="row-start-1 text-xl">Create New Post</h2>
      <input
        className="px-4 py-3 md:row-start-2 md:col-start-1 outline-0 border border-blue-500 rounded-lg"
        type="number"
        value={formData.userId}
        onChange={(e) => setFormData({ ...formData, userId: Number(e.target.value) })}
      />
      <input
        className="px-4 py-3 md:row-start-2 md:col-start-2 outline-0 border border-blue-500 rounded-lg"
        type="text"
        placeholder="Username"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      />
      <input
        className="px-4 py-3 outline-0 md:row-start-2 md:col-start-3 border border-blue-500 rounded-lg"
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />
      <textarea
        className="px-4 outline-0 md:row-start-3 md:col-start-1 border border-blue-500 rounded-lg"
        placeholder="Content"
        value={formData.content}
        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
      />
      <button type="submit" disabled={mutation.isPending} className="bg-blue-500 md:row-start-3 md:col-start-2 text-white px-4 py-3 rounded-lg cursor-pointer">
        {mutation.isPending ? "Adding..." : "Add Post"}
      </button>
    </form>
  );
}
