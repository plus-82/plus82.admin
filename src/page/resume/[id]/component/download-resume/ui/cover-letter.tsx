type Props = {
  coverLetter: string
}

export const CoverLetter = ({ coverLetter }: Props) => {
  return (
    <div className="flex h-[1311px] w-[927px] bg-white">
      <div className="h-full w-[52px] bg-blue-800" />
      <div className="my-[60px] ml-[80px] w-[654px]">
        <div className="mb-5 flex flex-col pb-5">
          <h2 className="display-small mb-4 font-bold text-blue-800">
            Cover Letter
          </h2>
          <p className="title-small whitespace-pre-line font-normal text-gray-900">
            {coverLetter}
          </p>
        </div>
      </div>
    </div>
  )
}
