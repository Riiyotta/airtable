// Original SVG scenes for <MockMedia>. Every scene is drawn in a W×H viewBox (H fixed per box,
// W follows the slot's measured aspect) and only uses invented, generic labels.
import { PILLS, ACCENTS, LIGHT_BACKDROPS, DARK_BACKDROPS, PURPLE, NAVY, BLUE, SKY } from './palette.js'

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v))
const tw = (s, fs) => String(s).length * fs * 0.56 // rough text width

const ITEMS = [
  'Spring promo', 'Website refresh', 'Partner kit', 'Onboarding flow', 'Newsletter', 'Pricing page',
  'Launch video', 'User survey', 'Help center', 'Social series', 'Brand refresh', 'Webinar',
  'Field guide', 'Q3 launch', 'Retail pop-up', 'Support macros', 'Press kit', 'Mobile beta',
]
const TITLES = ['Campaigns', 'Q3 launch', 'Content plan', 'Roadmap', 'Requests', 'Events', 'Assets', 'Pipeline', 'Budget', 'Vendors', 'Sprint', 'Feedback']
const STATUS = ['Done', 'In progress', 'Blocked', 'Review', 'Planned', 'Draft', 'Live', 'On hold']
const CHANNELS = ['Email', 'Social', 'Web', 'Events', 'Print', 'Video']
const DATES = ['Mar 4', 'Mar 12', 'Apr 2', 'Apr 18', 'May 7', 'May 21', 'Jun 3', 'Jun 16', 'Jul 1']
const NUMS = ['$4,200', '$1,850', '$12,400', '$760', '$3,300', '$9,050', '$2,140']

// ---------- primitives ----------
function T({ x, y, s = 8, fill, w = 500, a = 'start', o, children }) {
  return (
    <text x={x} y={y} fontSize={s} fontWeight={w} fill={fill} textAnchor={a} opacity={o}>
      {children}
    </text>
  )
}

function Pill({ x, y, label, pair, s = 7, h = 12 }) {
  const w = tw(label, s) + 10
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={pair[0]} />
      <T x={x + 5} y={y + h / 2 + s * 0.36} s={s} fill={pair[1]}>
        {label}
      </T>
    </g>
  )
}

function Glyph({ x, y, s, kind, fill = '#fff' }) {
  const c = s / 2
  switch (kind % 6) {
    case 0:
      return <circle cx={x + c} cy={y + c} r={s * 0.26} fill={fill} />
    case 1:
      return <rect x={x + s * 0.26} y={y + s * 0.26} width={s * 0.48} height={s * 0.48} rx={s * 0.08} fill={fill} />
    case 2:
      return <path d={`M${x + c} ${y + s * 0.22}L${x + s * 0.78} ${y + s * 0.74}H${x + s * 0.22}Z`} fill={fill} />
    case 3:
      return (
        <path
          d={`M${x + s * 0.55} ${y + s * 0.18}L${x + s * 0.28} ${y + s * 0.56}H${x + s * 0.48}L${x + s * 0.42} ${y + s * 0.84}L${x + s * 0.74} ${y + s * 0.44}H${x + s * 0.54}Z`}
          fill={fill}
        />
      )
    case 4:
      return (
        <g fill="none" stroke={fill} strokeWidth={s * 0.1} strokeLinecap="round">
          <path d={`M${x + s * 0.26} ${y + s * 0.36}H${x + s * 0.74}M${x + s * 0.26} ${y + c}H${x + s * 0.74}M${x + s * 0.26} ${y + s * 0.64}H${x + s * 0.56}`} />
        </g>
      )
    default:
      return (
        <g fill={fill}>
          <circle cx={x + s * 0.36} cy={y + s * 0.36} r={s * 0.12} />
          <circle cx={x + s * 0.64} cy={y + s * 0.36} r={s * 0.12} />
          <circle cx={x + s * 0.36} cy={y + s * 0.64} r={s * 0.12} />
          <circle cx={x + s * 0.64} cy={y + s * 0.64} r={s * 0.12} />
        </g>
      )
  }
}

function Sparkle({ x, y, s, fill = PURPLE }) {
  const c = s / 2
  return (
    <path
      d={`M${x + c} ${y}Q${x + c * 1.12} ${y + c * 0.88} ${x + s} ${y + c}Q${x + c * 1.12} ${y + c * 1.12} ${x + c} ${y + s}Q${x + c * 0.88} ${y + c * 1.12} ${x} ${y + c}Q${x + c * 0.88} ${y + c * 0.88} ${x + c} ${y}Z`}
      fill={fill}
    />
  )
}

// ---------- backdrop + window chrome ----------
function Backdrop({ c, pair }) {
  const { W, H, id, dark, r } = c
  const p = pair || (dark ? r.pick(DARK_BACKDROPS) : r.pick(LIGHT_BACKDROPS))
  const blob = dark ? '#AC59FF' : '#FFFFFF'
  return (
    <g>
      <defs>
        <linearGradient id={`${id}bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={p[0]} />
          <stop offset="1" stopColor={p[1]} />
        </linearGradient>
        <radialGradient id={`${id}glow`}>
          <stop offset="0" stopColor={blob} stopOpacity={dark ? 0.28 : 0.7} />
          <stop offset="1" stopColor={blob} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${id}bg)`} />
      <circle cx={W * r.range(0.6, 0.95)} cy={H * r.range(0.05, 0.3)} r={H * 0.75} fill={`url(#${id}glow)`} />
    </g>
  )
}

function Frame({ c, title, f, views = ['Grid', 'Board', 'Calendar'] }) {
  const { t, r, dark } = c
  const { x, y, w, h } = f
  const tabs = w > 260 ? views.slice(0, w > 380 ? 3 : 2) : []
  const accent = dark ? '#6F9FFF' : BLUE
  let tx = x + 30 + tw(title, 9) + 14
  return (
    <g>
      <rect x={x} y={y + 4} width={w} height={h} rx={10} fill={t.shadow} />
      <rect x={x} y={y} width={w} height={h} rx={9} fill={t.win} stroke={t.stroke} />
      <path d={`M${x + 0.5} ${y + 28}V${y + 9}a8.5 8.5 0 0 1 8.5-8.5H${x + w - 9}a8.5 8.5 0 0 1 8.5 8.5V${y + 28}Z`} fill={t.head} />
      <line x1={x} x2={x + w} y1={y + 28} y2={y + 28} stroke={t.stroke} />
      <rect x={x + 10} y={y + 8} width={12} height={12} rx={3} fill={ACCENTS[r.int(0, 3)]} />
      <T x={x + 28} y={y + 17.5} s={9} w={600} fill={t.ink}>
        {title}
      </T>
      {tabs.map((label, i) => {
        const lx = tx
        tx += tw(label, 7.5) + 14
        return (
          <g key={label}>
            <T x={lx} y={y + 17.5} s={7.5} fill={i === 0 ? t.ink : t.sub}>
              {label}
            </T>
            {i === 0 && <rect x={lx} y={y + 25.5} width={tw(label, 7.5)} height={2} rx={1} fill={accent} />}
          </g>
        )
      })}
      {w > 200 && (
        <g>
          <rect x={x + w - 44} y={y + 7} width={34} height={14} rx={4} fill={accent} />
          <T x={x + w - 27} y={y + 16.6} s={7} w={600} a="middle" fill="#fff">
            Share
          </T>
        </g>
      )}
    </g>
  )
}

