import OvertimeCard from '../../components/overtimeCard'

const items = Array.from({ length: 12 }).map((_, idx) => ({
  id: idx + 1,
  title: `Overtime #${idx + 1}`,
  durationSeconds: 45 + (idx * 37) % 600,
  thumbnailUrl: `https://picsum.photos/seed/overtime-${idx + 1}/480/270`
}))

export default function OvertimeListPage() {
  return (
    <div style={{ padding: 16 }}>
      <h2 style={{ margin: 0, marginBottom: 16 }}>Overtime Highlights</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
          gap: 16
        }}
      >
        {items.map(item => (
          <OvertimeCard
            key={item.id}
            thumbnailUrl={item.thumbnailUrl}
            title={item.title}
            durationSeconds={item.durationSeconds}
          />
        ))}
      </div>
    </div>
  )
}


