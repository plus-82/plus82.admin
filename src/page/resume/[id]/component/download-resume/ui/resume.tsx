import { format } from 'date-fns'
import { capitalize } from 'lodash-es'

import { Heading } from '@/shared/component/heading'
import { Icon } from '@/shared/component/icon'
import { colors } from '@/shared/config'
import { type Resume as ResumeType } from '@/type/resume'

type Props = {
  resume: ResumeType
}

export const Resume = ({ resume }: Props) => {
  const getStudentType = (resume: ResumeType) => {
    const studentTypeArray = []

    if (resume.forKindergarten) studentTypeArray.push('Kindergarten')
    if (resume.forElementary) studentTypeArray.push('Elementary')
    if (resume.forMiddleSchool) studentTypeArray.push('Middle School')
    if (resume.forHighSchool) studentTypeArray.push('High School')
    if (resume.forAdult) studentTypeArray.push('Adult')

    return studentTypeArray
  }

  return (
    <div className="flex h-[1311px] w-[927px] bg-white">
      <div className="h-full w-[52px] bg-blue-800" />
      <div className="my-[60px] ml-[80px] w-[654px]">
        <div className="mb-5 flex items-center justify-between pb-5">
          <div>
            <h2 className="title-large mb-1 text-gray-900">
              {capitalize(resume.firstName)} {capitalize(resume.lastName)}
            </h2>
            <div className="body-large mb-4 flex font-normal text-gray-700">
              <div className="after:mx-2 after:inline-block after:text-gray-500 after:content-['•']">
                {format(resume.birthDate, 'yyyy.MM.dd')}
              </div>
              <div>{capitalize(resume.genderType)}</div>
            </div>
            <div className="flex gap-1">
              <Icon name="Message" color={colors.gray[500]} size="medium" />
              <span className="body-large font-normal text-gray-700">
                {resume.email}
              </span>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-full border border-gray-200">
            {resume.profileImagePath ? (
              <img
                src={`/cdn/${resume.profileImagePath}`}
                alt="profile"
                className="h-[150px] w-[150px]"
              />
            ) : (
              <div className="flex h-[150px] w-[150px] items-center justify-center rounded-full bg-gray-200">
                <Icon
                  name="User"
                  size="custom"
                  className="h-[100px] w-[100px]"
                  color={colors.gray[700]}
                />
              </div>
            )}
          </div>
        </div>
        <div className="title-small mb-20 font-normal text-gray-900">
          {resume.personalIntroduction}
        </div>
        <div className="grid grid-cols-2 gap-x-[100px] gap-y-[80px]">
          <div>
            <Heading className="title-medium mb-4 h-11 border-blue-800 text-blue-800">
              Nationality
            </Heading>
            <span className="title-small text-gray-900">
              {resume.countryNameEn ?? '―'}
            </span>
          </div>
          <div>
            <Heading className="title-medium mb-4 h-11 border-blue-800 text-blue-800">
              Current Country of Residence
            </Heading>
            <span className="title-small text-gray-900">
              {resume.residenceCountryNameEn ?? '―'}
            </span>
          </div>
          <div>
            <Heading className="title-medium mb-4 h-11 border-blue-800 text-blue-800">
              Degrees and Majors
            </Heading>
            <div className="flex flex-col gap-1">
              <div className="title-small text-gray-900">
                {resume.degree ?? '―'}
              </div>
              <div className="body-large font-normal text-gray-700">
                {resume.major ?? '―'}
              </div>
            </div>
          </div>
          <div>
            <Heading className="title-medium mb-4 h-11 border-blue-800 text-blue-800">
              Visa
            </Heading>
            <span className="title-small text-gray-900">
              {resume.hasVisa ? resume.visaType : 'No'}
            </span>
          </div>
          <div>
            <Heading className="title-medium mb-4 h-11 border-blue-800 text-blue-800">
              Student Type
            </Heading>
            <ul className="title-small ml-5 flex flex-col gap-1 font-normal text-gray-900">
              {getStudentType(resume).map(studentType => (
                <li className="list-disc" key={studentType}>
                  {studentType}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