function frameBox(c, inset) {
  const { W, H } = c
  const p = inset ?? clamp(Math.min(W, H) * 0.08, 10, 36)
  const x = p
  const y = p
  const w = W - 2 * p
  const h = H - p + 24
  return { x, y, w, h, cx: x + 12, cy: y + 38, cw: w - 24, bottom: H }
}

function Window({ c, title, views, children }) {
  const f = frameBox(c, c.bare ? 0 : undefined)
  return (
    <g>
      {!c.bare && <Backdrop c={c} />}
      <Frame c={c} title={title} f={f} views={views} />
      <g clipPath={`url(#${c.id}win)`}>{children(f)}</g>
      <defs>
        <clipPath id={`${c.id}win`}>
          <rect x={f.x} y={f.y + 29} width={f.w} height={f.h - 29} />
        </clipPath>
      </defs>
    </g>
  )
}

// ---------- product UI scenes ----------
function grid(c) {
  const { t, r, dark } = c
  return (
    <Window c={c} title={r.pick(TITLES)}>
      {({ cx, cy, cw, bottom }) => {
        const types = ['text', 'status', 'owner', 'date', 'bar', 'num', 'tag']
        const n = clamp(Math.floor(cw / 84), 2, 7)
        const cols = types.slice(0, n)
        const weights = cols.map((k) => (k === 'text' ? 1.6 : 1))
        const sum = weights.reduce((a, b) => a + b, 0)
        const xs = []
        let acc = cx
        weights.forEach((wt) => {
          xs.push(acc)
          acc += (cw * wt) / sum
        })
        const heads = { text: 'Name', status: 'Status', owner: 'Owner', date: 'Due date', bar: 'Progress', num: 'Budget', tag: 'Channel' }
        const rowH = 22
        const rows = Math.ceil((bottom - cy - 18) / rowH)
        const sel = r.int(1, 3)
        const off = r.int(0, ITEMS.length - 1)
        return (
          <g>
            {cols.map((k, i) => (
              <g key={k}>
                <rect x={xs[i]} y={cy - 2} width={7} height={7} rx={1.5} fill={t.faint} />
                <T x={xs[i] + 11} y={cy + 4.5} s={7.5} fill={t.sub}>
                  {heads[k]}
                </T>
              </g>
            ))}
            <line x1={cx - 12} x2={cx + cw + 12} y1={cy + 11} y2={cy + 11} stroke={t.stroke} />
            {Array.from({ length: rows }, (_, j) => {
              const y = cy + 12 + j * rowH
              const mid = y + rowH / 2
              const pi = r.int(0, 5)
              return (
                <g key={j}>
                  {j === sel && <rect x={cx - 12} y={y} width={cw + 24} height={rowH} fill={dark ? '#3A4252' : '#F0F6FF'} />}
                  <line x1={cx - 12} x2={cx + cw + 12} y1={y + rowH} y2={y + rowH} stroke={t.line} />
                  {cols.map((k, i) => {
                    const x = xs[i]
                    if (k === 'text')
                      return (
                        <T key={k} x={x} y={mid + 3} s={8} fill={t.ink}>
                          {ITEMS[(off + j) % ITEMS.length]}
                        </T>
                      )
                    if (k === 'status') return <Pill key={k} x={x} y={mid - 6} label={STATUS[pi]} pair={PILLS[pi]} />
                    if (k === 'owner')
                      return (
                        <g key={k}>
                          <circle cx={x + 5} cy={mid} r={5} fill={ACCENTS[(j + off) % ACCENTS.length]} />
                          <rect x={x + 14} y={mid - 2.5} width={r.int(22, 40)} height={5} rx={2.5} fill={t.faint} />
                        </g>
                      )
                    if (k === 'date')
                      return (
                        <T key={k} x={x} y={mid + 3} s={7.5} fill={t.sub}>
                          {DATES[(j + off) % DATES.length]}
                        </T>
                      )
                    if (k === 'bar') {
                      const bw = Math.min(56, (cw / sum) * 0.8)
                      return (
                        <g key={k}>
                          <rect x={x} y={mid - 2.5} width={bw} height={5} rx={2.5} fill={t.line} />
                          <rect x={x} y={mid - 2.5} width={bw * r.range(0.2, 1)} height={5} rx={2.5} fill={ACCENTS[(j + 3) % 5]} />
                        </g>
                      )
                    }
                    if (k === 'num')
                      return (
                        <T key={k} x={x} y={mid + 3} s={7.5} fill={t.ink}>
                          {NUMS[(j + off) % NUMS.length]}
                        </T>
                      )
                    return <Pill key={k} x={x} y={mid - 6} label={CHANNELS[(j + off) % CHANNELS.length]} pair={PILLS[(j + 4) % PILLS.length]} />
                  })}
                </g>
              )
            })}
          </g>
        )
      }}
    </Window>
  )
}

function kanban(c) {
  const { t, r } = c
  return (
    <Window c={c} title={r.pick(['Sprint', 'Pipeline', 'Requests', 'Content plan'])} views={['Board', 'Grid', 'Timeline']}>
      {({ cx, cy, cw, bottom }) => {
        const n = clamp(Math.floor(cw / 104), 2, 5)
        const gap = 8
        const colW = (cw - gap * (n - 1)) / n
        const off = r.int(0, ITEMS.length - 1)
        const stages = [4, 1, 3, 0, 6]
        return (
          <g>
            {Array.from({ length: n }, (_, i) => {
              const x = cx + i * (colW + gap)
              const si = stages[i]
              const cards = r.int(2, 4)
              let y = cy + 18
              return (
                <g key={i}>
                  <rect x={x} y={cy - 4} width={colW} height={bottom - cy + 20} rx={6} fill={t.panel} />
                  <circle cx={x + 9} cy={cy + 6} r={3} fill={PILLS[si][1]} opacity={0.75} />
                  <T x={x + 16} y={cy + 9} s={7.5} w={600} fill={t.ink}>
                    {STATUS[si]}
                  </T>
                  <T x={x + colW - 8} y={cy + 9} s={7} a="end" fill={t.sub}>
                    {cards + r.int(0, 6)}
                  </T>
                  {Array.from({ length: cards }, (_, j) => {
                    const ch = 50 + (j % 2) * 8
                    const cy0 = y
                    y += ch + 6
                    const label = ITEMS[(off + i * 3 + j) % ITEMS.length]
                    return (
                      <g key={j}>
                        <rect x={x + 5} y={cy0} width={colW - 10} height={ch} rx={5} fill={t.win} stroke={t.stroke} />
                        <T x={x + 12} y={cy0 + 13} s={7.5} w={600} fill={t.ink}>
                          {label}
                        </T>
                        <Pill x={x + 12} y={cy0 + 19} label={CHANNELS[(i + j + off) % CHANNELS.length]} pair={PILLS[(i * 2 + j + 3) % PILLS.length]} s={6.5} h={11} />
                        <circle cx={x + 16} cy={cy0 + ch - 10} r={4} fill={ACCENTS[(i + j) % ACCENTS.length]} />
                        <rect x={x + 24} y={cy0 + ch - 12} width={Math.min(36, colW * 0.3)} height={4} rx={2} fill={t.faint} />
                        <T x={x + colW - 12} y={cy0 + ch - 7.5} s={6.5} a="end" fill={t.sub}>
                          {DATES[(i + j) % DATES.length]}
                        </T>
                      </g>
                    )
                  })}
                </g>
              )
            })}
          </g>
        )
      }}
    </Window>
  )
}

