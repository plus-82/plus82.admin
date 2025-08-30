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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Grid,
  Button,
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { teacherQueries } from '@/api/teacher/query'
import { countryQueries } from '@/api/country/query'
import NavigationBar from '@/shared/component/NavigationBar'
import { TeacherResume } from '@/type/teacher'

const ResumeList = () => {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const size = 10

  // 필터링 상태
  const [filters, setFilters] = useState<{
    genderType?: 'MALE' | 'FEMALE'
    countryId?: number
    fromBirthDate?: string
    toBirthDate?: string
    hasVisa?: boolean
    visaType?: 'E7' | 'E2' | 'OTHERS'
  }>({})

  const { data, isLoading, error } = useQuery(
    teacherQueries.list(page - 1, size, filters),
  )

  const {
    data: countries,
    isLoading: countriesLoading,
    error: countriesError,
  } = useQuery(countryQueries.list())

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value)
  }

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value === '' ? undefined : value,
    }))
    setPage(1) // 필터 변경 시 첫 페이지로 이동
  }

  const handleFilterReset = () => {
    setFilters({})
    setPage(1)
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

        {/* 필터링 UI */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            필터
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel>성별</InputLabel>
                <Select
                  value={filters.genderType || ''}
                  label="성별"
                  onChange={e =>
                    handleFilterChange('genderType', e.target.value)
                  }
                >
                  <MenuItem value="">전체</MenuItem>
                  <MenuItem value="MALE">남성</MenuItem>
                  <MenuItem value="FEMALE">여성</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel>국가</InputLabel>
                <Select
                  value={filters.countryId || ''}
                  label="국가"
                  disabled={countriesLoading}
                  onChange={e =>
                    handleFilterChange(
                      'countryId',
                      e.target.value ? Number(e.target.value) : '',
                    )
                  }
                >
                  <MenuItem value="">전체</MenuItem>
                  {countriesLoading ? (
                    <MenuItem disabled>로딩 중...</MenuItem>
                  ) : countriesError ? (
                    <MenuItem disabled>국가 목록을 불러올 수 없습니다</MenuItem>
                  ) : countries && countries.length > 0 ? (
                    countries.map(country => (
                      <MenuItem key={country.id} value={country.id}>
                        <span className="mr-2">{country.flag}</span>
                        {country.countryNameEn}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>국가 목록이 없습니다</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <TextField
                fullWidth
                size="small"
                label="생년월일 시작"
                type="date"
                value={filters.fromBirthDate || ''}
                onChange={e =>
                  handleFilterChange('fromBirthDate', e.target.value)
                }
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <TextField
                fullWidth
                size="small"
                label="생년월일 끝"
                type="date"
                value={filters.toBirthDate || ''}
                onChange={e =>
                  handleFilterChange('toBirthDate', e.target.value)
                }
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel>비자 보유</InputLabel>
                <Select
                  value={filters.hasVisa === undefined ? '' : filters.hasVisa}
                  label="비자 보유"
                  onChange={e =>
                    handleFilterChange(
                      'hasVisa',
                      e.target.value === ''
                        ? undefined
                        : e.target.value === 'true',
                    )
                  }
                >
                  <MenuItem value="">전체</MenuItem>
                  <MenuItem value="true">보유</MenuItem>
                  <MenuItem value="false">미보유</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel>비자 종류</InputLabel>
                <Select
                  value={filters.visaType || ''}
                  label="비자 종류"
                  onChange={e => handleFilterChange('visaType', e.target.value)}
                >
                  <MenuItem value="">전체</MenuItem>
                  <MenuItem value="E7">E7</MenuItem>
                  <MenuItem value="E2">E2</MenuItem>
                  <MenuItem value="OTHERS">기타</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  onClick={handleFilterReset}
                  size="small"
                >
                  필터 초기화
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>

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
