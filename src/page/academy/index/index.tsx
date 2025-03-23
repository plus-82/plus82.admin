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
  
  import { academyQueries } from "@/api/academy/query";
  
  const AcademyList = () => {
    const navigate = useNavigate();
  
    const { data: academies, isLoading, error } = useQuery(academyQueries.list());
  
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
          학원
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
              {academies?.map((academies) => (
                <TableRow
                  key={academies.id}
                  hover
                  onClick={() => handleRowClick(academies.id)}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell>{academies.name}</TableCell>
                  <TableCell>{academies.description}</TableCell>
                  <TableCell>{academies.businessRegistrationNumber}</TableCell>
                  <TableCell>{academies.locationType}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    );
  };
  
  export default AcademyList;
  