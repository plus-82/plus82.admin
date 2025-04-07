import {
    Container,
    Typography,
    Paper,
    Box,
    Button,
    Divider,
    CircularProgress,
  } from "@mui/material";
  import { /*useMutation,*/ useQuery } from "@tanstack/react-query";
  import { isNil } from "lodash-es";
  import { useEffect } from "react";
  import { useNavigate, useParams } from "react-router-dom";
  
  import { academyApi } from "@/api/academy/request";
  import { AcademyDetail } from "@/type/academy";
  
  const AcademyDetailPage = () => {
    const navigate = useNavigate();
    const { academyId } = useParams();
  
    const { data: academy, isLoading, error } = useQuery<AcademyDetail>({
      queryKey: ["academyDetail", academyId],
      queryFn: () => academyApi.getDetail(Number(academyId)),
      enabled: !isNil(academyId),
    });
  
    useEffect(() => {
      if (error) {
        navigate("/academy");
      }
    }, [academyId, error, navigate]);
  
    // const deleteAcademy = useMutation({
    //   mutationFn: academyApi.deleteAcademy,
    // });
  
    // const handleDelete = async () => {
    //   if (!window.confirm("정말 삭제하시겠습니까?")) return;
  
    //   deleteAcademy.mutate(Number(academyId), {
    //     onSuccess: () => {
    //       navigate("/academy");
    //     },
    //     onError: () => {
    //       alert("학원 삭제에 실패했습니다.");
    //     },
    //   });
    // };
  
    if (isLoading) {
      return (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      );
    }
  
    if (!academy) {
      return (
        <Box display="flex" justifyContent="center" mt={4}>
          <Typography>학원을 찾을 수 없습니다.</Typography>
        </Box>
      );
    }
  
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {academy.name} ({academy.nameEn})
          </Typography>
          <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2" color="text.secondary">
              대표자: {academy.representativeName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              이메일: {academy.representativeEmail}
            </Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body1" sx={{ whiteSpace: "pre-line", mb: 3 }}>
            {academy.description || "설명이 없습니다."}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            사업자 등록번호: {academy.businessRegistrationNumber}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            지역: {academy.locationType} / {academy.detailedAddress}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            위도: {academy.lat}, 경도: {academy.lng}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            대상:{" "}
            {[
              academy.forKindergarten && "유아",
              academy.forElementary && "초등학생",
              academy.forMiddleSchool && "중학생",
              academy.forHighSchool && "고등학생",
              academy.forAdult && "성인",
            ]
              .filter(Boolean)
              .join(", ")}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            이미지: {academy.imageUrls?.length || 0}개
           </Typography>
           {academy.imageUrls && academy.imageUrls.length > 0 && (
           <Box
               sx={{
               display: "flex",
               flexWrap: "wrap",
               gap: 2,
               mb: 2,
               }}
           >
               {academy.imageUrls.map((url, index) => (
               <Box key={index} sx={{ width: 150, border: "1px solid #ccc", overflow: "hidden" }}>
                   <img
                   src={"https://d1zl1w0yhwh5x4.cloudfront.net/" + url}
                   alt={`학원 이미지 ${index + 1}`}
                   style={{ width: "100%", height: "100%", objectFit: "cover" }}
                   />
               </Box>
               ))}
           </Box>
           )}
          <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mt: 3 }}>
            <Button variant="outlined" onClick={() => navigate("/academy")}>
              목록
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate(`/academy/${academyId}/edit`)}
            >
              수정
            </Button>
            {/* <Button
              variant="contained"
              color="error"
              onClick={handleDelete}
              disabled={deleteAcademy.isLoading}
            >
              {deleteAcademy.isLoading ? "삭제 중..." : "삭제"}
            </Button> */}
          </Box>
        </Paper>
      </Container>
    );
  };
  
  export default AcademyDetailPage;