function calendar(c) {
  const { t, r, dark } = c
  return (
    <Window c={c} title={r.pick(['June', 'Events', 'Editorial', 'Launches'])} views={['Month', 'Week', 'Grid']}>
      {({ cx, cy, cw, bottom }) => {
        const cellW = cw / 7
        const days = cellW > 34 ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] : ['M', 'T', 'W', 'T', 'F', 'S', 'S']
        const rowH = clamp((bottom - cy - 12) / 4.4, 34, 60)
        const rows = Math.ceil((bottom - cy - 12) / rowH)
        const start = r.int(0, 3)
        const today = r.int(8, 18)
        return (
          <g>
            {days.map((d, i) => (
              <T key={i} x={cx + i * cellW + 4} y={cy + 4} s={7} fill={t.sub}>
                {d}
              </T>
            ))}
            {Array.from({ length: rows }, (_, j) => {
              const y = cy + 10 + j * rowH
              const ev = []
              let col = r.int(0, 2)
              while (col < 7) {
                const span = Math.min(r.int(1, 3), 7 - col)
                ev.push([col, span, r.int(0, 6), rowH >= 46 ? r.int(0, 1) : 0])
                col += span + r.int(1, 3)
              }
              return (
                <g key={j}>
                  <line x1={cx} x2={cx + cw} y1={y} y2={y} stroke={t.line} />
                  {Array.from({ length: 7 }, (_, i) => {
                    const n = j * 7 + i + 1 - start
                    const isToday = n === today
                    return (
                      <g key={i}>
                        {i > 0 && <line x1={cx + i * cellW} x2={cx + i * cellW} y1={y} y2={y + rowH} stroke={t.line} />}
                        {isToday && <circle cx={cx + i * cellW + 9} cy={y + 9} r={6} fill={dark ? '#6F9FFF' : BLUE} />}
                        {n > 0 && n <= 30 && (
                          <T x={cx + i * cellW + 9} y={y + 11.5} s={7} a="middle" w={isToday ? 600 : 500} fill={isToday ? '#fff' : t.sub}>
                            {n}
                          </T>
                        )}
                      </g>
                    )
                  })}
                  {ev.map(([c0, span, pi, lane], k) => {
                    const ex = cx + c0 * cellW + 3
                    const ew = span * cellW - 6
                    const ey = y + 17 + lane * 13
                    return (
                      <g key={k}>
                        <rect x={ex} y={ey} width={ew} height={11} rx={3} fill={PILLS[pi][0]} />
                        <rect x={ex} y={ey} width={2.5} height={11} rx={1} fill={PILLS[pi][1]} opacity={0.6} />
                        {ew > 40 && (
                          <T x={ex + 6} y={ey + 8} s={6.5} fill={PILLS[pi][1]}>
                            {ITEMS[(j * 3 + k + pi) % ITEMS.length]}
                          </T>
                        )}
                      </g>
                    )
                  })}
                </g>
              )
            })}
          </g>
        )
      }}
    </Window>
  )
}

function gallery(c) {
  const { t, r, id } = c
  return (
    <Window c={c} title={r.pick(['Assets', 'Catalog', 'Library', 'Creative'])} views={['Gallery', 'Grid', 'Board']}>
      {({ cx, cy, cw, bottom }) => {
        const n = clamp(Math.floor(cw / 96), 2, 6)
        const gap = 8
        const cardW = (cw - gap * (n - 1)) / n
        const imgH = cardW * 0.62
        const cardH = imgH + 34
        const rows = Math.ceil((bottom - cy + 4) / (cardH + gap))
        const off = r.int(0, 9)
        return (
          <g>
            {Array.from({ length: rows * n }, (_, k) => {
              const i = k % n
              const j = Math.floor(k / n)
              const x = cx + i * (cardW + gap)
              const y = cy - 4 + j * (cardH + gap)
              const pair = LIGHT_BACKDROPS[(k + off) % LIGHT_BACKDROPS.length]
              const acc = ACCENTS[(k * 3 + off) % ACCENTS.length]
              const shape = (k + off) % 3
              return (
                <g key={k}>
                  <defs>
                    <linearGradient id={`${id}g${k}`} x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor={pair[0]} />
                      <stop offset="1" stopColor={pair[1]} />
                    </linearGradient>
                  </defs>
                  <rect x={x} y={y} width={cardW} height={cardH} rx={6} fill={t.win} stroke={t.stroke} />
                  <rect x={x + 3} y={y + 3} width={cardW - 6} height={imgH} rx={4} fill={`url(#${id}g${k})`} />
                  {shape === 0 && <circle cx={x + cardW * 0.5} cy={y + 3 + imgH * 0.55} r={imgH * 0.24} fill={acc} opacity={0.85} />}
                  {shape === 1 && (
                    <path
                      d={`M${x + 3} ${y + 3 + imgH}L${x + cardW * 0.4} ${y + imgH * 0.35}L${x + cardW * 0.62} ${y + imgH * 0.7}L${x + cardW * 0.75} ${y + imgH * 0.5}L${x + cardW - 3} ${y + 3 + imgH}Z`}
                      fill={acc}
                      opacity={0.8}
                    />
                  )}
                  {shape === 2 && (
                    <g fill={acc} opacity={0.85}>
                      <rect x={x + cardW * 0.22} y={y + imgH * 0.3} width={cardW * 0.22} height={imgH * 0.5} rx={3} />
                      <rect x={x + cardW * 0.5} y={y + imgH * 0.18} width={cardW * 0.28} height={imgH * 0.62} rx={3} opacity={0.6} />
                    </g>
                  )}
                  <T x={x + 7} y={y + imgH + 15} s={7.5} w={600} fill={t.ink}>
                    {ITEMS[(k + off) % ITEMS.length]}
                  </T>
                  <Pill x={x + 7} y={y + imgH + 19} label={STATUS[(k + off) % 6]} pair={PILLS[(k + off) % 6]} s={6} h={10} />
                </g>
              )
            })}
          </g>
        )
      }}
    </Window>
  )
}

