import { zodResolver } from "@hookform/resolvers/zod";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { jobPostApi } from "@/api/job-post/request";
import { academyApi } from "@/api/academy/request";
import { CreateJobPostSchema, type CreateJobPostInput } from "@/type/jobpost";
import NavigationBar from "@/shared/component/NavigationBar";

const defaultValues: CreateJobPostInput = {
  title: "",
  jobDescription: "",
  requiredQualification: "",
  preferredQualification: "",
  benefits: "",
  salary: 0,
  salaryNegotiable: false,
  jobStartDate: "",
  dueDate: "",
  forKindergarten: false,
  forElementary: false,
  forMiddleSchool: false,
  forHighSchool: false,
  forAdult: false,
  academyId: 0,
};

const CreateJobPost = () => {
  const navigate = useNavigate();

  const { data: academies, isLoading: isAcademiesLoading } = useQuery({
    queryKey: ["academies"],
    queryFn: () => academyApi.getList(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateJobPostInput>({
    resolver: zodResolver(CreateJobPostSchema),
    defaultValues,
  });

  const createJobPost = useMutation({
    mutationFn: jobPostApi.createJobPost,
    onSuccess: () => {
      toast.success("공고가 성공적으로 추가되었습니다.");
      navigate("/job-post");
    },
    onError: () => {
      alert("채용 공고 생성에 실패했습니다.");
    },
  });

  const onSubmit = (data: CreateJobPostInput) => {
    createJobPost.mutate(data);
  };

  if (isAcademiesLoading) {
    return (
      <Container maxWidth="md" sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <>
      <NavigationBar />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          채용 공고 추가
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <FormControl fullWidth error={!!errors.academyId}>
            <InputLabel id="academyId-label">학원</InputLabel>
            <Select
              labelId="academyId-label"
              label="학원"
              {...register("academyId", { valueAsNumber: true })}
              error={!!errors.academyId}
            >
              {academies?.map((academies) => (
                <MenuItem key={academies.id} value={academies.id}>
                  {academies.name}
                </MenuItem>
              ))}
            </Select>
            {errors.academyId && (
              <Typography variant="caption" color="error">
                {errors.academyId.message}
              </Typography>
            )}
          </FormControl>

          <TextField
            label="공고 제목"
            fullWidth
            {...register("title")}
            error={!!errors.title}
            helperText={errors.title?.message}
          />

          <TextField
            label="직무 내용"
            multiline
            rows={4}
            fullWidth
            {...register("jobDescription")}
            error={!!errors.jobDescription}
            helperText={errors.jobDescription?.message}
          />

          <TextField
            label="필수 자격 요건"
            multiline
            rows={4}
            fullWidth
            {...register("requiredQualification")}
            error={!!errors.requiredQualification}
            helperText={errors.requiredQualification?.message}
          />

          <TextField
            label="우대 자격 요건"
            multiline
            rows={4}
            fullWidth
            {...register("preferredQualification")}
            error={!!errors.preferredQualification}
            helperText={errors.preferredQualification?.message}
          />

          <TextField
            label="복리후생"
            multiline
            rows={4}
            fullWidth
            {...register("benefits")}
            error={!!errors.benefits}
            helperText={errors.benefits?.message}
          />

          <Box display="flex" gap={2}>
            <TextField
              label="급여"
              type="number"
              fullWidth
              {...register("salary", { valueAsNumber: true })}
              error={!!errors.salary}
              helperText={errors.salary?.message}
            />
            <FormControlLabel
              control={<Checkbox {...register("salaryNegotiable")} />}
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
            />
            <TextField
              label="마감일"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              {...register("dueDate")}
              error={!!errors.dueDate}
              helperText={errors.dueDate?.message}
            />
          </Box>

          <FormGroup>
            <Typography variant="subtitle1" gutterBottom>
              대상 학생
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              <FormControlLabel
                control={<Checkbox {...register("forKindergarten")} />}
                label="유아 대상"
              />
              <FormControlLabel
                control={<Checkbox {...register("forElementary")} />}
                label="초등학생 대상"
              />
              <FormControlLabel
                control={<Checkbox {...register("forMiddleSchool")} />}
                label="중학생 대상"
              />
              <FormControlLabel
                control={<Checkbox {...register("forHighSchool")} />}
                label="고등학생 대상"
              />
              <FormControlLabel
                control={<Checkbox {...register("forAdult")} />}
                label="성인 대상"
              />
            </Box>
          </FormGroup>

          <Box display="flex" gap={2} mt={2}>
            <Button variant="outlined" onClick={() => navigate("/job-post")}>
              취소
            </Button>
            <Button type="submit" variant="contained" disabled={createJobPost.isPending}>
              {createJobPost.isPending ? <CircularProgress size={24} /> : "작성"}
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default CreateJobPost;