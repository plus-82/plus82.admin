import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { PDFDocument } from 'pdf-lib'
import { createRoot } from 'react-dom/client'

export const renderToTempContainer = (
  id: string,
  element: React.ReactNode,
): HTMLDivElement => {
  const container = document.createElement('div')
  container.id = id
  container.style.position = 'absolute'
  container.style.left = '-9999px'
  document.body.appendChild(container)
  createRoot(container).render(element)

  return container
}

const captureElementAsImage = async (
  elementId: string,
): Promise<HTMLCanvasElement | null> => {
  const element = document.getElementById(elementId)
  if (!element) return null

  return await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    imageTimeout: 0,
    removeContainer: true,
    backgroundColor: '#ffffff',
  })
}

export const convertToPDF = async (elementIds: string[]) => {
  const canvases = await Promise.all(
    elementIds.map(id => captureElementAsImage(id)),
  )

  const firstCanvas = canvases.find(Boolean)
  if (!firstCanvas) return

  const pdf = new jsPDF({
    unit: 'mm',
    format: 'a4',
    compress: true,
  })

  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()

  canvases.forEach((canvas, idx) => {
    if (!canvas) return

    const imgData = canvas.toDataURL('image/png')
    const widthRatio = pageWidth / canvas.width
    const heightRatio = pageHeight / canvas.height
    const ratio = Math.min(widthRatio, heightRatio)
    const imgWidth = canvas.width * ratio
    const imgHeight = canvas.height * ratio
    const x = (pageWidth - imgWidth) / 2
    const y = (pageHeight - imgHeight) / 2

    if (idx !== 0) pdf.addPage()
    pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight)
  })

  return pdf
}

export const downloadPDF = async (elementIds: string[], fileName: string) => {
  try {
    const pdf = await convertToPDF(elementIds)

    if (!pdf) return

    pdf.save(`${fileName}.pdf`)
  } catch (error) {
    console.error('PDF 생성 중 오류 발생:', error)
  }
}

export const mergePdfs = async (
  resumePdfBytes: Uint8Array,
  coverLetterPdfBytes?: ArrayBuffer,
): Promise<Uint8Array> => {
  const mergedPdf = await PDFDocument.create()

  const resumePdf = await PDFDocument.load(resumePdfBytes)

  const resumePages = await mergedPdf.copyPages(
    resumePdf,
    resumePdf.getPageIndices(),
  )
  resumePages.forEach(page => mergedPdf.addPage(page))

  if (coverLetterPdfBytes) {
    const coverLetterPdf = await PDFDocument.load(coverLetterPdfBytes)

    const coverPages = await mergedPdf.copyPages(
      coverLetterPdf,
      coverLetterPdf.getPageIndices(),
    )
    coverPages.forEach(page => mergedPdf.addPage(page))
  }

  return await mergedPdf.save()
}

export const downloadFile = async (blob: Blob, fileName: string) => {
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = fileName
  link.click()
  URL.revokeObjectURL(link.href)
}
