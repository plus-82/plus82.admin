interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

const STORAGE_KEY = "boardPosts";

// 초기 데이터
const initialPosts: Post[] = [
  {
    id: 1,
    title: "첫 번째 게시글",
    content: "첫 번째 게시글의 내용입니다.",
    author: "작성자1",
    createdAt: "2024-03-20",
  },
  {
    id: 2,
    title: "두 번째 게시글",
    content: "두 번째 게시글의 내용입니다.",
    author: "작성자2",
    createdAt: "2024-03-21",
  },
];

// localStorage에서 게시글 목록 가져오기
export const getPosts = (): Post[] => {
  const posts = localStorage.getItem(STORAGE_KEY);
  if (!posts) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialPosts));
    return initialPosts;
  }
  return JSON.parse(posts);
};

// 특정 게시글 가져오기
export const getPost = (id: number): Post | null => {
  const posts = getPosts();
  return posts.find((post) => post.id === id) || null;
};

// 새 게시글 추가
export const createPost = (post: Omit<Post, "id" | "createdAt">): Post => {
  const posts = getPosts();
  const newPost: Post = {
    ...post,
    id: Math.max(...posts.map((p) => p.id), 0) + 1,
    createdAt: new Date().toISOString().split("T")[0],
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify([...posts, newPost]));
  return newPost;
};

// 게시글 수정
export const updatePost = (
  id: number,
  updateData: Partial<Post>
): Post | null => {
  const posts = getPosts();
  const index = posts.findIndex((post) => post.id === id);

  if (index === -1) return null;

  const updatedPost = { ...posts[index], ...updateData };
  posts[index] = updatedPost;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  return updatedPost;
};

// 게시글 삭제
export const deletePost = (id: number): boolean => {
  const posts = getPosts();
  const filteredPosts = posts.filter((post) => post.id !== id);

  if (filteredPosts.length === posts.length) return false;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredPosts));
  return true;
};
