'use client'

import { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'

import { Spinner } from '@/shared/component/spinner'
import { cn } from '@/shared/lib/util'

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

type Props = {
  className?: string
  width?: number
  filePath: string
}

export const PDFViewer = ({ filePath, className, width = 800 }: Props) => {
  const [numPages, setNumPages] = useState<number>()

  const handleDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
  }

  return (
    <div className={cn('flex h-full w-full flex-col', className)}>
      <div className="relative flex-1 overflow-auto">
        <Document
          file={`/cdn/${filePath}`}
          onLoadSuccess={handleDocumentLoadSuccess}
          className="flex flex-col items-center"
          loading={<Spinner />}
        >
          {numPages &&
            Array.from(new Array(numPages), (_, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                className="mb-4 max-w-full last:mb-0"
                width={width}
              />
            ))}
        </Document>
      </div>
    </div>
  )
}
