import { Container, Typography, TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { createPost } from "@/util/storage/board";

const CreateBoard = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "작성자", // 임시로 고정된 작성자
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPost = createPost(formData);
    console.log("생성된 게시글:", newPost);
    navigate("/board");
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        게시글 작성
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="제목"
          name="title"
          value={formData.title}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="내용"
          name="content"
          value={formData.content}
          onChange={handleChange}
          margin="normal"
          required
          multiline
          rows={10}
        />
        <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
          <Button type="button" variant="outlined" onClick={() => navigate(-1)}>
            취소
          </Button>
          <Button type="submit" variant="contained" color="primary">
            등록
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateBoard;
