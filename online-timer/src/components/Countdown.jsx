import React, { useEffect, useRef, useState } from 'react'
import TimeInput from './TimeInput.jsx'
import ProgressRing from './ProgressRing.jsx'
import { hmsToMs, msToHMS, formatHMS } from '../utils/time.js'
import { useAlarm } from '../hooks/useAlarm.js'

/**
 * Countdown
 * - We store `targetTs` when started: targetTs = now + inputMs
 * - Remaining is derived each tick: max(0, targetTs - now)
 * - Pause: swap targetTs->null, stash remaining in pausedMs; Resume: targetTs = now + pausedMs
 * - When reaches 0, fire alarm once.
 */
export default function Countdown({ now }) {
  const [hms, setHms] = useState({ h: 0, m: 5, s: 0 })
  const [targetTs, setTargetTs] = useState(null)      // ms timestamp or null
  const [pausedMs, setPausedMs] = useState(0)         // remaining ms when paused
  const [totalMs, setTotalMs] = useState(0)           // original duration for % ring
  const [status, setStatus] = useState('idle')        // 'idle' | 'running' | 'paused' | 'done'
  const firedRef = useRef(false)                      // prevent multiple alarms
  const { ring } = useAlarm()

  const inputMs = hmsToMs({
    h: Number(hms.h || 0),
    m: Number(hms.m || 0),
    s: Number(hms.s || 0),
  })

  useEffect(() => {
    if (status === 'running' && targetTs != null) {
      const remaining = Math.max(0, targetTs - now)
      if (remaining === 0 && !firedRef.current) {
        firedRef.current = true
        setStatus('done')
        setTargetTs(null)
        setPausedMs(0)
        ring('Countdown completed')
      }
    }
  }, [now, targetTs, status, ring])

  const start = () => {
    if (inputMs <= 0) return
    firedRef.current = false
    setTotalMs(inputMs)
    setTargetTs(Date.now() + inputMs)
    setStatus('running')
  }

  const pause = () => {
    if (status !== 'running' || targetTs == null) return
    const rem = Math.max(0, targetTs - Date.now())
    setPausedMs(rem)
    setTargetTs(null)
    setStatus('paused')
  }

  const resume = () => {
    if (status !== 'paused' || pausedMs <= 0) return
    firedRef.current = false
    setTargetTs(Date.now() + pausedMs)
    setStatus('running')
  }

  const reset = () => {
    setTargetTs(null)
    setPausedMs(0)
    setTotalMs(0)
    setStatus('idle')
    firedRef.current = false
  }

  const remainingMs = status === 'running' && targetTs != null
    ? Math.max(0, targetTs - now)
    : status === 'paused'
      ? pausedMs
      : status === 'done'
        ? 0
        : inputMs

  const percent = totalMs > 0 ? (1 - remainingMs / totalMs) : 0
  const display = formatHMS(msToHMS(remainingMs))

  const disabledInputs = status === 'running' || status === 'paused'

  return (
    <>
      <div className="time-big" aria-live="polite">{display}</div>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '8px 0 14px' }}>
        <ProgressRing value={percent} />
      </div>

      <TimeInput value={hms} onChange={setHms} disabled={disabledInputs} />

      <div className="controls">
        {status !== 'running' && status !== 'paused' && (
          <button className="btn primary" onClick={start} aria-label="Start countdown">Start</button>
        )}
        {status === 'running' && (
          <button className="btn warn" onClick={pause} aria-label="Pause countdown">Pause</button>
        )}
        {status === 'paused' && (
          <button className="btn success" onClick={resume} aria-label="Resume countdown">Resume</button>
        )}
        {(status === 'running' || status === 'paused' || status === 'done') && (
          <button className="btn danger" onClick={reset} aria-label="Reset countdown">Reset</button>
        )}
      </div>

      <p className="small">
        Alarm triggers when time reaches 00:00:00. Enable alerts for sound & notification.
      </p>
    </>
  )
}
