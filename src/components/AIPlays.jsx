import './AIPlays.css'

const CARDS = [
  {
    span: 8,
    bg: '#FCAB79',
    fg: '#AA2D00',
    img: '/assets/23b71faac9fefb209abee4d86dace2e43424985b-1770x854.png',
    prompt: 'Read this brief and generate 10 campaign ideas for our summer launch.',
  },
  {
    span: 4,
    bg: '#C7E5F2',
    fg: '#0A2E0E',
    img: '/assets/4d4aaf0d7a87f96d9b40f562706acf060e1e6971-854x854.png',
    prompt: 'Gather intel on all event invitees to help me personalize outreach.',
  },
  {
    span: 6,
    bg: '#254FAD',
    fg: '#FA91E0',
    img: '/assets/27e946e26007e0be7e4d8310c1b7ee31f219779f-1312x854.png',
    prompt: 'What are customers saying about our competitors and where are our biggest opportunities?',
  },
  {
    span: 6,
    bg: '#0A2E0E',
    fg: '#FCB42A',
    img: '/assets/179c070bf7bf64cc8f6eb8352f9dc700049b0223-1312x854.png',
    prompt: 'Run language translation on 500 assets and check for local regulation requirements.',
  },
]

export default function AIPlays() {
  return (
    <section className="aip">
      <div className="aip-wrap aip-head" data-has-cta="true">
        <div className="aip-head-text">
          <h2 className="aip-h2">The path to 10x every person in your organization</h2>
          <p className="aip-sub">Use cases and templates to activate AI in your workflows</p>
        </div>
        <a className="aip-btn" href="/ai-plays">
          See AI plays
        </a>
      </div>

      <div className="aip-wrap aip-body">
        <div className="aip-inner">
          <div className="aip-grid">
            {CARDS.map((card) => (
              <a
                key={card.img}
                href="/ai-plays"
                className={`aip-card aip-card--${card.span}`}
                style={{ '--aip-bg': card.bg, '--aip-fg': card.fg }}
              >
                <img className="aip-img" src={card.img} alt="" loading="lazy" />
                <div className="aip-content">
                  <p className="aip-prompt">{card.prompt}</p>
                  <span className="aip-pill">Explore AI Plays</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
