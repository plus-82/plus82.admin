'use client'

import { useState, MouseEvent } from 'react'
import { toast } from 'react-toastify'

import { Icon } from '@/shared/component/icon'
import { colors } from '@/shared/config'
import { JobPostRelationDetail } from '@/type/resume'

import { CoverLetter } from './cover-letter'
import { Resume } from './resume'
import { convertToResume } from '../lib/convert-to-resume'
import { downloadPDF, renderToTempContainer } from '../lib/download-pdf'

type Props = {
  resumeRelation: JobPostRelationDetail
}

export const DownloadResumeRelationButton = ({ resumeRelation }: Props) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleDownload = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    event.preventDefault()

    setIsLoading(true)

    const elementIds: string[] = ['resume-pdf', 'cover-letter-pdf']
    const containers: HTMLDivElement[] = []

    try {
      // 함수로 분리하여 사용
      containers.push(
        renderToTempContainer(
          elementIds[0],
          <Resume resume={convertToResume(resumeRelation)} />,
        ),
      )
      containers.push(
        renderToTempContainer(
          elementIds[1],
          <CoverLetter coverLetter={resumeRelation.coverLetter} />,
        ),
      )

      await new Promise(resolve => setTimeout(resolve, 100))

      await downloadPDF(elementIds, resumeRelation.resumeTitle)

      containers.forEach(container => document.body.removeChild(container))
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Failed to download resume')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={isLoading}
      className="body-large flex gap-0.5 text-gray-700"
    >
      <Icon name="Download" size="medium" color={colors.gray[700]} />
      {isLoading ? '다운로드 중...' : 'PDF로 다운받기'}
    </button>
  )
}
