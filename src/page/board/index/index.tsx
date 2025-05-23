import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  CircularProgress,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { boardQueries } from "@/api/board/query";
import NavigationBar from "@/shared/component/NavigationBar";

const BoardList = () => {
  const navigate = useNavigate();

  const { data: posts, isLoading, error } = useQuery(boardQueries.list());

  useEffect(() => {
    if (error) {
      alert("게시글 목록을 불러오는데 실패했습니다.");
    }
  }, [error]);

  const handleCreateClick = () => {
    navigate("/board/create");
  };

  const handleRowClick = (postId: number) => {
    navigate(`/board/${postId}`);
  };

  if (isLoading) {
    return (
      <>
        <NavigationBar />
        <Container sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Container>
      </>
    );
  }

  if (error) {
    return (
      <>
        <NavigationBar />
        <Container sx={{ mt: 4 }}>
          <Typography color="error">게시글을 불러오는데 실패했습니다.</Typography>
        </Container>
      </>
    );
  }

  return (
    <>
      <NavigationBar />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          게시판
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateClick}
          sx={{ mb: 2 }}
        >
          글 작성
        </Button>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>번호</TableCell>
                <TableCell>제목</TableCell>
                <TableCell>작성자</TableCell>
                <TableCell>작성일</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {posts?.map((post) => (
                <TableRow
                  key={post.id}
                  hover
                  onClick={() => handleRowClick(post.id)}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell>{post.id}</TableCell>
                  <TableCell>{post.title}</TableCell>
                  <TableCell>{post.author}</TableCell>
                  <TableCell>{post.createdAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default BoardList;