function timeline(c) {
  const { t, r, dark } = c
  return (
    <Window c={c} title={r.pick(['Roadmap', 'Q3 launch', 'Release plan', 'Milestones'])} views={['Timeline', 'Grid', 'Calendar']}>
      {({ cx, cy, cw, bottom }) => {
        const lw = clamp(cw * 0.24, 54, 120)
        const gx = cx + lw
        const gw = cw - lw
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']
        const m = clamp(Math.floor(gw / 60), 2, 8)
        const mw = gw / m
        const rowH = 22
        const rows = Math.ceil((bottom - cy - 14) / rowH)
        const off = r.int(0, ITEMS.length - 1)
        const todayX = gx + gw * r.range(0.35, 0.65)
        return (
          <g>
            {Array.from({ length: m }, (_, i) => (
              <g key={i}>
                <T x={gx + i * mw + 4} y={cy + 4} s={7} fill={t.sub}>
                  {months[i]}
                </T>
                <line x1={gx + i * mw} x2={gx + i * mw} y1={cy - 6} y2={bottom} stroke={t.line} />
              </g>
            ))}
            <line x1={cx - 12} x2={cx + cw + 12} y1={cy + 10} y2={cy + 10} stroke={t.stroke} />
            {Array.from({ length: rows }, (_, j) => {
              const y = cy + 12 + j * rowH
              const pi = (j + off) % 6
              const bx = gx + r.range(0, 0.55) * gw
              const bw = clamp(r.range(0.2, 0.45) * gw, 28, gx + gw - bx - 4)
              const label = ITEMS[(off + j) % ITEMS.length]
              return (
                <g key={j}>
                  <line x1={cx - 12} x2={cx + cw + 12} y1={y + rowH} y2={y + rowH} stroke={t.line} />
                  <T x={cx} y={y + rowH / 2 + 3} s={7.5} fill={t.ink}>
                    {label}
                  </T>
                  <rect x={bx} y={y + 5} width={bw} height={rowH - 10} rx={4} fill={PILLS[pi][0]} />
                  {bw > tw(label, 6.5) + 10 && (
                    <T x={bx + 5} y={y + rowH / 2 + 2.5} s={6.5} fill={PILLS[pi][1]}>
                      {label}
                    </T>
                  )}
                </g>
              )
            })}
            <line x1={todayX} x2={todayX} y1={cy + 10} y2={bottom} stroke={dark ? '#C89BFF' : PURPLE} strokeDasharray="3 3" />
            <circle cx={todayX} cy={cy + 10} r={3} fill={dark ? '#C89BFF' : PURPLE} />
          </g>
        )
      }}
    </Window>
  )
}

function Donut({ x, y, rad, r, t }) {
  const circ = 2 * Math.PI * rad
  const parts = [r.range(0.3, 0.45), r.range(0.2, 0.3), r.range(0.1, 0.2)]
  parts.push(1 - parts.reduce((a, b) => a + b, 0))
  let acc = 0
  const colors = [BLUE, '#FCAB79', '#B6E995', PURPLE]
  return (
    <g transform={`rotate(-90 ${x} ${y})`}>
      <circle cx={x} cy={y} r={rad} fill="none" stroke={t.line} strokeWidth={rad * 0.42} />
      {parts.map((p, i) => {
        const seg = (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={rad}
            fill="none"
            stroke={colors[i]}
            strokeWidth={rad * 0.42}
            strokeDasharray={`${Math.max(0, p * circ - 1.5)} ${circ}`}
            strokeDashoffset={-acc * circ}
          />
        )
        acc += p
        return seg
      })}
    </g>
  )
}

function dashboard(c) {
  const { t, r, dark } = c
  return (
    <Window c={c} title={r.pick(['Overview', 'Weekly report', 'Team pulse', 'Budget'])} views={['Overview', 'Details', 'Export']}>
      {({ cx, cy, cw, bottom }) => {
        const k = clamp(Math.floor(cw / 110), 2, 4)
        const gap = 8
        const kw = (cw - gap * (k - 1)) / k
        const kpis = [
          ['Open items', '1,284', '+12%'],
          ['On track', '92%', '+4%'],
          ['Launches', '36', '+8'],
          ['Avg. cycle', '4.2d', '-6%'],
        ]
        const ky = cy - 4
        const kh = 46
        const chY = ky + kh + gap
        const chH = Math.max(60, bottom - chY - 8)
        const wide = cw > 300
        const barW = wide ? cw * 0.6 - gap / 2 : cw
        const nb = clamp(Math.floor(barW / 22), 5, 14)
        const plotX = cx + 12
        const plotW = barW - 24
        const plotTop = chY + 26
        const plotBot = chY + chH - 14
        const vals = Array.from({ length: nb }, () => r.range(0.25, 0.95))
        const step = plotW / nb
        const line = vals.map((v, i) => `${plotX + step * (i + 0.5)},${plotBot - (plotBot - plotTop) * clamp(v * 0.7 + 0.18, 0, 1)}`).join(' ')
        return (
          <g>
            {kpis.slice(0, k).map(([label, val, d], i) => {
              const x = cx + i * (kw + gap)
              const up = d[0] === '+'
              return (
                <g key={i}>
                  <rect x={x} y={ky} width={kw} height={kh} rx={6} fill={t.panel} />
                  <T x={x + 9} y={ky + 14} s={7} fill={t.sub}>
                    {label}
                  </T>
                  <T x={x + 9} y={ky + 34} s={16} w={600} fill={t.ink}>
                    {val}
                  </T>
                  {kw > 90 && <Pill x={x + kw - tw(d, 6.5) - 18} y={ky + 24} label={d} pair={up ? PILLS[0] : PILLS[2]} s={6.5} h={11} />}
                </g>
              )
            })}
            <rect x={cx} y={chY} width={barW} height={chH} rx={6} fill={t.win} stroke={t.stroke} />
            <T x={cx + 10} y={chY + 14} s={8} w={600} fill={t.ink}>
              Items by week
            </T>
            {[0, 1, 2].map((i) => (
              <line key={i} x1={plotX} x2={plotX + plotW} y1={plotTop + ((plotBot - plotTop) * i) / 2} y2={plotTop + ((plotBot - plotTop) * i) / 2} stroke={t.line} />
            ))}
            {vals.map((v, i) => {
              const h = (plotBot - plotTop) * v
              return <rect key={i} x={plotX + step * i + step * 0.2} y={plotBot - h} width={step * 0.6} height={h} rx={2} fill={i === nb - 2 ? (dark ? '#6F9FFF' : BLUE) : dark ? '#4B5A7A' : '#C7D7F5'} />
            })}
            <polyline points={line} fill="none" stroke={dark ? '#FCAB79' : '#E8762F'} strokeWidth={1.6} strokeLinejoin="round" />
            {wide && (
              <g>
                <rect x={cx + barW + gap} y={chY} width={cw - barW - gap} height={chH} rx={6} fill={t.win} stroke={t.stroke} />
                <T x={cx + barW + gap + 10} y={chY + 14} s={8} w={600} fill={t.ink}>
                  By channel
                </T>
                <Donut x={cx + barW + gap + (cw - barW - gap) / 2} y={chY + 22 + (chH - 22) / 2} rad={Math.min((cw - barW - gap) * 0.26, (chH - 30) * 0.32)} r={r} t={t} />
              </g>
            )}
          </g>
        )
      }}
    </Window>
  )
}

