import React, { useMemo, useRef, useState } from 'react'
import { formatMillis } from '../utils/time.js'

/**
 * Stopwatch
 * elapsed = (running ? (now - startTs) : 0) + baseMs
 * - baseMs accumulates time from previous runs
 * - Lap times recorded relative to start of run
 */
export default function Stopwatch({ now }) {
  const [running, setRunning] = useState(false)
  const [startTs, setStartTs] = useState(null)
  const [baseMs, setBaseMs] = useState(0)
  const [laps, setLaps] = useState([])
  const lapStartRef = useRef(null)

  const elapsed = useMemo(() => {
    return (running && startTs != null) ? (now - startTs) + baseMs : baseMs
  }, [running, startTs, baseMs, now])

  const start = () => {
    if (running) return
    const nowTs = Date.now()
    setRunning(true)
    setStartTs(nowTs)
    lapStartRef.current = nowTs
  }

  const pause = () => {
    if (!running) return
    const nowTs = Date.now()
    setRunning(false)
    setBaseMs(baseMs + (nowTs - startTs))
    setStartTs(null)
  }

  const reset = () => {
    setRunning(false)
    setStartTs(null)
    setBaseMs(0)
    setLaps([])
  }

  const lap = () => {
    if (!running || lapStartRef.current == null) return
    const nowTs = Date.now()
    const lapMs = nowTs - lapStartRef.current
    lapStartRef.current = nowTs
    setLaps((prev) => [{ t: Date.now(), ms: lapMs, total: elapsed }, ...prev].slice(0, 100))
  }

  return (
    <>
      <div className="time-big" aria-live="polite">{formatMillis(elapsed)}</div>

      <div className="controls">
        {!running ? (
          <button className="btn success" onClick={start} aria-label="Start stopwatch">Start</button>
        ) : (
          <button className="btn warn" onClick={pause} aria-label="Pause stopwatch">Pause</button>
        )}
        <button className="btn" onClick={lap} disabled={!running} aria-label="Record lap">Lap</button>
        <button className="btn danger" onClick={reset} aria-label="Reset stopwatch">Reset</button>
      </div>

      <ul className="laps" aria-label="Lap times">
        {laps.map((l, i) => (
          <li key={l.t}>
            <span>Lap {laps.length - i}</span>
            <span className="pill">{formatMillis(l.ms)}</span>
            <span className="pill">Total {formatMillis(l.total)}</span>
          </li>
        ))}
      </ul>
    </>
  )
}
