import PostList from "./components/postList";
import PostForm from "./components/postForm";
import "./App.css";

export default function App() {
  return (
    <div className="px-8">
      <h1 className="mb-4">React Query Blog</h1>
      <PostForm />
      <PostList />
    </div>
  );
}
