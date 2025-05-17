'use client'

import { useState, MouseEvent } from 'react'
import { toast } from 'react-toastify'

import { resumeApi } from '@/api/resume/request'

import { Resume } from './resume'
import { downloadPDF, renderToTempContainer } from '../lib/download-pdf'

type Props = {
  resumeId: number
  onClick: () => void
}

const ELEMENT_ID = 'resume-pdf'

export const DownloadResumeButton = ({ resumeId, onClick }: Props) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleDownload = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    event.preventDefault()

    setIsLoading(true)

    try {
      const resume = await resumeApi.getResume(resumeId)

      const container = renderToTempContainer(
        ELEMENT_ID,
        <Resume resume={resume} />,
      )

      // 약간의 지연을 주어 렌더링이 완료되도록 함
      await new Promise(resolve => setTimeout(resolve, 100))

      // PDF 생성
      await downloadPDF([ELEMENT_ID], resume.title)

      // 정리: 임시 컨테이너 제거
      document.body.removeChild(container)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Failed to download resume')
    } finally {
      setIsLoading(false)
      onClick()
    }
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={isLoading}
      className="w-full p-3 text-left disabled:bg-gray-100 disabled:text-gray-500"
    >
      {isLoading ? 'Downloading...' : 'Download'}
    </button>
  )
}
