import {vercelStegaSplit} from '@vercel/stega'

export default function Subtitle({subtitle}: {subtitle: string}) {
  const {cleaned, encoded} = vercelStegaSplit(subtitle)

  return cleaned ? (
    <h2 className="uppercase tracking-widest font-bold text-xs md:text-sm text-cyan-500">
      {cleaned}
      {encoded ? <div style={{display: 'none'}}>{encoded}</div> : null}
    </h2>
  ) : null
}
