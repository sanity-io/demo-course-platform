import {vercelStegaSplit} from '@vercel/stega'

export function clean(value?: string | null) {
  return value ? vercelStegaSplit(value).cleaned : null
}

export default function Clean({value}: {value: string}) {
  const {cleaned, encoded} = vercelStegaSplit(value)

  return encoded ? (
    <>
      {cleaned}
      <span style={{display: 'none'}}>{encoded}</span>
    </>
  ) : (
    cleaned
  )
}
