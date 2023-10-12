import Clean from './Clean'

type PresentersProps = {
  presenters: {
    name: string
    title: string
    _id: string
  }[]
}

export default function Presenters(props: PresentersProps) {
  const {presenters = []} = props

  return (
    <div className="mr-auto flex flex-col gap-y-4">
      {presenters.map((presenter) => (
        <div key={presenter._id} className="mr-auto flex flex-col gap-y-2">
          <Clean as="div" value={presenter.name} />
          <Clean as="div" value={presenter.title} />
        </div>
      ))}
    </div>
  )
}
