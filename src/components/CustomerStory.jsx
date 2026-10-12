import './CustomerStory.css'

export default function CustomerStory() {
  return (
    <div className="cs-outer">
      <section className="cs-section">
        <div className="cs-pane">
          <video
            className="cs-video"
            src="/assets/642f0aab4cecfadb17e538dfb03ec1e47a09d549.mp4#t=0.5"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
          <div className="cs-content">
            <div className="cs-left">
              <p className="cs-quote">
                “Airtable makes it easy to deliver AI insights to every team quickly and without complex builds.”
              </p>
              <div className="cs-attr">
                <span className="cs-logo-wrap">
                  <img
                    className="cs-logo"
                    src="/assets/c9f681308cbc8902a14f2929030806c81cfce498-90x52.svg"
                    alt=""
                    width="88"
                    height="50"
                  />
                </span>
                <p className="cs-name">Angela Yanes</p>
                <p className="cs-role">Director of Product Operations</p>
              </div>
            </div>
            <div className="cs-right">
              <a className="cs-btn" href="/customer-stories">
                Explore all customer stories
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
