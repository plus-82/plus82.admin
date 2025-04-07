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
    CircularProgress,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { academyQueries } from "@/api/academy/query";
import NavigationBar from "@/shared/component/NavigationBar";

const AcademyList = () => {
  const navigate = useNavigate();

  const { data: academies, isLoading, error } = useQuery(academyQueries.list());

  useEffect(() => {
    if (error) {
      alert("게시글 목록을 불러오는데 실패했습니다.");
    }
  }, [error]);

  const handleCreateClick = () => {
    navigate("/academy/create");
  };

  const handleRowClick = (academyId: number) => {
    navigate(`/academy/${academyId}`);
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

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            학원
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateClick}
          >
            학원 추가
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>번호</TableCell>
                <TableCell>학원명</TableCell>
                <TableCell>사업자 등록번호</TableCell>
                <TableCell>대표자명</TableCell>
                <TableCell>대표자 이메일</TableCell>
                <TableCell>주소</TableCell>
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
                  <TableCell>{academies.id}</TableCell>
                  <TableCell>{academies.name} ({academies.nameEn})</TableCell>
                  <TableCell>{academies.businessRegistrationNumber}</TableCell>
                  <TableCell>{academies.representativeName}</TableCell>
                  <TableCell>{academies.representativeEmail}</TableCell>
                  <TableCell>{academies.locationType} / {academies.detailedAddress}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default AcademyList;