'use client'

import { useState, MouseEvent } from 'react'
import { toast } from 'react-toastify'

import { Icon } from '@/shared/component/icon'
import { colors } from '@/shared/config'
import { JobPostRelationDetail } from '@/type/resume'

import { CoverLetter } from './cover-letter'
import {
  convertToPDF,
  downloadFile,
  mergePdfs,
  renderToTempContainer,
} from '../lib/download-pdf'

type Props = {
  resumeRelation: JobPostRelationDetail
}

const ELEMENT_ID = 'cover-letter-pdf'

export const DownloadFileResumeRelationButton = ({ resumeRelation }: Props) => {
  const [isLoading, setIsLoading] = useState(false)

  const fetchResumePDF = async () => {
    const response = await fetch(`/cdn/${resumeRelation.filePath}`)
    const buffer = await response.arrayBuffer()

    return new Uint8Array(buffer)
  }

  const convertCoverLetterToPDF = async (): Promise<ArrayBuffer | null> => {
    const container: HTMLDivElement = renderToTempContainer(
      ELEMENT_ID,
      <CoverLetter coverLetter={resumeRelation.coverLetter} />,
    )

    await new Promise(resolve => setTimeout(resolve, 100))

    const coverLetterPDF = await convertToPDF([ELEMENT_ID])

    document.body.removeChild(container)

    return coverLetterPDF?.output('arraybuffer') ?? null
  }

  const downloadResumePDF = async () => {
    const resumePdf = await fetchResumePDF()

    const blob = new Blob([resumePdf], { type: 'application/pdf' })

    await downloadFile(blob, resumeRelation.fileName ?? '이력서')
  }

  const downloadMergedResumePDF = async () => {
    const resumePdf = await fetchResumePDF()
    const coverLetterPDF = await convertCoverLetterToPDF()

    const mergedPDF = await mergePdfs(
      resumePdf,
      ...(coverLetterPDF ? [coverLetterPDF] : []),
    )

    const blob = new Blob([mergedPDF], { type: 'application/pdf' })

    await downloadFile(blob, resumeRelation.fileName ?? '이력서')
  }

  const handleDownload = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    event.preventDefault()

    setIsLoading(true)

    try {
      if (resumeRelation.coverLetter) {
        await downloadMergedResumePDF()
      } else {
        await downloadResumePDF()
      }
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
