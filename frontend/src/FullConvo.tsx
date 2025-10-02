import { Link } from 'react-router-dom'

const FullConvo = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Link to="/" style={{ color: '#646cff', textDecoration: 'none', marginBottom: '20px', display: 'inline-block' }}>
        ← Back to Home
      </Link>
      <h1>Full Conversation</h1>
      <p>This is the full conversation page.</p>
    </div>
  )
}

export default FullConvo