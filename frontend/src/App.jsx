import { useEffect, useState } from 'react'

const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export default function App() {
  const [number, setNumber] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [calculating, setCalculating] = useState(false)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    fetch(`${apiBase}/api/health`)
      .then((response) => {
        if (!response.ok) throw new Error('API unavailable')
        setStatus('connected')
      })
      .catch(() => setStatus('offline'))
  }, [])

  async function calculate(event) {
    event.preventDefault()
    setError('')
    setResult(null)
    setCalculating(true)
    try {
      const response = await fetch(`${apiBase}/api/square-root?number=${encodeURIComponent(number)}`)
      if (!response.ok) throw new Error('Enter a number that is zero or greater.')
      setResult(await response.json())
    } catch (requestError) {
      setError(requestError.message || 'Could not reach the Python API. Check that it is running.')
    } finally {
      setCalculating(false)
    }
  }

  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="wordmark" href="#top" aria-label="Render home">
          <span className="mark" aria-hidden="true">R</span>
          <span>render<span className="wordmark-dot">.</span></span>
        </a>
        <div className={`connection connection-${status}`} role="status">
          <span className="connection-dot" />
          {status === 'connected' ? 'API connected' : status === 'loading' ? 'Connecting' : 'API offline'}
        </div>
      </header>

      <section className="intro calculator" id="top">
        <p className="eyebrow"><span className="eyebrow-line" />A little Python calculator</p>
        <h1>Square roots, simply.</h1>
        <p className="description">Enter a non-negative number and let the Python app do the math.</p>

        <form className="calculator-form" onSubmit={calculate}>
          <label htmlFor="number-input">Number</label>
          <div className="input-row">
            <input
              id="number-input"
              type="number"
              min="0"
              step="any"
              inputMode="decimal"
              placeholder="Try 144"
              value={number}
              onChange={(event) => setNumber(event.target.value)}
              required
            />
            <button className="calculate-button" type="submit" disabled={calculating || status === 'offline'}>
              {calculating ? 'Calculating...' : 'Calculate'}
              <span aria-hidden="true">↗</span>
            </button>
          </div>
        </form>

        {result && (
          <div className="result" role="status" aria-live="polite">
            <span className="result-label">SQUARE ROOT OF {result.number}</span>
            <output>{result.square_root.toLocaleString(undefined, { maximumFractionDigits: 10 })}</output>
          </div>
        )}
        {error && <p className="error-note" role="alert">{error}</p>}
        {status === 'offline' && <p className="error-note" role="alert">Python API is offline. Start the backend and refresh this page.</p>}
      </section>

      <footer className="footer">
        <span>BUILT TO BE BUILT ON</span>
        <span>PYTHON <i /> REACT <i /> LOCAL FIRST</span>
      </footer>
    </main>
  )
}
