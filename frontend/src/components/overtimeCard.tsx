// Helper to format seconds into H:MM:SS or M:SS
function formatDuration(totalSeconds) {
  const clamped = Math.max(0, Math.floor(totalSeconds))
  const hours = Math.floor(clamped / 3600)
  const minutes = Math.floor((clamped % 3600) / 60)
  const seconds = clamped % 60

  const mm = String(minutes).padStart(hours > 0 ? 2 : 1, '0')
  const ss = String(seconds).padStart(2, '0')
  return hours > 0 ? `${hours}:${mm}:${ss}` : `${mm}:${ss}`
}
/**
 * @typedef {Object} OvertimeCardProps
 * @property {string} thumbnailUrl
 * @property {string} title
 * @property {number} durationSeconds
 * @property {string=} alt
 */

/**
 * @param {OvertimeCardProps} props
 */
export const OvertimeCard = ({ thumbnailUrl, title, durationSeconds, alt }) => {
  const durationLabel = formatDuration(durationSeconds)

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        width: '100%',
        maxWidth: 360
      }}
      aria-label="Overtime video card"
    >
      <div style={{ position: 'relative' }}>
        <img
          src={thumbnailUrl}
          alt={alt ?? title}
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: 12,
            display: 'block',
            backgroundColor: '#111'
          }}
        />
        <span
          style={{
            position: 'absolute',
            right: 8,
            bottom: 8,
            background: 'rgba(0,0,0,0.8)',
            color: 'white',
            fontSize: 12,
            lineHeight: '16px',
            padding: '2px 6px',
            borderRadius: 4,
            fontWeight: 600
          }}
          aria-label={`Duration ${durationLabel}`}
        >
          {durationLabel}
        </span>
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            margin: 0,
            fontSize: 16,
            lineHeight: '22px',
            fontWeight: 600,
            color: 'inherit',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }} title={title}>
            {title}
          </p>
        </div>
      </div>
    </div>
  )
}

export default OvertimeCard


