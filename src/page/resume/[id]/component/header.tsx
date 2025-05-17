import { JobPostRelationDetail } from '@/type/resume'

import {
  DownloadFileResumeRelationButton,
  DownloadResumeRelationButton,
} from '../component/download-resume'

type Props = {
  resumeRelation: JobPostRelationDetail
}

export const Header = ({ resumeRelation }: Props) => {
  const hasFile = resumeRelation.filePath !== null

  return (
    <div className="mb-4">
      <h2 className="title-medium mb-1 font-bold text-gray-900">
        {resumeRelation.jobPostTitle}
      </h2>
      <div className="flex items-center justify-between">
        <p className="title-small font-medium text-gray-700">
          <span>지원 일자: </span>
          <span>{resumeRelation.submittedDate}</span>
        </p>
        {hasFile ? (
          <DownloadFileResumeRelationButton resumeRelation={resumeRelation} />
        ) : (
          <DownloadResumeRelationButton resumeRelation={resumeRelation} />
        )}
      </div>
    </div>
  )
}