function form(c) {
  const { t, r, dark } = c
  return (
    <Window c={c} title={r.pick(['Intake', 'Requests', 'Submissions', 'Onboarding'])} views={['Form', 'Responses', 'Settings']}>
      {({ x, w, cx, cy, cw, bottom }) => {
        const fw = Math.min(cw, 250)
        const fx = x + (w - fw) / 2
        const accent = dark ? '#6F9FFF' : BLUE
        const fields = [
          ['Request title', 'input', 'Website refresh'],
          ['Team', 'select'],
          ['Due date', 'input', 'Jun 16'],
          ['Details', 'area'],
        ]
        let y = cy + 22
        return (
          <g>
            {cw > fw + 20 && <rect x={cx - 12} y={cy - 9} width={cw + 24} height={bottom - cy + 10} fill={t.panel} />}
            <rect x={fx} y={cy - 2} width={fw} height={bottom - cy + 30} rx={8} fill={t.win} stroke={t.stroke} />
            <rect x={fx} y={cy - 2} width={fw} height={5} rx={2} fill={accent} />
            <T x={fx + 14} y={cy + 17} s={11} w={600} fill={t.ink}>
              New request
            </T>
            {fields.map(([label, kind, val], i) => {
              const y0 = y + 8
              const h = kind === 'area' ? 34 : 18
              y += h + 22
              return (
                <g key={i}>
                  <T x={fx + 14} y={y0 + 4} s={7} w={600} fill={t.sub}>
                    {label}
                  </T>
                  <rect x={fx + 14} y={y0 + 8} width={fw - 28} height={h} rx={4} fill={t.win} stroke={t.stroke} />
                  {kind === 'input' && (
                    <T x={fx + 20} y={y0 + 20} s={7.5} fill={t.ink}>
                      {val}
                    </T>
                  )}
                  {kind === 'select' && (
                    <g>
                      <Pill x={fx + 18} y={y0 + 11} label={r.pick(['Marketing', 'Design', 'Product', 'Operations'])} pair={PILLS[r.int(0, 6)]} s={6.5} h={12} />
                      <path d={`M${fx + fw - 26} ${y0 + 15}l3 3 3-3`} fill="none" stroke={t.sub} strokeWidth={1.2} />
                    </g>
                  )}
                  {kind === 'area' && (
                    <g fill={t.faint}>
                      <rect x={fx + 20} y={y0 + 14} width={(fw - 40) * 0.9} height={4} rx={2} />
                      <rect x={fx + 20} y={y0 + 22} width={(fw - 40) * 0.6} height={4} rx={2} />
                    </g>
                  )}
                </g>
              )
            })}
            <rect x={fx + 14} y={y + 4} width={64} height={20} rx={5} fill={accent} />
            <T x={fx + 46} y={y + 16.8} s={7.5} w={600} a="middle" fill="#fff">
              Submit
            </T>
          </g>
        )
      }}
    </Window>
  )
}

function iface(c) {
  const { t, r, dark } = c
  return (
    <Window c={c} title={r.pick(['Team hub', 'Launch center', 'Ops portal', 'Review app'])} views={['Edit', 'Preview', 'Publish']}>
      {({ x, cx, cy, cw, bottom }) => {
        const side = cw > 300 ? clamp(cw * 0.2, 60, 110) : 0
        const props = cw > 460 ? clamp(cw * 0.22, 90, 130) : 0
        const accent = dark ? '#6F9FFF' : BLUE
        const mx = cx + side + (side ? 10 : 0)
        const mw = cw - side - props - (side ? 10 : 0) - (props ? 10 : 0)
        const comps = ['Header', 'Chart', 'List', 'Button', 'Filter', 'Text']
        const rowsY = cy + 58
        const listW = mw > 220 ? mw * 0.56 : mw
        return (
          <g>
            {side > 0 && (
              <g>
                <rect x={x} y={cy - 9} width={side + 12} height={bottom - cy + 10} fill={t.panel} />
                <T x={cx} y={cy + 4} s={7} w={600} fill={t.sub}>
                  Elements
                </T>
                {comps.map((cmp, i) => (
                  <g key={cmp}>
                    <rect x={cx} y={cy + 12 + i * 20} width={side - 6} height={16} rx={4} fill={i === 1 ? (dark ? '#3A4252' : '#E6EEFF') : 'transparent'} />
                    <rect x={cx + 4} y={cy + 16 + i * 20} width={8} height={8} rx={2} fill={ACCENTS[i]} />
                    <T x={cx + 16} y={cy + 23 + i * 20} s={7} fill={t.ink}>
                      {cmp}
                    </T>
                  </g>
                ))}
              </g>
            )}
            <rect x={mx} y={cy - 2} width={mw} height={46} rx={6} fill={dark ? '#1B2A52' : '#EBF2FF'} />
            <T x={mx + 10} y={cy + 16} s={10} w={600} fill={t.ink}>
              This week
            </T>
            <rect x={mx + 10} y={cy + 24} width={Math.min(110, mw * 0.5)} height={5} rx={2.5} fill={dark ? '#3A4A6E' : '#C8D9FB'} />
            {mw > 180 && (
              <g>
                <rect x={mx + mw - 60} y={cy + 12} width={50} height={18} rx={5} fill={accent} />
                <T x={mx + mw - 35} y={cy + 24} s={7} w={600} a="middle" fill="#fff">
                  New item
                </T>
              </g>
            )}
            {Array.from({ length: 6 }, (_, i) => {
              const y = rowsY + i * 24
              const o = (i * 2 + 1 + c.r.int(0, 2)) % ITEMS.length
              return (
                <g key={i}>
                  <rect x={mx} y={y} width={listW} height={20} rx={5} fill={t.win} stroke={t.stroke} />
                  <rect x={mx + 6} y={y + 5} width={10} height={10} rx={3} fill={ACCENTS[(i + 2) % ACCENTS.length]} />
                  <T x={mx + 22} y={y + 13} s={7.5} fill={t.ink}>
                    {ITEMS[o]}
                  </T>
                  {listW > 150 && <Pill x={mx + listW - 52} y={y + 4} label={STATUS[i % 5]} pair={PILLS[i % 5]} s={6} h={12} />}
                </g>
              )
            })}
            {mw > 220 && (
              <g>
                <rect x={mx + listW + 8} y={rowsY} width={mw - listW - 8} height={Math.max(60, bottom - rowsY - 8)} rx={6} fill={t.win} stroke={t.stroke} />
                <T x={mx + listW + 16} y={rowsY + 13} s={7.5} w={600} fill={t.ink}>
                  Progress
                </T>
                {Array.from({ length: 4 }, (_, i) => {
                  const bw = (mw - listW - 32) * r.range(0.3, 1)
                  return (
                    <g key={i}>
                      <rect x={mx + listW + 16} y={rowsY + 24 + i * 16} width={mw - listW - 24} height={7} rx={3.5} fill={t.line} />
                      <rect x={mx + listW + 16} y={rowsY + 24 + i * 16} width={bw} height={7} rx={3.5} fill={ACCENTS[(i + 1) % 4]} />
                    </g>
                  )
                })}
              </g>
            )}
            {props > 0 && (
              <g>
                <rect x={cx + cw - props} y={cy - 9} width={props + 12} height={bottom - cy + 10} fill={t.panel} />
                <T x={cx + cw - props + 8} y={cy + 4} s={7} w={600} fill={t.sub}>
                  Properties
                </T>
                {['Show title', 'Allow edits', 'Compact rows', 'Group by'].map((p, i) => {
                  const y = cy + 14 + i * 22
                  const on = i !== 2
                  return (
                    <g key={p}>
                      <T x={cx + cw - props + 8} y={y + 9} s={7} fill={t.ink}>
                        {p}
                      </T>
                      <rect x={cx + cw - 20} y={y + 2} width={18} height={10} rx={5} fill={on ? accent : t.faint} />
                      <circle cx={on ? cx + cw - 7 : cx + cw - 15} cy={y + 7} r={3.5} fill="#fff" />
                    </g>
                  )
                })}
                <T x={cx + cw - props + 8} y={cy + 114} s={7} fill={t.sub}>
                  Row height
                </T>
                <rect x={cx + cw - props + 8} y={cy + 122} width={props - 10} height={3} rx={1.5} fill={t.faint} />
                <rect x={cx + cw - props + 8} y={cy + 122} width={(props - 10) * 0.55} height={3} rx={1.5} fill={accent} />
                <circle cx={cx + cw - props + 8 + (props - 10) * 0.55} cy={cy + 123.5} r={4} fill="#fff" stroke={accent} strokeWidth={1.5} />
              </g>
            )}
          </g>
        )
      }}
    </Window>
  )
}

