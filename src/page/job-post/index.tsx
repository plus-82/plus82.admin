import {
    Container,
    Box,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Pagination,
    CircularProgress,
  } from "@mui/material";
  import { useQuery } from "@tanstack/react-query";
  import { useState } from "react";
  import { useNavigate } from "react-router-dom";
  
  import { jobPostQueries } from "@/api/job-post/query";
  import NavigationBar from "@/shared/component/NavigationBar";
  
  const JobPostList = () => {
    const navigate = useNavigate();
  
    const [page, setPage] = useState(1); // 현재 페이지 (1-based index)
    const size = 10; // 페이지 크기

    const { data, isLoading, error } = useQuery(jobPostQueries.list(page - 1, size));

    const handleCreateClick = () => {
      navigate("/job-post/create");
    };
  
    const handleRowClick = (jobPostId: number) => {
      navigate(`/job-post/${jobPostId}`);
    };
  
    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value); // 페이지 번호 업데이트
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
            <Typography color="error">채용 공고를 불러오는데 실패했습니다.</Typography>
          </Container>
        </>
      );
    }
  
    return (
      <>
        <NavigationBar />
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              채용 공고
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateClick}
            >
              공고 추가
            </Button>
          </Box>
  
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>학원명</TableCell>
                  <TableCell>공고 제목</TableCell>
                  <TableCell>지원 현황</TableCell>
                  <TableCell>월급</TableCell>
                  <TableCell>등록일</TableCell>
                  <TableCell>마감일</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.content.map((jobPost) => (
                  <TableRow
                    key={jobPost.id}
                    hover
                    onClick={() => handleRowClick(jobPost.id)}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell>{jobPost.academyName}</TableCell>
                    <TableCell>{jobPost.title}</TableCell>
                    <TableCell>{jobPost.resumeCount}명</TableCell>
                    <TableCell>{jobPost.salary}</TableCell>
                    <TableCell>{new Date(jobPost.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(jobPost.dueDate).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Pagination
              count={data?.totalPages || 0} // 총 페이지 수
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </Container>
      </>
    );
  };
  
  export default JobPostList;