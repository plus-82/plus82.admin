import {
  Container,
  Typography,
  Paper,
  Box,
  Button,
  Divider,
  CircularProgress,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { isNil } from "lodash-es";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { boardQueries } from "@/api/board/query";
import { boardApi } from "@/api/board/request";

const BoardDetail = () => {
  const navigate = useNavigate();
  const { boardId } = useParams();

  const { data: post, isLoading, error } = useQuery({
    ...boardQueries.detail(Number(boardId)),
    enabled: !isNil(boardId),
  })

  useEffect(() => {
    if (error) {
      navigate("/board");
    }
  }, [boardId, error, navigate]);

  const deletePost = useMutation({
    mutationFn: boardApi.deletePost,
  })

  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    deletePost.mutate({ id: Number(boardId) }, {
      onSuccess: () => {
          navigate("/board");
        },
        onError: () => {
        alert("게시글 삭제에 실패했습니다.");
      },
    });
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!post) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <Typography>게시글을 찾을 수 없습니다.</Typography>
      </Box>
    );
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
          <Button
            variant="contained"
            onClick={() => navigate(`/board/${boardId}/edit`)}
          >
            수정
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            disabled={deletePost.isPending}
          >
            {deletePost.isPending ? "삭제 중..." : "삭제"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default BoardDetail;
