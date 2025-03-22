import { zodResolver } from "@hookform/resolvers/zod";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { boardApi } from "@/api/board";
import { useQuery, useMutation } from "@/hook/useAsync";
import { CreatePostSchema, type CreatePostInput } from "@/type/board";

const EditBoard = () => {
  const navigate = useNavigate();
  const { boardId } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreatePostInput>({
    resolver: zodResolver(CreatePostSchema),
    defaultValues: {
      title: "",
      content: "",
      author: "",
    },
  });

  // 게시글 조회
  const { isLoading, error } = useQuery(
    () => boardApi.getPost(Number(boardId)),
    {
      immediate: !!boardId,
      onSuccess: (data) => {
        reset({
          title: data.title,
          content: data.content,
          author: data.author,
        });
      },
      onError: () => {
        alert("게시글을 불러오는데 실패했습니다.");
      },
    }
  );

  // 게시글 수정
  const { mutate: updatePost, isLoading: isSubmitting } = useMutation(
    (data: CreatePostInput) => boardApi.updatePost(Number(boardId), data),
    {
      onSuccess: () => {
        navigate(`/board/${boardId}`);
      },
      onError: () => {
        alert("게시글 수정에 실패했습니다.");
      },
    }
  );

  const onSubmit = async (data: CreatePostInput) => {
    if (!boardId) return;
    await updatePost(data);
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
            disabled={isSubmitting}
          >
            {isSubmitting ? "수정 중..." : "수정"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default EditBoard;
