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
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { teacherQueries } from '@/api/teacher/query'
import NavigationBar from '@/shared/component/NavigationBar'
import { TeacherResume } from '@/type/teacher'

const ResumeList = () => {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const size = 10

  const { data, isLoading, error } = useQuery(
    teacherQueries.list(page - 1, size),
  )

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value)
  }

  const handleRowClick = (resumeId: number) => {
    navigate(`/teacher/${resumeId}`)
  }

  if (isLoading) {
    return (
      <>
        <NavigationBar />
        <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Container>
      </>
    )
  }
  if (error) {
    return (
      <>
        <NavigationBar />
        <Container sx={{ mt: 4 }}>
          <Typography color="error">
            이력서 목록을 불러오는데 실패했습니다.
          </Typography>
        </Container>
      </>
    )
  }

  // 데이터가 없거나 content가 없는 경우 처리
  if (!data || !data.content) {
    return (
      <>
        <NavigationBar />
        <Container sx={{ mt: 4 }}>
          <Typography>이력서 목록이 없습니다.</Typography>
        </Container>
      </>
    )
  }

  return (
    <>
      <NavigationBar />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            이력서 둘러보기
          </Typography>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>이름</TableCell>
                <TableCell>성별</TableCell>
                <TableCell>국적</TableCell>
                <TableCell>생년월일</TableCell>
                <TableCell>비자</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.content?.map((resume: TeacherResume) => (
                <TableRow
                  key={resume.id}
                  hover
                  onClick={() => handleRowClick(resume.id)}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell>
                    {resume.firstName && resume.lastName
                      ? `${resume.lastName}${resume.firstName}`
                      : '이름 없음'}
                  </TableCell>
                  <TableCell>
                    {resume.genderType === 'MALE' && '남성'}
                    {resume.genderType === 'FEMALE' && '여성'}
                  </TableCell>
                  <TableCell>{resume.countryNameEn}</TableCell>
                  <TableCell>
                    {resume.birthDate
                      ? new Date(resume.birthDate).toLocaleDateString()
                      : ''}
                  </TableCell>
                  <TableCell>
                    {resume.hasVisa ? resume.visaType : '비자 없음'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Pagination
            count={data?.totalPages || 0}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </Container>
    </>
  )
}

export default ResumeList
