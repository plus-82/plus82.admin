/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Post, CreatePostInput } from "../type/board";
import http from "./instance";

// localStorage를 임시 데이터베이스로 사용 (API 연동 전까지만 사용)
const STORAGE_KEY = "boardPosts";

const getPosts = (): Post[] => {
  const posts = localStorage.getItem(STORAGE_KEY);
  return posts ? JSON.parse(posts) : [];
};

const savePosts = (posts: Post[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
};

// API 엔드포인트
const BOARD_API = {
  BASE: "/board",
  POST: (id: number) => `/board/${id}`,
};

// API 함수들
export const boardApi = {
  // 게시글 목록 조회
  getList: async (): Promise<Post[]> => {
    try {
      return await http.get<Post[]>({
        url: BOARD_API.BASE,
      });
    } catch (error) {
      // API 연동 전까지는 localStorage 사용
      return getPosts();
    }
  },

  // 게시글 상세 조회
  getPost: async (id: number): Promise<Post> => {
    try {
      return await http.get<Post>({
        url: BOARD_API.POST(id),
      });
    } catch (error) {
      // API 연동 전까지는 localStorage 사용
      const posts = getPosts();
      const post = posts.find((p) => p.id === id);
      if (!post) throw new Error("게시글을 찾을 수 없습니다.");
      return post;
    }
  },

  // 게시글 생성
  createPost: async (data: CreatePostInput): Promise<Post> => {
    try {
      return await http.post<Post>({
        url: BOARD_API.BASE,
        data,
      });
    } catch (error) {
      // API 연동 전까지는 localStorage 사용
      const posts = getPosts();
      const newPost: Post = {
        ...data,
        id: Math.max(...posts.map((p) => p.id), 0) + 1,
        createdAt: new Date().toISOString().split("T")[0],
      };
      savePosts([...posts, newPost]);
      return newPost;
    }
  },

  // 게시글 수정
  updatePost: async (
    id: number,
    data: Partial<CreatePostInput>
  ): Promise<Post> => {
    try {
      return await http.put<Post>({
        url: BOARD_API.POST(id),
        data,
      });
    } catch (error) {
      // API 연동 전까지는 localStorage 사용
      const posts = getPosts();
      const index = posts.findIndex((p) => p.id === id);
      if (index === -1) throw new Error("게시글을 찾을 수 없습니다.");

      const updatedPost = { ...posts[index], ...data };
      posts[index] = updatedPost;
      savePosts(posts);
      return updatedPost;
    }
  },

  // 게시글 삭제
  deletePost: async (id: number): Promise<void> => {
    try {
      await http.delete<void>({
        url: BOARD_API.POST(id),
      });
    } catch (error) {
      // API 연동 전까지는 localStorage 사용
      const posts = getPosts();
      const filteredPosts = posts.filter((p) => p.id !== id);
      savePosts(filteredPosts);
    }
  },
};
