import React from 'react'

/**
 * Simple circular progress using SVG.
 * value: 0..1
 */
export default function ProgressRing({ value = 0 }) {
  const clamped = Math.max(0, Math.min(1, value))
  const size = 120
  const stroke = 10
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const dash = c * clamped

  return (
    <svg width={size} height={size} role="img" aria-label={`Progress ${Math.round(clamped*100)}%`}>
      <circle cx={size/2} cy={size/2} r={r} stroke="rgba(255,255,255,0.12)" strokeWidth={stroke} fill="none"/>
      <circle
        cx={size/2} cy={size/2} r={r}
        stroke="currentColor" strokeWidth={stroke} fill="none"
        strokeDasharray={`${dash} ${c}`}
        strokeLinecap="round"
        style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', color: '#7aa2ff' }}
      />
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="16" fill="#e7ebff">
        {Math.round(clamped*100)}%
      </text>
    </svg>
  )
}
