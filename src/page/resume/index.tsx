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
    Pagination,
    CircularProgress,
  } from "@mui/material";
  import { useQuery } from "@tanstack/react-query";
  import { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { ResumeListItem } from "@/type/resume";
  import NavigationBar from "@/shared/component/NavigationBar";
import { resumeApi } from "@/api/resume/request";
  
  const ResumeList = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const size = 10;

    const { data, isLoading, error } = useQuery({
      queryKey: ["resumes", page],
      queryFn: () => resumeApi.getList(page - 1, size),
    });

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
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
            <Typography color="error">지원자 목록을 불러오는데 실패했습니다.</Typography>
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
              지원자 목록
            </Typography>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>학원명</TableCell>
                  <TableCell>공고 제목</TableCell>
                  <TableCell>지원자</TableCell>
                  <TableCell>메모</TableCell>
                  <TableCell>지원일자</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.content.map((resume: ResumeListItem) => (
                  <TableRow key={resume.id}>
                    <TableCell>{resume.academyName}</TableCell>
                    <TableCell>{resume.jobPostTitle}</TableCell>
                    <TableCell>
                      {resume.resumeFirstName && resume.resumeLastName
                        ? `${resume.resumeLastName}${resume.resumeFirstName}`
                        : resume.resumeTitle}
                    </TableCell>
                    <TableCell>{resume.academyMemo}</TableCell>
                    <TableCell>
                      {resume.submittedDate}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Pagination
              count={data?.totalPages || 0}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </Container>
      </>
    );
  };
  
  export default ResumeList;