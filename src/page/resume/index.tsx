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
    ToggleButton,
    ToggleButtonGroup,
  } from "@mui/material";
  import { useQuery } from "@tanstack/react-query";
  import { useState } from "react";
  import { useNavigate } from "react-router-dom";

import { resumeApi } from "@/api/resume/request";
  import NavigationBar from "@/shared/component/NavigationBar";
  import { ResumeListItem, ResumeStatus } from "@/type/resume";
  
  const ALL_STATUS = "ALL";
  
  const ResumeList = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState<string>(ALL_STATUS);
    const size = 10;

    const { data, isLoading, error } = useQuery({
      queryKey: ["resumes", page, status],
      queryFn: () => resumeApi.getList(page - 1, size, status === ALL_STATUS ? undefined : status),
    });

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
    };

    const handleStatusChange = (_event: React.MouseEvent<HTMLElement>, newStatus: string | null) => {
      if (newStatus !== null) {
        setStatus(newStatus);
        setPage(1);
      }
    };

    const handleRowClick = (resumeId: number) => {
      navigate(`/resume/${resumeId}`);
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

          <Box sx={{ mb: 3 }}>
            <ToggleButtonGroup
              value={status}
              exclusive
              onChange={handleStatusChange}
              aria-label="지원 상태 필터"
              size="small"
            >
              <ToggleButton value={ALL_STATUS}>전체</ToggleButton>
              {ResumeStatus.map((statusOption) => (
                <ToggleButton key={statusOption} value={statusOption}>
                  {statusOption === "SUBMITTED" && "접수"}
                  {statusOption === "REVIEWED" && "검토"}
                  {statusOption === "ACCEPTED" && "합격"}
                  {statusOption === "REJECTED" && "불합격"}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
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
                  <TableCell>상태</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.content.map((resume: ResumeListItem) => (
                  <TableRow key={resume.id} hover onClick={() => handleRowClick(resume.id)} sx={{ cursor: "pointer" }}>
                    <TableCell>{resume.academyName}</TableCell>
                    <TableCell>{resume.jobPostTitle}</TableCell>
                    <TableCell>
                      {resume.resumeFirstName && resume.resumeLastName
                        ? `${resume.resumeLastName}${resume.resumeFirstName}`
                        : resume.resumeTitle}
                    </TableCell>
                    <TableCell>{resume.academyMemo}</TableCell>
                    <TableCell>{new Date(resume.submittedDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      {resume.status === "SUBMITTED" && "지원완료"}
                      {resume.status === "REVIEWED" && "검토중"}
                      {resume.status === "ACCEPTED" && "합격"}
                      {resume.status === "REJECTED" && "불합격"}
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