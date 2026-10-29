import React, { useState, useEffect } from 'react'
import { BarChart3, TrendingUp, Users, Compass, Eye, ShieldAlert, Award } from 'lucide-react'
import { getAnalytics } from '../../utils/mockApi'
import styles from './Analytics.module.css'

export default function Analytics() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const res = await getAnalytics()
        setData(res)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return null

  return (
    <div className={styles.wrap}>
      <div className={styles.topBar}>
        <div className={styles.titleWrap}>
          <span className={styles.code}>TELEMETRY INSIGHTS // FLEET ANALYTICS</span>
          <h3 className={styles.title}>Audience Engagement & Environmental Demand Vectors</h3>
        </div>
        <span className={styles.timeframePill}>ROLLING 30-DAY REPORT</span>
      </div>

      {/* Metrics Row */}
      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <span className={styles.statKey}>PLATFORM VISITATION</span>
          <span className={styles.statVal}>12,847</span>
          <span className={styles.statSub}>+34.2% UNIQUE VERIFIED BROWSERS</span>
        </div>

        <div className={styles.statCard}>
          <span className={styles.statKey}>ALLOCATION CONVERSION</span>
          <span className={styles.statValGreen}>4.12%</span>
          <span className={styles.statSub}>INDUSTRY BENCHMARK: 1.2%</span>
        </div>

        <div className={styles.statCard}>
          <span className={styles.statKey}>MEAN ENGAGEMENT SPAN</span>
          <span className={styles.statVal}>4m 48s</span>
          <span className={styles.statSub}>DEEP EDITORIAL SCROLL DEPTH</span>
        </div>

        <div className={styles.statCard}>
          <span className={styles.statKey}>SENSOR NODES REQUESTED</span>
          <span className={styles.statVal}>342 NODES</span>
          <span className={styles.statSub}>BATCH 01 RUN CAPACITY: 500</span>
        </div>
      </div>

      {/* Two SVG Charts Side by Side */}
      <div className={styles.chartsGrid}>
        {/* Industry Sector Demand Chart (Bar) */}
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <span className={styles.code}>DEMAND BREAKDOWN</span>
            <h4 className={styles.cardHeading}>Allocations by Deployment Sector</h4>
          </div>

          <div className={styles.sectorBars}>
            {[
              { sector: 'Critical Healthcare & ICUs', pct: 38, count: '130 Units' },
              { sector: 'Corporate Trading & Boardrooms', pct: 26, count: '89 Units' },
              { sector: 'University Cleanrooms & Labs', pct: 18, count: '62 Units' },
              { sector: 'Commercial Retail Atriums', pct: 12, count: '41 Units' },
              { sector: 'Municipal / Civic Spaces', pct: 6, count: '20 Units' },
            ].map(item => (
              <div key={item.sector} className={styles.sectorRow}>
                <div className={styles.sectorMeta}>
                  <span className={styles.sectorName}>{item.sector}</span>
                  <span className={styles.sectorCount}>{item.count} ({item.pct}%)</span>
                </div>
                <div className={styles.barBack}>
                  <div className={styles.barFront} style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Ingestion Sources (Donut Graphic) */}
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <span className={styles.code}>REFERRAL CHANNELS</span>
            <h4 className={styles.cardHeading}>Ingestion Attribution Mix</h4>
          </div>

          <div className={styles.donutWrap}>
            <svg viewBox="0 0 160 160" className={styles.donutSvg}>
              {/* Outer circle segments */}
              <circle cx="80" cy="80" r="60" fill="transparent" stroke="#161616" strokeWidth="20" />
              {/* Segment 1: Direct Enterprise (40%) */}
              <circle
                cx="80"
                cy="80"
                r="60"
                fill="transparent"
                stroke="#6db88a"
                strokeWidth="20"
                strokeDasharray="150 227"
                strokeDashoffset="0"
              />
              {/* Segment 2: Industry Whitepapers (30%) */}
              <circle
                cx="80"
                cy="80"
                r="60"
                fill="transparent"
                stroke="#4a8c60"
                strokeWidth="20"
                strokeDasharray="113 264"
                strokeDashoffset="-150"
              />
              {/* Segment 3: ASHRAE & ESG Conferences (20%) */}
              <circle
                cx="80"
                cy="80"
                r="60"
                fill="transparent"
                stroke="#2d5a3d"
                strokeWidth="20"
                strokeDasharray="75 302"
                strokeDashoffset="-263"
              />
              {/* Segment 4: Organic Technical Search (10%) */}
              <circle
                cx="80"
                cy="80"
                r="60"
                fill="transparent"
                stroke="#888888"
                strokeWidth="20"
                strokeDasharray="38 339"
                strokeDashoffset="-338"
              />
            </svg>

            <div className={styles.donutCenter}>
              <span className={styles.donutVal}>12.8k</span>
              <span className={styles.donutSub}>SESSIONS</span>
            </div>
          </div>

          <div className={styles.legendGrid}>
            <div className={styles.legendItem}>
              <span className={styles.legendDot} style={{ background: '#6db88a' }} />
              <span>Direct Enterprise (40%)</span>
            </div>
            <div className={styles.legendItem}>
              <span className={styles.legendDot} style={{ background: '#4a8c60' }} />
              <span>Whitepapers (30%)</span>
            </div>
            <div className={styles.legendItem}>
              <span className={styles.legendDot} style={{ background: '#2d5a3d' }} />
              <span>Conferences (20%)</span>
            </div>
            <div className={styles.legendItem}>
              <span className={styles.legendDot} style={{ background: '#888888' }} />
              <span>Organic Tech (10%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Key Insights Panel */}
      <div className={styles.insightsCard}>
        <div className={styles.insightsHeader}>
          <div className={styles.insightsTitleWrap}>
            <Award size={18} className={styles.awardIcon} />
            <h4 className={styles.cardHeading}>Key Operational Takeaways</h4>
          </div>
          <span className={styles.code}>SYNTHESIS ENGINE</span>
        </div>

        <div className={styles.insightsList}>
          <div className={styles.insightItem}>
            <span className={styles.insightNum}>01</span>
            <p className={styles.insightText}>
              <strong>Healthcare demand exceeds initial projections by 2.4x:</strong> Hospital facilities directors
              cite surgical theatre differential pressure logging as their primary migration motivation.
            </p>
          </div>

          <div className={styles.insightItem}>
            <span className={styles.insightNum}>02</span>
            <p className={styles.insightText}>
              <strong>Batch 01 production queue is currently at 68.4% capacity:</strong> Recommend triggering
              Batch 02 silicon procurement pipeline within the next 21 operational days.
            </p>
          </div>

          <div className={styles.insightItem}>
            <span className={styles.insightNum}>03</span>
            <p className={styles.insightText}>
              <strong>Zero-deposit reservation tier yields 89% downstream customer retention:</strong> The non-binding
              allocation structure significantly lowered institutional procurement friction for enterprise pilots.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
