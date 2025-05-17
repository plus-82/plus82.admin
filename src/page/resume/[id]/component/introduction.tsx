type Props = {
  personalIntroduction: string
}

export const Introduction = ({ personalIntroduction }: Props) => {
  return (
    <section>
      <p className="title-small whitespace-pre-line font-normal text-gray-900">
        {personalIntroduction}
      </p>
    </section>
  )
}
