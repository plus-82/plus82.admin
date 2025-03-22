import { zodResolver } from "@hookform/resolvers/zod";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { boardApi } from "@/api/board/request";
import { CreatePostSchema, type CreatePostInput } from "@/type/board";

const defaultValues: CreatePostInput = {
  title: "",
  content: "",
  author: "",
};

const NewBoard = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostInput>({
    resolver: zodResolver(CreatePostSchema),
    defaultValues,
  });

  const createPost = useMutation({
    mutationFn: boardApi.createPost,
  })

  const onSubmit = async (data: CreatePostInput) => {
    createPost.mutate(data, {
      onSuccess: (data) => {
        navigate(`/board/${data.id}`);
      },
      onError: () => {
        alert("게시글 작성에 실패했습니다.");
      },
    });
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        새 게시글 작성
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="제목"
          {...register("title")}
          error={!!errors.title}
          helperText={errors.title?.message}
        />
        <TextField
          label="작성자"
          {...register("author")}
          error={!!errors.author}
          helperText={errors.author?.message}
        />
        <TextField
          label="내용"
          multiline
          rows={4}
          {...register("content")}
          error={!!errors.content}
          helperText={errors.content?.message}
        />

        <Box display="flex" gap={2} mt={2}>
          <Button variant="outlined" onClick={() => navigate("/board")}>
            취소
          </Button>
          <Button type="submit" variant="contained" disabled={createPost.isPending}>
            {createPost.isPending ? <CircularProgress size={24} /> : "작성"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default NewBoard;
