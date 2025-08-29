import { useCallback, useRef } from 'react'

/**
 * Alarm: Web Audio beep + Notification + Vibration
 * - Call `ensurePermission()` once on user interaction (button) to prime notifications and audio.
 * - Call `ring(label)` to alert when countdown hits zero.
 */
export function useAlarm() {
  const audioCtxRef = useRef(null)

  const ensurePermission = useCallback(async () => {
    // Notifications need permission
    if ('Notification' in window && Notification.permission === 'default') {
      try { await Notification.requestPermission() } catch {}
    }
    // Prime AudioContext by creating/resuming on user gesture
    if (!audioCtxRef.current && 'AudioContext' in window) {
      audioCtxRef.current = new AudioContext()
      // Some browsers need an explicit resume after user interaction
      try { await audioCtxRef.current.resume() } catch {}
    }
  }, [])

  const playBeepPattern = useCallback(async () => {
    const ctx = audioCtxRef.current || (window.AudioContext ? new AudioContext() : null)
    if (!ctx) return
    if (ctx.state === 'suspended') { try { await ctx.resume() } catch {} }

    // Simple 3-beep pattern
    const now = ctx.currentTime
    const beeps = [0, 0.25, 0.5].map((t) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.value = 880 // A5
      gain.gain.setValueAtTime(0.0001, now + t)
      gain.gain.exponentialRampToValueAtTime(0.3, now + t + 0.01)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + t + 0.18)
      osc.connect(gain).connect(ctx.destination)
      osc.start(now + t)
      osc.stop(now + t + 0.2)
      return osc
    })
    // No need to keep refs; GC after stop
  }, [])

  const ring = useCallback((label = 'Timer finished') => {
    // Notification
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification('⏰ Time’s up!', { body: label, tag: 'online-timer' })
      } catch {}
    }
    // Vibration for mobile
    if (navigator.vibrate) navigator.vibrate([120, 60, 120])
    // Beep
    playBeepPattern()
  }, [playBeepPattern])

  return { ensurePermission, ring }
}
