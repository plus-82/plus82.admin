import { useQuery } from '@tanstack/react-query'
import { isNil } from 'lodash-es'
import { useParams } from 'react-router-dom'

import { teacherQueries } from '@/api/teacher/query'
import NavigationBar from '@/shared/component/NavigationBar'
import { Icon } from '@/shared/component/icon'

const TeacherResumeDetailPage = () => {
  const { resumeId } = useParams()

  const { data, isLoading, error } = useQuery(
    teacherQueries.detail(Number(resumeId)),
  )

  if (isLoading) {
    return (
      <>
        <NavigationBar />
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-lg">로딩 중...</div>
        </div>
      </>
    )
  }

  if (error) {
    return (
      <>
        <NavigationBar />
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-lg text-red-500">
            이력서를 불러오는데 실패했습니다.
          </div>
        </div>
      </>
    )
  }

  if (isNil(data)) {
    return (
      <>
        <NavigationBar />
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-lg">이력서가 존재하지 않습니다.</div>
        </div>
      </>
    )
  }

  return (
    <>
      <NavigationBar />
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="rounded-lg bg-white p-6 shadow-lg">
          {/* 헤더 */}
          <div className="mb-6 border-b border-gray-200 pb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="mb-2 text-3xl font-bold text-gray-900">
                  {data.firstName && data.lastName
                    ? `${data.lastName}${data.firstName}님의 이력서`
                    : '이력서'}
                </h1>
                <p className="text-gray-600">
                  최종 수정일: {new Date(data.updatedAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                {data.profileImagePath ? (
                  <img
                    src={`/cdn/${data.profileImagePath}`}
                    alt="프로필 이미지"
                    className="h-32 w-32 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gray-200">
                    <Icon
                      name="User"
                      size="custom"
                      className="h-20 w-20"
                      color="#424242"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 기본 정보 */}
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  개인 정보
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">이름:</span>
                    <span className="font-medium">
                      {data.firstName && data.lastName
                        ? `${data.lastName}${data.firstName}`
                        : '이름 없음'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">이메일:</span>
                    <span className="font-medium">{data.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">성별:</span>
                    <span className="font-medium">
                      {data.genderType === 'MALE' ? '남성' : '여성'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">생년월일:</span>
                    <span className="font-medium">
                      {data.birthDate
                        ? new Date(data.birthDate).toLocaleDateString()
                        : '정보 없음'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  학력 정보
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">학위:</span>
                    <span className="font-medium">{data.degree}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">전공:</span>
                    <span className="font-medium">{data.major}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 비자 정보 */}
          <div className="mb-8">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              비자 정보
            </h3>
            <div className="rounded-lg bg-gray-50 p-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">비자 보유:</span>
                  <span className="font-medium">
                    {data.hasVisa ? '보유' : '미보유'}
                  </span>
                </div>
                {data.hasVisa && data.visaType && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">비자 종류:</span>
                    <span className="font-medium">{data.visaType}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 가르칠 수 있는 대상 */}
          <div className="mb-8">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              가르칠 수 있는 대상
            </h3>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
              <div
                className={`rounded-lg p-3 text-center ${
                  data.forKindergarten
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-500 line-through'
                }`}
              >
                유치원
              </div>
              <div
                className={`rounded-lg p-3 text-center ${
                  data.forElementary
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-500 line-through'
                }`}
              >
                초등학교
              </div>
              <div
                className={`rounded-lg p-3 text-center ${
                  data.forMiddleSchool
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-500 line-through'
                }`}
              >
                중학교
              </div>
              <div
                className={`rounded-lg p-3 text-center ${
                  data.forHighSchool
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-500 line-through'
                }`}
              >
                고등학교
              </div>
              <div
                className={`rounded-lg p-3 text-center ${
                  data.forAdult
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-500 line-through'
                }`}
              >
                성인
              </div>
            </div>
          </div>

          {/* 자기소개 */}
          <div className="mb-8">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              자기소개
            </h3>
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="whitespace-pre-wrap text-gray-700">
                {data.personalIntroduction || '자기소개가 없습니다.'}
              </p>
            </div>
          </div>

          {/* 뒤로가기 버튼 */}
          <div className="flex justify-center border-t border-gray-200 pt-6">
            <button
              onClick={() => window.history.back()}
              className="rounded-lg bg-gray-600 px-6 py-2 text-white transition-colors hover:bg-gray-700"
            >
              목록으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default TeacherResumeDetailPage
