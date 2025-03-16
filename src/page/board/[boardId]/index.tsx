import {
  Container,
  Typography,
  Paper,
  Box,
  Button,
  Divider,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { getPost, deletePost } from "@/util/storage/board";

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

const BoardDetail = () => {
  const navigate = useNavigate();
  const { boardId } = useParams();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (boardId) {
      const foundPost = getPost(Number(boardId));
      setPost(foundPost);
    }
  }, [boardId]);

  const handleEdit = () => {
    navigate(`/board/${boardId}/edit`);
  };

  const handleDelete = () => {
    if (!boardId) return;

    const confirmed = window.confirm("정말로 삭제하시겠습니까?");
    if (confirmed) {
      const isDeleted = deletePost(Number(boardId));
      if (isDeleted) {
        navigate("/board");
      } else {
        alert("게시글 삭제에 실패했습니다.");
      }
    }
  };

  if (!post) {
    return <div>로딩 중...</div>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {post.title}
        </Typography>
        <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body2" color="text.secondary">
            작성자: {post.author}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            작성일: {post.createdAt}
          </Typography>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body1" sx={{ whiteSpace: "pre-line", mb: 3 }}>
          {post.content}
        </Typography>
        <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
          <Button variant="outlined" onClick={() => navigate("/board")}>
            목록
          </Button>
          <Button variant="contained" onClick={handleEdit}>
            수정
          </Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            삭제
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default BoardDetail;
