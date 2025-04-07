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
} from "@mui/material";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { academyApi } from "@/api/academy/request";
import {CreateAcademySchema,type CreateAcademyInput,} from "@/type/academy";
import { LocationTypes } from "@/type/code";

const EditAcademy = () => {
  const navigate = useNavigate();
  const { academyId } = useParams();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const { data: academy, isLoading, error } = useQuery({
    queryKey: ["academyDetail", academyId],
    queryFn: () => academyApi.getDetail(Number(academyId)),
    enabled: !!academyId,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAcademyInput>({
    resolver: zodResolver(CreateAcademySchema),
    defaultValues: {
      name: "",
      nameEn: "",
      representativeName: "",
      representativeEmail: "",
      description: "",
      locationType: "SEOUL",
      detailedAddress: "",
      lat: 0,
      lng: 0,
      forKindergarten: false,
      forElementary: false,
      forMiddleSchool: false,
      forHighSchool: false,
      forAdult: false,
    },
    values: academy
      ? {
          name: academy.name,
          nameEn: academy.nameEn,
          representativeName: academy.representativeName,
          representativeEmail: academy.representativeEmail,
          description: academy.description || "",
          locationType: academy.locationType,
          detailedAddress: academy.detailedAddress,
          lat: academy.lat ?? 0,
          lng: academy.lng ?? 0,
          forKindergarten: academy.forKindergarten ?? false,
          forElementary: academy.forElementary ?? false,
          forMiddleSchool: academy.forMiddleSchool ?? false,
          forHighSchool: academy.forHighSchool ?? false,
          forAdult: academy.forAdult ?? false,
          images: academy.imageUrls || [],
        }
      : undefined,
  });

  const updateAcademy = useMutation({
    mutationFn: (data: CreateAcademyInput) => academyApi.updateAcademy(Number(academyId), data),
    onSuccess: () => {
      toast.success("학원이 성공적으로 수정되었습니다.");
      navigate("/academy");
    },
    onError: () => {
      toast.error("학원 수정에 실패했습니다.");
    },
  });

  const onSubmit = (data: CreateAcademyInput) => {
    if (selectedFiles.length > 0) {
      data.images = selectedFiles;
    }
    updateAcademy.mutate(data);
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
        <Typography color="error">학원 정보를 불러오는데 실패했습니다.</Typography>
      </Container>
    );
  }
  

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        학원 수정
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="학원명 (국문)"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          label="학원명 (영문)"
          {...register("nameEn")}
          error={!!errors.nameEn}
          helperText={errors.nameEn?.message}
        />
        <TextField
          label="대표자명"
          {...register("representativeName")}
          error={!!errors.representativeName}
          helperText={errors.representativeName?.message}
        />
        <TextField
          label="대표자 이메일"
          {...register("representativeEmail")}
          error={!!errors.representativeEmail}
          helperText={errors.representativeEmail?.message}
        />
        <TextField
          label="설명"
          multiline
          rows={4}
          {...register("description")}
          error={!!errors.description}
          helperText={errors.description?.message}
        />
        <FormControl fullWidth error={!!errors.locationType}>
          <InputLabel id="locationType-label">지역</InputLabel>
          <Select
            labelId="locationType-label"
            label="지역"
            defaultValue=""
            {...register("locationType")}
          >
            {LocationTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="상세 주소"
          {...register("detailedAddress")}
          error={!!errors.detailedAddress}
          helperText={errors.detailedAddress?.message}
        />
        <TextField
          label="위도"
          type="number"
          inputProps={{ step: "any" }}
          {...register("lat", {
            valueAsNumber: true,
            validate: (value) =>
              !isNaN(value) || "유효한 숫자를 입력해주세요",
          })}
          error={!!errors.lat}
          helperText={errors.lat?.message}
        />
        <TextField
          label="경도"
          type="number"
          inputProps={{ step: "any" }}
          {...register("lng", {
            valueAsNumber: true,
            validate: (value) =>
              !isNaN(value) || "유효한 숫자를 입력해주세요",
          })}
          error={!!errors.lng}
          helperText={errors.lng?.message}
        />

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

        <Button variant="outlined" component="label">
          이미지 업로드
          <input
            type="file"
            hidden
            multiple
            accept="image/*"
            onChange={(e) => {
              if (e.target.files) {
                const fileList = Array.from(e.target.files);
                setSelectedFiles(fileList);
              }
            }}
          />
        </Button>
        <Typography variant="body2">
          선택한 새 파일 수: {selectedFiles.length}
        </Typography>

        <Box display="flex" gap={2} mt={2}>
          <Button variant="outlined" onClick={() => navigate("/academy")}>
            취소
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={updateAcademy.isPending}
          >
            {updateAcademy.isPending ? (
              <CircularProgress size={24} />
            ) : (
              "수정"
            )}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default EditAcademy;