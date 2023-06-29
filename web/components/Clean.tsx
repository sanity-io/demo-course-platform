import {vercelStegaSplit} from '@vercel/stega'

export function clean(value?: string | null): string {
  return value ? vercelStegaSplit(value).cleaned : ``
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
