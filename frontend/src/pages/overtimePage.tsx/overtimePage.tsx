import { useCallback, useMemo, useRef, useState } from 'react'
import OvertimePlayer from '../../components/overtimePlayer'

const clips = [
  {
    id: 1,
    title: 'Overtime Clip 1',
    // Public sample videos for demo purposes only
    src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    poster: 'https://picsum.photos/seed/ot1/800/450'
  },
  {
    id: 2,
    title: 'Overtime Clip 2',
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    poster: 'https://picsum.photos/seed/ot2/800/450'
  },
  {
    id: 3,
    title: 'Overtime Clip 3',
    src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    poster: 'https://picsum.photos/seed/ot3/800/450'
  }
]

export default function OvertimePage() {
  const [index, setIndex] = useState(0)
  const clampIndex = useCallback((i) => Math.max(0, Math.min(clips.length - 1, i)), [])

  const containerRef = useRef(null)
  const startXRef = useRef(0)
  const deltaXRef = useRef(0)
  const isDraggingRef = useRef(false)

  const canPrev = index > 0
  const canNext = index < clips.length - 1

  const goTo = useCallback((i) => setIndex(clampIndex(i)), [clampIndex])
  const next = useCallback(() => goTo(index + 1), [index, goTo])
  const prev = useCallback(() => goTo(index - 1), [index, goTo])

  const transform = useMemo(() => `translateX(-${index * 100}%)`, [index])

  const onTouchStart = (e) => {
    if (!e.touches || e.touches.length === 0) return
    isDraggingRef.current = true
    startXRef.current = e.touches[0].clientX
    deltaXRef.current = 0
  }
  const onTouchMove = (e) => {
    if (!isDraggingRef.current || !containerRef.current) return
    const x = e.touches[0].clientX
    deltaXRef.current = x - startXRef.current
  }
  const onTouchEnd = () => {
    if (!isDraggingRef.current) return
    isDraggingRef.current = false
    const threshold = 40 // px swipe threshold
    if (deltaXRef.current > threshold && canPrev) prev()
    else if (deltaXRef.current < -threshold && canNext) next()
    deltaXRef.current = 0
  }

  return (
    <div style={{ padding: 16 }}>
      <h2 style={{ margin: 0, marginBottom: 12 }}>Overtime Player Carousel</h2>

      <div
        ref={containerRef}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          maxWidth: 960,
          margin: '0 auto'
        }}
      >
        <div
          style={{
            display: 'flex',
            transition: 'transform 240ms ease-out',
            transform
          }}
        >
          {clips.map((clip, i) => (
            <div key={clip.id} style={{ flex: '0 0 100%', paddingRight: 8, paddingLeft: 8 }}>
              <OvertimePlayer
                src={clip.src}
                poster={clip.poster}
                title={clip.title}
                isActive={i === index}
                autoPlay
                muted
                loop
              />
              <div style={{ marginTop: 8, textAlign: 'center' }}>{clip.title}</div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={prev}
          disabled={!canPrev}
          style={{
            position: 'absolute',
            top: '50%',
            left: 8,
            transform: 'translateY(-50%)',
            padding: '8px 10px',
            borderRadius: 8,
            border: '1px solid rgba(0,0,0,0.15)',
            background: '#fff',
            cursor: canPrev ? 'pointer' : 'not-allowed',
            opacity: canPrev ? 1 : 0.5
          }}
          aria-label="Previous clip"
        >
          ‹
        </button>

        <button
          type="button"
          onClick={next}
          disabled={!canNext}
          style={{
            position: 'absolute',
            top: '50%',
            right: 8,
            transform: 'translateY(-50%)',
            padding: '8px 10px',
            borderRadius: 8,
            border: '1px solid rgba(0,0,0,0.15)',
            background: '#fff',
            cursor: canNext ? 'pointer' : 'not-allowed',
            opacity: canNext ? 1 : 0.5
          }}
          aria-label="Next clip"
        >
          ›
        </button>
      </div>

      <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginTop: 12 }}>
        {clips.map((c, i) => (
          <button
            key={c.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              border: 'none',
              background: i === index ? '#333' : '#bbb',
              cursor: 'pointer'
            }}
          />
        ))}
      </div>
    </div>
  )
}


