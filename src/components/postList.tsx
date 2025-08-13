import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchPosts, deletePost, type Post } from "../services/postService";
import { Button, Popconfirm } from "antd";

type Props = {
  onEdit: (post: Post) => void;
};

export default function PostList({onEdit}: Props) {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  if (isLoading) return <p>Loading posts...</p>;
  if (isError) return <p>Something went wrong fetching posts.</p>;

  return (
    <div>
      <h2>All Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data?.map((post) => (
          <div
            key={post.id}
            className="rounded-lg my-4 border border-[#ccc] p-4"
            >
            <h3 className="text-xl font-semibold">{post.title}</h3>
            <p>
              <b>Author:</b>{" "}
              <span className="text-blue-500">{post.username}</span>
            </p>
            <p>{post.content}</p>
            <Button
              type="primary"
              style={{ marginRight: 8 }}
              onClick={() => onEdit(post)}>
              Edit
            </Button>
            <Popconfirm
              title="Are you sure to delete this post?"
              onConfirm={() => deleteMutation.mutate(post.id!)}
              okText="Yes"
              cancelText="No">
              <Button danger>Delete</Button>
            </Popconfirm>
          </div>
        ))}
      </div>
    </div>
  );
}
