
import { useQuery } from '@tanstack/react-query'
import { isNil } from 'lodash-es'
import { useParams } from 'react-router-dom'

import { resumeApi } from '@/api/resume/request'
import { Layout } from '@/shared/component/layout'

import { FileResume } from './component/file-resume'
import { FormResume } from './component/form-resume'
import '../../../tailwind.css'

const ResumeDetailPage = () => {
  const { resumeId } = useParams()

  const { data } = useQuery({
    queryKey: ['resumes', resumeId],
    queryFn: () => resumeApi.getDetail(Number(resumeId)),
  })

  const isFileResume = data?.filePath !== null

  if (isNil(data)) {
    return <div>지원 내역이 존재하지 않아요</div>
  }

  return (
    <Layout wide>
      {isFileResume ? (
        <FileResume jobPostResumeRelation={data} />
      ) : (
        <FormResume jobPostResumeRelation={data} />
      )}
    </Layout>
  )
}

export default ResumeDetailPage