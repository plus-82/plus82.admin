import { zodResolver } from "@hookform/resolvers/zod";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setCookie } from "typescript-cookie";

import { authApi } from "@/api/auth/request";
import { SignInRequestSchema, SignInResponse, type SignInRequest } from "@/type/auth";

const defaultValues: SignInRequest = {
  email: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInRequest>({
    resolver: zodResolver(SignInRequestSchema),
    defaultValues,
  });
  
  const requestSignIn = useMutation({
    mutationFn: authApi.signIn,
  })

  const onSubmit = async (data: SignInRequest) => {
    requestSignIn.mutate(data, {
      onSuccess: (data: SignInResponse) => {
        setCookie("Authorization", data.accessToken);
        navigate(`/academy`);
      },
      onError: () => {
        toast.error("아이디 비밀번호를 확인해주세요");
      },
    });
  };

  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Typography variant="h4" gutterBottom>
          관리자 페이지
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            label="이메일"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="비밀번호"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            disabled={requestSignIn.isPending}
            sx={{ mt: 2 }}
          >
            {requestSignIn.isPending ? <CircularProgress size={24} /> : "로그인"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
