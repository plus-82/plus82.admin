'use client'

import { useState, MouseEvent } from 'react'
import { toast } from 'react-toastify'

import { downloadFile } from '../lib/download-pdf'

type Props = {
  filePath: string
  fileName: string
}

export const DownloadResumeFileButton = ({ filePath, fileName }: Props) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleDownloadFile = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    event.preventDefault()

    setIsLoading(true)
    try {
      const response = await fetch(`https://d1zl1w0yhwh5x4.cloudfront.net/${filePath}`)

      const blob = await response.blob()
      await downloadFile(blob, fileName)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Failed to download resume file')
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleDownloadFile}
      disabled={isLoading}
      className="w-full p-3 text-left disabled:bg-gray-100 disabled:text-gray-500"
    >
      {isLoading ? 'Downloading...' : 'Download'}
    </button>
  )
}
