import { zodResolver } from "@hookform/resolvers/zod";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { jobPostApi } from "@/api/job-post/request";
import { CreateJobPostSchema, type CreateJobPostInput } from "@/type/jobpost";
import { toast } from "react-toastify";
import NavigationBar from "@/shared/component/NavigationBar";

const JobPostDetail = () => {
  const navigate = useNavigate();
  const { jobPostId } = useParams();
  const [isEditing, setIsEditing] = useState(false);

  const { data: jobPost, isLoading: isLoading } = useQuery({
    queryKey: ["jobPostId", jobPostId],
    queryFn: () => jobPostApi.getDetail(Number(jobPostId)),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateJobPostInput>({
    resolver: zodResolver(CreateJobPostSchema),
  });

  useEffect(() => {
    if (jobPost) {
      reset({
        title: jobPost.title,
        jobDescription: jobPost.jobDescription,
        requiredQualification: jobPost.requiredQualification,
        preferredQualification: jobPost.preferredQualification || "",
        benefits: jobPost.benefits,
        salary: jobPost.salary,
        salaryNegotiable: jobPost.salaryNegotiable,
        jobStartDate: jobPost.jobStartDate,
        dueDate: jobPost.dueDate,
        forKindergarten: jobPost.forKindergarten,
        forElementary: jobPost.forElementary,
        forMiddleSchool: jobPost.forMiddleSchool,
        forHighSchool: jobPost.forHighSchool,
        forAdult: jobPost.forAdult,
        academyId: jobPost.academyId,
      });
    }
  }, [jobPost, reset]);

  const updateJobPost = useMutation({
    mutationFn: (data: CreateJobPostInput) => jobPostApi.updateJobPost(Number(jobPostId), data),
    onSuccess: () => {
      toast.success("공고가 성공적으로 추가되었습니다.");
      navigate("/job-post");
    },
    onError: () => {
      alert("채용 공고 수정에 실패했습니다.");
    },
  });

  const onSubmit = (data: CreateJobPostInput) => {
    console.log("Form submitted with data:", data);
    updateJobPost.mutate(data);
  };

  if (isLoading) {
    return (
      <Container maxWidth="md" sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!jobPost) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography color="error">채용 공고 정보를 불러오는데 실패했습니다.</Typography>
      </Container>
    );
  }

  return (
    <>
      <NavigationBar />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h4" component="h1">
            채용 공고 수정
          </Typography>
          {!isEditing && (
            <Button variant="contained" onClick={() => setIsEditing(true)}>
              수정
            </Button>
          )}
        </Box>
        <Typography variant="body1" gutterBottom>
          <strong>학원:</strong> {jobPost.academyName} ({jobPost.academyNameEn})
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="공고 제목"
            {...register("title")}
            error={!!errors.title}
            helperText={errors.title?.message}
            disabled={!isEditing}
          />

          <TextField
            label="직무 내용"
            multiline
            rows={3}
            {...register("jobDescription")}
            error={!!errors.jobDescription}
            helperText={errors.jobDescription?.message}
            disabled={!isEditing}
          />

          <TextField
            label="자격 요건"
            multiline
            rows={3}
            {...register("requiredQualification")}
            error={!!errors.requiredQualification}
            helperText={errors.requiredQualification?.message}
            disabled={!isEditing}
          />

          <TextField
            label="우대 사항"
            multiline
            rows={3}
            {...register("preferredQualification")}
            error={!!errors.preferredQualification}
            helperText={errors.preferredQualification?.message}
            disabled={!isEditing}
          />

          <TextField
            label="혜택/복지"
            multiline
            rows={3}
            {...register("benefits")}
            error={!!errors.benefits}
            helperText={errors.benefits?.message}
            disabled={!isEditing}
          />

          <Box display="flex" gap={2}>
            <TextField
              label="월급"
              type="number"
              fullWidth
              {...register("salary", { valueAsNumber: true })}
              error={!!errors.salary}
              helperText={errors.salary?.message}
              disabled={!isEditing}
            />
            <FormControlLabel
              control={<Checkbox {...register("salaryNegotiable")} defaultChecked={jobPost.salaryNegotiable} disabled={!isEditing} />}
              label="급여 협의 가능"
            />
          </Box>

          <Box display="flex" gap={2}>
            <TextField
              label="근무 시작일"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              {...register("jobStartDate")}
              error={!!errors.jobStartDate}
              helperText={errors.jobStartDate?.message}
              disabled={!isEditing}
            />
            <TextField
              label="마감일"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              {...register("dueDate")}
              error={!!errors.dueDate}
              helperText={errors.dueDate?.message}
              disabled={!isEditing}
            />
          </Box>

          <FormGroup>
            <Typography variant="subtitle1" gutterBottom>
              대상 학생
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              <FormControlLabel
                control={<Checkbox {...register("forKindergarten")} defaultChecked={jobPost.forKindergarten} disabled={!isEditing} />}
                label="유아 대상"
              />
              <FormControlLabel
                control={<Checkbox {...register("forElementary")} defaultChecked={jobPost.forElementary} disabled={!isEditing} />}
                label="초등학생 대상"
              />
              <FormControlLabel
                control={<Checkbox {...register("forMiddleSchool")} defaultChecked={jobPost.forMiddleSchool} disabled={!isEditing} />}
                label="중학생 대상"
              />
              <FormControlLabel
                control={<Checkbox {...register("forHighSchool")} defaultChecked={jobPost.forHighSchool} disabled={!isEditing} />}
                label="고등학생 대상"
              />
              <FormControlLabel
                control={<Checkbox {...register("forAdult")} defaultChecked={jobPost.forAdult} disabled={!isEditing} />}
                label="성인 대상"
              />
            </Box>
          </FormGroup>

          <Box display="flex" gap={2} mt={2}>
            <Button variant="outlined" onClick={() => navigate("/job-post")} disabled={!isEditing} >
              취소
            </Button>
            <Button type="submit" variant="contained" disabled={updateJobPost.isPending || !isEditing} >
              {updateJobPost.isPending ? <CircularProgress size={24} /> : "저장"}
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default JobPostDetail; 