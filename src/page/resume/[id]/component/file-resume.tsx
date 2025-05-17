import { JobPostRelationDetail } from '@/type/resume'

import { ApplicationSidePanel } from './application-side-panel/side-panel'
import { CoverLetter } from './cover-letter'
import { Header } from './header'
import { PDFViewer } from './pdf-viewer'

export const FileResume = ({
  jobPostResumeRelation,
}: {
  jobPostResumeRelation: JobPostRelationDetail
}) => {
  return (
    <div className="flex gap-5">
      <div className="flex-grow">
        <Header resumeRelation={jobPostResumeRelation} />
        <PDFViewer
          filePath={jobPostResumeRelation.filePath!}
          className="mb-8 h-fit"
        />
        {jobPostResumeRelation.coverLetter && (
          <CoverLetter coverLetter={jobPostResumeRelation.coverLetter} />
        )}
      </div>
      <ApplicationSidePanel
        values={{
          status: jobPostResumeRelation.status,
          memo: jobPostResumeRelation.academyMemo ?? '',
        }}
      />
    </div>
  )
}
