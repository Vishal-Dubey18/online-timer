import React, { useEffect, useState } from 'react'
import Countdown from './components/Countdown.jsx'
import Stopwatch from './components/Stopwatch.jsx'
import { useNow } from './hooks/useNow.js'
import { useAlarm } from './hooks/useAlarm.js'

// Optional: lightweight "Network Time" using WorldTimeAPI.
// We only use this to compute an offset so our "now" is closer to server time.
// App still works if this fails — we degrade gracefully.
async function fetchNetworkTimeOffset() {
  try {
    // Prefer UTC to avoid DST gotchas
    const res = await fetch('https://worldtimeapi.org/api/timezone/Etc/UTC', { cache: 'no-store' })
    if (!res.ok) throw new Error('Network time fetch failed')
    const data = await res.json()
    // worldtimeapi returns unixtime in seconds
    const serverMs = (data.unixtime ?? Math.floor(new Date(data.datetime).getTime()/1000)) * 1000
    const offset = serverMs - Date.now()
    return offset
  } catch {
    return 0 // fallback: no offset
  }
}

export default function App() {
  const [offset, setOffset] = useState(0)
  const now = useNow(250, offset) // tick about 4x per second, compute from Date.now()+offset
  const { ensurePermission } = useAlarm()

  useEffect(() => {
    fetchNetworkTimeOffset().then(setOffset) // fire and forget; non-blocking
  }, [])

  // Simple readable network/local time strings
  const localStr = new Date(Date.now()).toLocaleTimeString()
  const networkStr = new Date(Date.now() + offset).toLocaleTimeString() + (offset ? ' (network)' : ' (local)')

  return (
    <div className="container">
      <header className="header">
        <h1>Online Timer</h1>
        <div className="time-bar">
          <span title="Local system clock">Local: {localStr}</span>
          <span title="Fetched via WorldTimeAPI">Now: {networkStr}</span>
        </div>
        <p className="hint">
          Tip: click “Enable Alerts” to allow notification & sound for alarms (recommended).
        </p>
        <div className="actions">
          <button className="btn" onClick={ensurePermission}>Enable Alerts</button>
        </div>
      </header>

      <main className="grid">
        <section className="card">
          <h2>Countdown</h2>
          <Countdown now={now} />
        </section>

        <section className="card">
          <h2>Stopwatch</h2>
          <Stopwatch now={now} />
        </section>
      </main>

      <footer className="footer">
        <p>
          Built with React + HTML + CSS. Network time by <a href="https://worldtimeapi.org/" target="_blank" rel="noreferrer">WorldTimeAPI</a>.
        </p>
      </footer>
    </div>
  )
}
