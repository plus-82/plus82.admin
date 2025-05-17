import { JobPostRelationDetail } from '@/type/resume'

import { ApplicationSidePanel } from './application-side-panel/side-panel'
import { CoverLetter } from './cover-letter'
import { Header } from './header'
import { Introduction } from './introduction'
import { PersonalInformation } from './personal-information'

type Props = {
  jobPostResumeRelation: JobPostRelationDetail
}

export const FormResume = ({ jobPostResumeRelation }: Props) => {
  return (
    <>
      <Header resumeRelation={jobPostResumeRelation} />
      <div className="space-y-8">
        <PersonalInformation jobPostResumeRelation={jobPostResumeRelation} />
        <div className="flex gap-5">
          <div className="flex-grow space-y-8">
            <Introduction
              personalIntroduction={jobPostResumeRelation.personalIntroduction}
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
      </div>
    </>
  )
}
