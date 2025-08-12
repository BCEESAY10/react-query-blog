import { useQuery } from "@tanstack/react-query";
import { fetchPosts, type Post } from "../services/postService";

export default function PostList() {
  const { data, isLoading, isError } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) return <p>Loading posts...</p>;
  if (isError) return <p>Something went wrong fetching posts.</p>;

  return (
    <div>
      <h2>All Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3">
            {data?.map((post) => (
            <div key={post.id} className="rounded-lg" style={{ border: "1px solid #ccc", margin: "8px", padding: "8px" }}>
            <h3 className="text-xl font-semibold">{post.title}</h3>
            <p><b>Author:</b> <span className="text-blue-500">{post.username}</span></p>
            <p>{post.content}</p>
            </div>
        ))}
      </div>
    </div>
  );
}
