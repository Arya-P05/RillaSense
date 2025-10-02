import { useEffect, useRef, useState } from 'react'

/**
 * @typedef {Object} OvertimePlayerProps
 * @property {string} src                - Video source URL
 * @property {string=} poster            - Poster/thumbnail URL
 * @property {string=} title             - Accessible title/label
 * @property {boolean=} isActive         - If true, auto-play when mounted/visible; pause when false
 * @property {boolean=} autoPlay         - Attempt autoplay when active (default true)
 * @property {boolean=} muted            - Start muted to satisfy autoplay policies (default true)
 * @property {boolean=} loop             - Loop playback (default true)
 * @property {boolean=} controls         - Show native controls (default false)
 * @property {boolean=} resetOnDeactivate- Reset to start when deactivated (default true)
 * @property {function=} onEnded         - Callback when video ends
 */

/**
 * OvertimePlayer - lightweight video player ready for carousel usage.
 * - Autoplay/pause driven by `isActive`.
 * - Handles autoplay policy fallbacks with a tap-to-play overlay.
 * - Maintains a 16:9 aspect ratio; adjust as needed.
 * @param {OvertimePlayerProps} props
 */
export default function OvertimePlayer({
  src,
  poster,
  title,
  isActive = false,
  autoPlay = true,
  muted = true,
  loop = true,
  controls = false,
  resetOnDeactivate = true,
  onEnded
}) {
  const videoRef = useRef(null)
  const [showTapOverlay, setShowTapOverlay] = useState(false)

  // Try to play/pause in response to active state changes
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const v = /** @type {HTMLVideoElement} */ (video)

    if (isActive) {
      if (autoPlay) {
        const playAttempt = v.play()
        if (playAttempt && typeof playAttempt.then === 'function') {
          playAttempt.catch(() => {
            setShowTapOverlay(true)
          })
        }
      }
    } else {
      try { v.pause() } catch { /* ignore pause errors */ }
      if (resetOnDeactivate) {
        try { v.currentTime = 0 } catch { /* ignore seek errors */ }
      }
    }
  }, [isActive, autoPlay, resetOnDeactivate])

  const handleUserPlay = () => {
    const v = /** @type {HTMLVideoElement} */ (videoRef.current)
    if (!v) return
    setShowTapOverlay(false)
    // Unmute on explicit user intent
    try { v.muted = false } catch { /* ignore mute flag errors */ }
    v.play().catch(() => {
      // If still blocked, re-show overlay
      setShowTapOverlay(true)
    })
  }

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        // 16:9 responsive box; change to 9:16 for vertical shorts if desired
        aspectRatio: '16 / 9',
        backgroundColor: '#000',
        overflow: 'hidden',
        borderRadius: 12
      }}
      aria-label={title ?? 'overtime player'}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted={muted}
        loop={loop}
        controls={controls}
        playsInline
        preload="metadata"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block'
        }}
        onEnded={onEnded}
      />

      {showTapOverlay && (
        <button
          type="button"
          onClick={handleUserPlay}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(0deg, rgba(0,0,0,0.4), rgba(0,0,0,0.4))',
            color: 'white',
            cursor: 'pointer',
            border: 'none'
          }}
          aria-label="Tap to play"
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: 'rgba(0,0,0,0.6)',
              border: '1px solid rgba(255,255,255,0.25)'
            }}
          >
            ▶
          </span>
        </button>
      )}
    </div>
  )
}


