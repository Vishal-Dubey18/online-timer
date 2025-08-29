import { useEffect, useRef, useState } from 'react'

/**
 * A small ticker that updates "now" every `intervalMs`, but
 * always returns Date.now() + `offsetMs`. Because we derive
 * from Date.now(), we avoid drift even if intervals get throttled.
 */
export function useNow(intervalMs = 250, offsetMs = 0) {
  const [now, setNow] = useState(Date.now() + offsetMs)
  const offRef = useRef(offsetMs)

  useEffect(() => { offRef.current = offsetMs }, [offsetMs])

  useEffect(() => {
    let timer = null
    const tick = () => setNow(Date.now() + offRef.current)
    tick()
    timer = setInterval(tick, intervalMs)
    return () => clearInterval(timer)
  }, [intervalMs])

  return now
}
