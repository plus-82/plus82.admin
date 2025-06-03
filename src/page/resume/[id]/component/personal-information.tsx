import { Icon } from '@/shared/component/icon'
import { colors } from '@/shared/config'
import { JobPostRelationDetail } from '@/type/resume'

import { convertStudentTypeToArray } from '../lib/convert-to-student-type'

type Props = {
  jobPostResumeRelation: JobPostRelationDetail
}

export const PersonalInformation = ({ jobPostResumeRelation }: Props) => {
  const studentType = convertStudentTypeToArray(jobPostResumeRelation)

  return (
    <section className="flex items-center gap-6 border-b border-gray-300 px-4 py-6">
      {(() => {
        if (jobPostResumeRelation.profileImagePath) {
          return (
            <img
              src={`/cdn/${jobPostResumeRelation.profileImagePath}`}
              alt={jobPostResumeRelation.resumeTitle}
              className="h-[130px] w-[130px] rounded-full"
            />
          )
        }

        return (
          <div className="flex h-[110px] w-[110px] items-center justify-center rounded-full bg-gray-300">
            <Icon
              name="User"
              size="custom"
              className="h-[100px] w-[100px]"
              color={colors.gray[700]}
            />
          </div>
        )
      })()}
      <div>
        <div className="mb-[14px] flex items-center gap-4">
          <h3 className="title-medium font-bold text-gray-900">
            {jobPostResumeRelation.firstName} {jobPostResumeRelation.lastName}
          </h3>
          <p className="body-large space-x-2 font-medium text-gray-700 *:inline-block">
            <span>{jobPostResumeRelation.birthDate}</span>
            <span>•</span>
            <span>{jobPostResumeRelation.genderType}</span>
          </p>
        </div>
        <dl>
          <div className="flex justify-between">
            <div className="body-large w-[410px] space-y-3 font-medium">
              <div className="flex gap-2">
                <dt className="w-[56px] shrink-0 text-gray-500">이메일</dt>
                <dd className="flex-grow text-gray-900">
                  {jobPostResumeRelation.email}
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-[56px] shrink-0 text-gray-500">국적</dt>
                <dd className="flex-grow text-gray-900">
                  {jobPostResumeRelation.countryNameEn}
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-[56px] shrink-0 text-gray-500">거주 지역</dt>
                <dd className="flex-grow text-gray-900">
                  {jobPostResumeRelation.residenceCountryNameEn}
                </dd>
              </div>
            </div>
            <div className="body-large w-[418px] font-medium">
              <div className="mb-[20px] flex h-11 gap-2">
                <dt className="w-[28px] text-gray-500">학력</dt>
                <dd className="flex-grow text-gray-900">
                  {jobPostResumeRelation.degree}
                  {jobPostResumeRelation.major &&
                    ` / ${jobPostResumeRelation.major}`}
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-[28px] text-gray-500">비자</dt>
                <dd className="flex-grow text-gray-900">
                  {jobPostResumeRelation.hasVisa
                    ? jobPostResumeRelation.visaType
                    : 'No'}
                </dd>
              </div>
            </div>
          </div>
        </dl>
        <div className="body-large mt-3 flex gap-2 font-medium">
          <dt className="w-[56px] shrink-0 text-gray-500">학생 유형</dt>
          <dd className="flex flex-grow gap-4 text-gray-900">
            {studentType.map(type => (
              <span key={type}>{type}</span>
            ))}
          </dd>
        </div>
      </div>
    </section>
  )
}
