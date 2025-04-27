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
  Avatar,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { academyApi } from "@/api/academy/request";
import { CreateAcademySchema, type CreateAcademyInput } from "@/type/academy";
import { LocationTypes } from "@/type/code";


const defaultValues: CreateAcademyInput = {
  name: "",
  nameEn: "",
  representativeName: "",
  representativeEmail: "",
  description: "",
  locationType: "SEOUL",
  detailedAddress: "",
  lat: 0.0,
  lng: 0.0,
  forKindergarten: false,
  forElementary: false,
  forMiddleSchool: false,
  forHighSchool: false,
  forAdult: false,
  images: [],
};

const NewAcademy = () => {
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAcademyInput>({
    resolver: zodResolver(CreateAcademySchema),
    defaultValues,
  });

  const createAcademy = useMutation({
    mutationFn: academyApi.createAcademy,
    onSuccess: () => {
      navigate("/academy");
    },
    onError: () => {
      alert("학원 생성에 실패했습니다.");
    },
  });

  const onSubmit = (data: CreateAcademyInput) => {
    console.log(data)
    if (selectedFiles.length === 0) {
      toast.error("최소 1장의 이미지를 추가해주세요.");
      return;
    }
    createAcademy.mutate({
      ...data,
      images: selectedFiles,
    });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const fileList = Array.from(event.target.files);
      setSelectedFiles(fileList);

      // 미리보기 이미지 URL 생성
      const previewUrls = fileList.map(file => URL.createObjectURL(file));
      setPreviewImages(previewUrls);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        학원 추가
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
            defaultValue={defaultValues.locationType}
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
          inputProps={{ step: "any" }} // 소수점 입력 허용
          {...register("lat", {
            valueAsNumber: true,
            validate: (value) =>
              !isNaN(value) || "유효한 숫자를 입력해주세요", // 숫자인지 검증
          })}
          error={!!errors.lat}
          helperText={errors.lat?.message}
        />
        <TextField
          label="경도"
          type="number"
          inputProps={{ step: "any" }} // 소수점 입력 허용
          {...register("lng", {
            valueAsNumber: true,
            validate: (value) =>
              !isNaN(value) || "유효한 숫자를 입력해주세요", // 숫자인지 검증
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
            onChange={handleImageChange}
          />
        </Button>
        <Typography variant="body2">
          선택한 파일 수: {selectedFiles.length}
        </Typography>

        {/* 이미지 미리보기 */}
        {previewImages.length > 0 && (
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {previewImages.map((previewUrl, index) => (
              <Avatar
                key={index}
                src={previewUrl}
                alt={`미리보기 ${index + 1}`}
                sx={{ width: 100, height: 100 }}
                variant="rounded"
              />
            ))}
          </Box>
        )}

        <Box display="flex" gap={2} mt={2}>
          <Button variant="outlined" onClick={() => navigate("/academy")}>
            취소
          </Button>
          <Button type="submit" variant="contained" disabled={createAcademy.isPending}>
            {createAcademy.isPending ? <CircularProgress size={24} /> : "작성"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default NewAcademy;