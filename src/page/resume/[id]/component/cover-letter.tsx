type Props = {
  coverLetter: string
}

export const CoverLetter = ({ coverLetter }: Props) => {
  return (
    <section>
      <h3 className="title-medium flex h-[42px] items-center font-bold text-blue-800">
        Cover Letter
      </h3>
      <div className="title-small scrollbar light gutter-stable max-h-[400px] min-h-[200px] w-full whitespace-pre-line rounded-lg border border-gray-300 py-3 pl-3 pr-1 font-normal leading-[28px] text-gray-900">
        {coverLetter}
      </div>
    </section>
  )
}
