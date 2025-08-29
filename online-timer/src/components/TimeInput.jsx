import React from 'react'
import { clamp } from '../utils/time.js'

/**
 * Reusable H/M/S inputs for countdown.
 */
export default function TimeInput({ value, onChange, disabled }) {
  const { h, m, s } = value
  const onNum = (key) => (e) => {
    const v = e.target.value === '' ? '' : Number(e.target.value)
    if (v === '') return onChange({ ...value, [key]: '' })
    const bounded = key === 'h' ? clamp(v, 0, 99) : clamp(v, 0, 59)
    onChange({ ...value, [key]: bounded })
  }

  return (
    <div className="row" aria-label="Set timer">
      <label className="pill" htmlFor="h">Hours</label>
      <input id="h" className="input" type="number" min="0" max="99" value={h} onChange={onNum('h')} disabled={disabled} />
      <label className="pill" htmlFor="m">Minutes</label>
      <input id="m" className="input" type="number" min="0" max="59" value={m} onChange={onNum('m')} disabled={disabled} />
      <label className="pill" htmlFor="s">Seconds</label>
      <input id="s" className="input" type="number" min="0" max="59" value={s} onChange={onNum('s')} disabled={disabled} />
    </div>
  )
}
