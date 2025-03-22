import { zodResolver } from "@hookform/resolvers/zod";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import { useQuery, useMutation } from "@tanstack/react-query";
import { isNil } from 'lodash-es'
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { boardQueries } from "@/api/board/query";
import { boardApi } from "@/api/board/request";
import { CreatePostSchema, type CreatePostInput } from "@/type/board";

const EditBoard = () => {
  const navigate = useNavigate();
  const { boardId } = useParams();

  const { data: post, isLoading, error } = useQuery({
    ...boardQueries.detail(Number(boardId)),
    enabled: !isNil(boardId)
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostInput>({
    resolver: zodResolver(CreatePostSchema),
    defaultValues: {
      title: "",
      content: "",
      author: "",
    },
    values: post,
  });

  const updatePost = useMutation({
    mutationFn: boardApi.updatePost,
  })

  const onSubmit = async (data: CreatePostInput) => {
    if (!boardId) return;

    updatePost.mutate({ id: Number(boardId), ...data }, {
      onSuccess: () => {
        navigate(`/board/${boardId}`);
      },
      onError: () => {
        alert("게시글 수정에 실패했습니다.");
      },
    });
  };

  if (isLoading) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography color="error">게시글을 불러오는데 실패했습니다.</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        게시글 수정
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="제목"
          {...register("title")}
          error={!!errors.title}
          helperText={errors.title?.message}
          margin="normal"
        />
        <TextField
          fullWidth
          label="내용"
          {...register("content")}
          error={!!errors.content}
          helperText={errors.content?.message}
          margin="normal"
          multiline
          rows={10}
        />
        <TextField
          fullWidth
          label="작성자"
          {...register("author")}
          error={!!errors.author}
          helperText={errors.author?.message}
          margin="normal"
          disabled
        />
        <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
          <Button type="button" variant="outlined" onClick={() => navigate(-1)}>
            취소
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={updatePost.isPending}
          >
            {updatePost.isPending ? "수정 중..." : "수정"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default EditBoard;