function FlowNode({ x, y, w, h, title, sub, color, glyph, t }) {
  return (
    <g>
      <rect x={x} y={y + 2} width={w} height={h} rx={7} fill={t.shadow} />
      <rect x={x} y={y} width={w} height={h} rx={7} fill={t.win} stroke={t.stroke} />
      <rect x={x + 8} y={y + (h - 20) / 2} width={20} height={20} rx={5} fill={color} />
      <Glyph x={x + 8} y={y + (h - 20) / 2} s={20} kind={glyph} />
      <T x={x + 35} y={y + h / 2 - 2} s={6.5} fill={t.sub}>
        {sub}
      </T>
      <T x={x + 35} y={y + h / 2 + 8} s={8} w={600} fill={t.ink}>
        {title}
      </T>
    </g>
  )
}

function automation(c) {
  const { t, r, id, dark } = c
  return (
    <Window c={c} title={r.pick(['Weekly digest', 'Status alerts', 'Request routing', 'Launch checklist'])} views={['Editor', 'Runs', 'Settings']}>
      {({ x, w, cx, cy, cw, bottom }) => {
        const hist = cw > 520 ? clamp(cw * 0.26, 120, 170) : 0
        const aw = cw - hist - (hist ? 12 : 0)
        const nw = clamp(aw * 0.42, 100, 170)
        const nh = 36
        const mid = cx + aw / 2
        const branch = aw >= nw * 2 + 24
        const lineC = dark ? '#5A6272' : '#B9C0CC'
        const trig = { x: mid - nw / 2, y: cy + 4 }
        const cond = { x: mid - nw / 2, y: cy + 4 + nh + 26 }
        const by = cond.y + nh + 30
        const left = branch ? { x: mid - nw - 10, y: by } : { x: mid - nw / 2, y: by }
        const right = { x: mid + 10, y: by }
        const nodes = [
          ['When status changes', 'Trigger', ACCENTS[0], 3],
          ['If priority is high', 'Condition', '#FCB42A', 4],
          ['Send a summary', 'Action', '#0DBDB4', 2],
          ['Create follow-up', 'Action', PURPLE, 1],
        ]
        const dot = (cx0, cy0) => <circle cx={cx0} cy={cy0} r={2.5} fill={t.win} stroke={lineC} strokeWidth={1.2} />
        return (
          <g>
            <defs>
              <pattern id={`${id}dots`} width="12" height="12" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="0.9" fill={dark ? '#4A5260' : '#D5D9E0'} />
              </pattern>
            </defs>
            <rect x={x} y={cy - 9} width={w} height={bottom - cy + 10} fill={t.panel} />
            <rect x={x} y={cy - 9} width={w} height={bottom - cy + 10} fill={`url(#${id}dots)`} />
            <g fill="none" stroke={lineC} strokeWidth={1.4}>
              <path d={`M${mid} ${trig.y + nh}V${cond.y}`} />
              {branch ? (
                <path d={`M${mid} ${cond.y + nh}V${cond.y + nh + 12}H${left.x + nw / 2}V${by}M${mid} ${cond.y + nh + 12}H${right.x + nw / 2}V${by}`} />
              ) : (
                <path d={`M${mid} ${cond.y + nh}V${by}`} />
              )}
              <path d={`M${left.x + nw / 2} ${by + nh}V${by + nh + 22}`} strokeDasharray="3 3" />
            </g>
            {dot(mid, trig.y + nh)}
            {dot(mid, cond.y + nh)}
            {branch && (
              <g>
                <Pill x={left.x + nw / 2 - 12} y={cond.y + nh + 16} label="Yes" pair={PILLS[0]} s={6} h={10} />
                <Pill x={right.x + nw / 2 - 10} y={cond.y + nh + 16} label="No" pair={PILLS[7]} s={6} h={10} />
              </g>
            )}
            <FlowNode {...trig} w={nw} h={nh} title={nodes[0][0]} sub={nodes[0][1]} color={nodes[0][2]} glyph={nodes[0][3]} t={t} />
            <FlowNode {...cond} w={nw} h={nh} title={nodes[1][0]} sub={nodes[1][1]} color={nodes[1][2]} glyph={nodes[1][3]} t={t} />
            <FlowNode {...left} w={nw} h={nh} title={nodes[2][0]} sub={nodes[2][1]} color={nodes[2][2]} glyph={nodes[2][3]} t={t} />
            {branch && <FlowNode {...right} w={nw} h={nh} title={nodes[3][0]} sub={nodes[3][1]} color={nodes[3][2]} glyph={nodes[3][3]} t={t} />}
            <g>
              <circle cx={left.x + nw / 2} cy={by + nh + 30} r={7} fill={t.win} stroke={lineC} />
              <path d={`M${left.x + nw / 2 - 3} ${by + nh + 30}h6M${left.x + nw / 2} ${by + nh + 27}v6`} stroke={t.sub} strokeWidth={1.2} />
            </g>
            {hist > 0 && (
              <g>
                <rect x={cx + cw - hist} y={cy - 2} width={hist} height={bottom - cy + 10} rx={7} fill={t.win} stroke={t.stroke} />
                <T x={cx + cw - hist + 10} y={cy + 13} s={8} w={600} fill={t.ink}>
                  Run history
                </T>
                {Array.from({ length: 7 }, (_, i) => {
                  const ok = i !== 2
                  const y = cy + 24 + i * 20
                  return (
                    <g key={i}>
                      <circle cx={cx + cw - hist + 15} cy={y + 6} r={4} fill={ok ? '#3BB273' : '#E5484D'} />
                      <rect x={cx + cw - hist + 24} y={y + 3.5} width={(hist - 70) * r.range(0.5, 1)} height={5} rx={2.5} fill={t.faint} />
                      <T x={cx + cw - 10} y={y + 8.5} s={6.5} a="end" fill={t.sub}>
                        {`${9 + (i % 4)}:${(i * 13) % 60 < 10 ? '0' : ''}${(i * 13) % 60}`}
                      </T>
                    </g>
                  )
                })}
              </g>
            )}
          </g>
        )
      }}
    </Window>
  )
}

