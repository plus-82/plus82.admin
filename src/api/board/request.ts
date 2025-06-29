/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from "@/util/storage/board";

import http from "../instance";

import type { Post, CreatePostInput } from "../../type/board";

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
      const post = getPost(id);
      if (!post) throw new Error("게시글을 찾을 수 없습니다.");

      return post;
    }
  },

  // 게시글 생성
  createPost: async (
    data: CreatePostInput
): Promise<Post> => {
    try {
      return await http.post<Post>({
        url: BOARD_API.BASE,
        data,
      });
    } catch (error) {
      // API 연동 전까지는 localStorage 사용
      return createPost(data);
    }
  },

  // 게시글 수정
  updatePost: async ({
    id,
    ...data
  }: Partial<CreatePostInput> & {
    id: number;
  }): Promise<Post> => {
    try {
      return await http.put<Post>({
        url: BOARD_API.POST(id),
        data,
      });
    } catch (error) {
      const response = updatePost(id, data);
      if (!response) throw new Error("게시글을 찾을 수 없습니다.");

      return response;
    }
  },

  // 게시글 삭제
  deletePost: async ({
    id,
  }: {
    id: number;
  }): Promise<void> => {
    try {
      await http.delete<void>({
        url: BOARD_API.POST(id),
      });
    } catch (error) {
      // API 연동 전까지는 localStorage 사용
      deletePost(id);
    }
  },
};