function ai(c) {
  const { t, r, dark, id } = c
  return (
    <Window c={c} title={r.pick(['Feedback', 'Research', 'Campaigns', 'Requests'])} views={['Grid', 'Assistant', 'Board']}>
      {({ x, cx, cy, cw, bottom }) => {
        const pw = cw > 340 ? clamp(cw * 0.46, 170, 280) : cw
        const px = cx + cw - pw
        const off = r.int(0, ITEMS.length - 1)
        const userMsg = r.pick(['Summarize this week’s feedback', 'Draft a launch brief', 'Group requests by theme', 'Flag at-risk projects'])
        const bubbleW = Math.min(pw - 20, tw(userMsg, 7.5) + 18)
        return (
          <g>
            <defs>
              <linearGradient id={`${id}ai`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#7C5CFF" />
                <stop offset="1" stopColor={PURPLE} />
              </linearGradient>
            </defs>
            {pw < cw &&
              Array.from({ length: 12 }, (_, j) => {
                const y = cy + j * 22
                return (
                  <g key={j} opacity={0.55}>
                    <line x1={x} x2={px - 12} y1={y + 18} y2={y + 18} stroke={t.line} />
                    <T x={cx} y={y + 11} s={7.5} fill={t.ink}>
                      {ITEMS[(off + j) % ITEMS.length]}
                    </T>
                    {px - cx > 150 && <Pill x={cx + (px - cx) * 0.55} y={y + 2} label={STATUS[(j + off) % 6]} pair={PILLS[(j + off) % 6]} s={6.5} h={12} />}
                  </g>
                )
              })}
            <rect x={px - 4} y={cy - 9} width={pw + 16} height={bottom - cy + 10} fill={dark ? '#2C3240' : '#FBF8FF'} />
            <line x1={px - 4} x2={px - 4} y1={cy - 9} y2={bottom} stroke={t.stroke} />
            <Sparkle x={px + 6} y={cy - 1} s={11} fill={`url(#${id}ai)`} />
            <T x={px + 22} y={cy + 7.5} s={8.5} w={600} fill={t.ink}>
              Assistant
            </T>
            <rect x={px + pw - bubbleW} y={cy + 18} width={bubbleW} height={20} rx={8} fill={dark ? '#3B4C78' : '#E6EEFF'} />
            <T x={px + pw - bubbleW + 9} y={cy + 30.5} s={7.5} fill={t.ink}>
              {userMsg}
            </T>
            <circle cx={px + 9} cy={cy + 54} r={7} fill={`url(#${id}ai)`} />
            <Sparkle x={px + 5} y={cy + 50} s={8} fill="#fff" />
            {[0.92, 0.78, 0.86, 0.5].map((f, i) => (
              <rect key={i} x={px + 22} y={cy + 49 + i * 10} width={(pw - 24) * f} height={5} rx={2.5} fill={t.faint} />
            ))}
            <g>
              {['Pricing', 'Onboarding', 'Mobile'].map((l, i, arr) => {
                const xx = px + 22 + arr.slice(0, i).reduce((a, s) => a + tw(s, 6.5) + 15, 0)
                return xx + tw(l, 6.5) + 10 < px + pw ? <Pill key={l} x={xx} y={cy + 92} label={l} pair={PILLS[(i + 3) % 7]} s={6.5} h={12} /> : null
              })}
            </g>
            <rect x={px + 22} y={cy + 112} width={pw - 22} height={48} rx={6} fill={t.win} stroke={t.stroke} />
            {[0, 1, 2].map((i) => (
              <g key={i}>
                <circle cx={px + 32} cy={cy + 124 + i * 13} r={3} fill={ACCENTS[i + 1]} />
                <rect x={px + 40} y={cy + 122 + i * 13} width={(pw - 70) * (0.8 - i * 0.18)} height={4.5} rx={2.2} fill={t.faint} />
              </g>
            ))}
            <rect x={px} y={Math.min(bottom - 30, cy + 172)} width={pw} height={22} rx={11} fill={t.win} stroke={dark ? '#7C5CFF' : '#CDB6FF'} />
            <T x={px + 10} y={Math.min(bottom - 30, cy + 172) + 14} s={7.5} fill={t.sub}>
              Ask anything…
            </T>
            <circle cx={px + pw - 11} cy={Math.min(bottom - 30, cy + 172) + 11} r={7.5} fill={`url(#${id}ai)`} />
            <path
              d={`M${px + pw - 11} ${Math.min(bottom - 30, cy + 172) + 14.5}v-7m-3 3l3-3 3 3`}
              fill="none"
              stroke="#fff"
              strokeWidth={1.3}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        )
      }}
    </Window>
  )
}

// ---------- non-window scenes ----------
function hub(c) {
  const { W, H, r, id, dark } = c
  const cx = W / 2
  const cy = H / 2
  const s = H * 0.24
  const ts = clamp(H * 0.13, 22, 48)
  const m = clamp(Math.floor(W / 64), 6, 12)
  const rx = Math.min(W * 0.4, W / 2 - ts)
  const ry = H * 0.34
  const rot = r.range(0, Math.PI)
  return (
    <g>
      <Backdrop c={c} pair={dark ? DARK_BACKDROPS[1] : LIGHT_BACKDROPS[6]} />
      <defs>
        <linearGradient id={`${id}hub`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={NAVY} />
          <stop offset="1" stopColor={PURPLE} />
        </linearGradient>
      </defs>
      {[1, 0.66].map((k) => (
        <ellipse key={k} cx={cx} cy={cy} rx={rx * k} ry={ry * k} fill="none" stroke={dark ? 'rgba(255,255,255,0.12)' : 'rgba(1,41,120,0.12)'} />
      ))}
      {Array.from({ length: m }, (_, i) => {
        const a = rot + (i / m) * Math.PI * 2
        const k = i % 2 ? 1 : 0.66
        const x = cx + Math.cos(a) * rx * k
        const y = cy + Math.sin(a) * ry * k
        return (
          <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke={dark ? 'rgba(255,255,255,0.22)' : 'rgba(1,41,120,0.22)'} strokeDasharray="3 4" />
        )
      })}
      {Array.from({ length: m }, (_, i) => {
        const a = rot + (i / m) * Math.PI * 2
        const k = i % 2 ? 1 : 0.66
        const x = cx + Math.cos(a) * rx * k - ts / 2
        const y = cy + Math.sin(a) * ry * k - ts / 2
        const col = ACCENTS[(i + r.int(0, 3)) % ACCENTS.length]
        return (
          <g key={`t${i}`}>
            <rect x={x} y={y + 2} width={ts} height={ts} rx={ts * 0.24} fill="rgba(0,0,0,0.12)" />
            <rect x={x} y={y} width={ts} height={ts} rx={ts * 0.24} fill={dark ? '#323843' : '#fff'} />
            <rect x={x + ts * 0.18} y={y + ts * 0.18} width={ts * 0.64} height={ts * 0.64} rx={ts * 0.16} fill={col} />
            <Glyph x={x + ts * 0.18} y={y + ts * 0.18} s={ts * 0.64} kind={i + r.int(0, 5)} />
          </g>
        )
      })}
      <rect x={cx - s / 2} y={cy - s / 2 + 3} width={s} height={s} rx={s * 0.26} fill="rgba(0,0,0,0.18)" />
      <rect x={cx - s / 2} y={cy - s / 2} width={s} height={s} rx={s * 0.26} fill={`url(#${id}hub)`} />
      <circle cx={cx} cy={cy} r={s * 0.24} fill="none" stroke="#fff" strokeWidth={s * 0.07} />
      <circle cx={cx} cy={cy} r={s * 0.08} fill="#fff" />
    </g>
  )
}

function gradient(c) {
  const { W, H, r, id, dark } = c
  const cols = dark ? [NAVY, PURPLE, '#0F3B44', BLUE] : ['#C7E5F2', '#FCAB79', '#DCC6FF', '#B6E995', '#FA91E0']
  return (
    <g>
      <defs>
        <filter id={`${id}blur`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation={H * 0.14} />
        </filter>
      </defs>
      <rect width={W} height={H} fill={dark ? '#181D26' : '#F8F6F6'} />
      <g filter={`url(#${id}blur)`} opacity={dark ? 0.9 : 0.85}>
        {Array.from({ length: 4 }, (_, i) => (
          <circle key={i} cx={W * r.range(0.05, 0.95)} cy={H * r.range(0.1, 0.9)} r={H * r.range(0.3, 0.5)} fill={cols[(i + r.int(0, 3)) % cols.length]} />
        ))}
      </g>
    </g>
  )
}

function bars(c) {
  const { W, H, r, dark } = c
  const bw = clamp(H * 0.09, 12, 30)
  const n = Math.ceil(W / (bw * 1.5)) + 1
  const cols = dark ? ['#254FAD', PURPLE, '#0AB2FA', '#6F9FFF'] : ['#254FAD', '#FCAB79', '#C7E5F2', '#B6E995', PURPLE, '#FCB42A']
  return (
    <g>
      <rect width={W} height={H} fill={dark ? '#012978' : '#FAF5E8'} />
      {Array.from({ length: n }, (_, i) => {
        const h = H * (0.25 + 0.6 * Math.abs(Math.sin(i * 0.55 + r.range(0, 0.6))))
        const x = i * bw * 1.5
        return (
          <g key={i}>
            <rect x={x} y={H - h} width={bw} height={h + bw} rx={bw / 2} fill={cols[i % cols.length]} opacity={0.9} />
            {i % 3 === 0 && <circle cx={x + bw / 2} cy={H - h - bw * 1.1} r={bw * 0.35} fill={cols[(i + 2) % cols.length]} />}
          </g>
        )
      })}
    </g>
  )
}

function story(c) {
  const { W, H, r, id, dark } = c
  const sky = dark ? ['#1B2A52', '#2A2F38'] : r.pick([['#EBF7FC', '#FAF5E8'], ['#F4ECFF', '#FFF1E8'], ['#F0F6FF', '#EEF8E6']])
  const hills = dark ? ['#254FAD', '#3B2560', '#181D26'] : r.pick([['#C7E5F2', '#95BEFC', '#254FAD'], ['#FCCDAE', '#FCAB79', '#912E1F'], ['#C9EDB0', '#B6E995', '#214224']])
  const hill = (base, amp, ph) => {
    const pts = []
    const seg = 4
    for (let i = 0; i <= seg; i++) pts.push([(W * i) / seg, H * base + Math.sin(i * 1.3 + ph) * H * amp])
    let d = `M0 ${H}L${pts[0][0]} ${pts[0][1]}`
    for (let i = 1; i < pts.length; i++) {
      const [x0, y0] = pts[i - 1]
      const [x1, y1] = pts[i]
      d += `C${x0 + (x1 - x0) / 2} ${y0} ${x0 + (x1 - x0) / 2} ${y1} ${x1} ${y1}`
    }
    return `${d}L${W} ${H}Z`
  }
  const variant = r.int(0, 2)
  const sunX = W * r.range(0.2, 0.8)
  const stat = r.pick([['Time saved', '+38%'], ['Launch speed', '3.2×'], ['Hours back', '+120h'], ['Manual steps', '−45%']])
  const cardW = clamp(W * 0.3, 90, 170)
  const cardX = sunX > W / 2 ? W * 0.07 : W * 0.93 - cardW
  const spark = Array.from({ length: 7 }, (_, i) => `${cardX + 12 + ((cardW - 24) * i) / 6},${H * 0.25 + 30 - i * 2.6 - (i % 2) * 4}`).join(' ')
  return (
    <g>
      <defs>
        <linearGradient id={`${id}sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={sky[0]} />
          <stop offset="1" stopColor={sky[1]} />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${id}sky)`} />
      {dark && Array.from({ length: 18 }, (_, i) => <circle key={i} cx={W * r.next()} cy={H * r.range(0.05, 0.5)} r={r.range(0.6, 1.4)} fill="#fff" opacity={0.5} />)}
      {variant === 2 ? (
        <g fill="none" strokeLinecap="round">
          {[0.62, 0.48, 0.34, 0.2].map((k, i) => (
            <path key={i} d={`M${sunX - H * k} ${H}A${H * k} ${H * k} 0 0 1 ${sunX + H * k} ${H}`} stroke={hills[i % 3]} strokeWidth={H * 0.09} />
          ))}
        </g>
      ) : (
        <circle cx={sunX} cy={H * 0.36} r={H * 0.13} fill="#FCB42A" opacity={dark ? 0.85 : 0.9} />
      )}
      {variant === 0 && (
        <g>
          <path d={hill(0.62, 0.06, r.range(0, 3))} fill={hills[0]} />
          <path d={hill(0.74, 0.05, r.range(0, 3))} fill={hills[1]} />
          <path d={hill(0.86, 0.035, r.range(0, 3))} fill={hills[2]} />
        </g>
      )}
      {variant === 1 &&
        Array.from({ length: Math.ceil(W / (H * 0.12)) }, (_, i) => {
          const bw = H * 0.1
          const bh = H * r.range(0.18, 0.5)
          return <rect key={i} x={i * H * 0.12} y={H - bh} width={bw} height={bh + 8} rx={bw * 0.3} fill={hills[i % 3]} />
        })}
      {W > 160 && (
        <g>
          <rect x={cardX} y={H * 0.12 + 3} width={cardW} height={H * 0.13 + 34} rx={8} fill="rgba(0,0,0,0.12)" />
          <rect x={cardX} y={H * 0.12} width={cardW} height={H * 0.13 + 34} rx={8} fill={dark ? '#323843' : '#fff'} />
          <T x={cardX + 12} y={H * 0.12 + 16} s={7.5} fill={dark ? '#A3A9B4' : '#6A707A'}>
            {stat[0]}
          </T>
          <T x={cardX + 12} y={H * 0.12 + 34} s={16} w={600} fill={dark ? '#F2F4F7' : '#181D26'}>
            {stat[1]}
          </T>
          <polyline points={spark} fill="none" stroke={dark ? '#6F9FFF' : BLUE} strokeWidth={1.6} strokeLinejoin="round" strokeLinecap="round" />
        </g>
      )}
    </g>
  )
}

function glyph(c) {
  const { W, H, r, id } = c
  const s = Math.min(W, H)
  const pair = r.pick([[BLUE, SKY], [NAVY, PURPLE], ['#FCAB79', '#E8762F'], ['#0DBDB4', '#254FAD'], [PURPLE, '#FA91E0']])
  return (
    <g>
      <defs>
        <linearGradient id={`${id}gl`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={pair[0]} />
          <stop offset="1" stopColor={pair[1]} />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${id}gl)`} />
      <Glyph x={(W - s) / 2} y={(H - s) / 2} s={s} kind={r.int(0, 5)} />
    </g>
  )
}

export const SCENES = { grid, kanban, calendar, gallery, timeline, dashboard, form, interface: iface, automation, ai, hub, gradient, bars, story, glyph }
export const KINDS = Object.keys(SCENES)
