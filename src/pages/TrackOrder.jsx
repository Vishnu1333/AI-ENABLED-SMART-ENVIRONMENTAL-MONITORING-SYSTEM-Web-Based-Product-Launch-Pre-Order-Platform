import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowLeft, Search, CheckCircle2, Clock, Package, Truck, ShieldCheck } from 'lucide-react'
import { useApp } from '../context/AppContext'
import styles from './TrackOrder.module.css'

const LIFECYCLE_STAGES = [
  {
    id: 'placed',
    label: 'PRE-ORDER REGISTERED',
    desc: 'Hardware manifest logged to Batch 01 queue',
  },
  {
    id: 'price_confirmed',
    label: 'PRICE CONFIRMED',
    desc: 'Commercial allocation verified & survey locked',
  },
  {
    id: 'chassis_assembly',
    label: 'CHASSIS ASSEMBLY',
    desc: 'Sensor optics and Tensor V4 core embedded in cleanroom',
  },
  {
    id: 'quality_testing',
    label: 'QUALITY TESTING',
    desc: '48-hour multi-spectral torture & baseline calibration',
  },
  {
    id: 'dispatch',
    label: 'DISPATCH & COMMISSIONING',
    desc: 'On-site white-glove deployment & network handover',
  },
]

function getStageIndex(status = '') {
  const s = status.toUpperCase()
  if (s.includes('DISPATCH') || s.includes('FULFILLED') || s.includes('COMMISSIONING')) return 4
  if (s.includes('QUALITY') || s.includes('TESTING')) return 3
  if (s.includes('CHASSIS') || s.includes('ASSEMBLY') || s.includes('PROCESSING')) return 2
  if (s.includes('PRICE') || s.includes('CONFIRMED') || s.includes('INVOICED')) return 1
  return 0 // Default: PRE-ORDER REGISTERED
}

function getStoredOrders() {
  try {
    const raw = localStorage.getItem('aeris_orders')
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export default function TrackOrder() {
  const [searchParams] = useSearchParams()
  const initialId = searchParams.get('orderId') || 'ORD-2026-X89'
  const { orders: contextOrders } = useApp()

  const [query, setQuery] = useState(initialId)
  const [activeOrder, setActiveOrder] = useState(null)

  // Find order in storage or context
  const findOrder = (id) => {
    const all = [...getStoredOrders(), ...contextOrders]
    const found = all.find(
      (o) => o.id?.toLowerCase() === id.trim().toLowerCase()
    )
    if (found) return found

    // Fallback demo order
    return {
      id: id.trim().toUpperCase(),
      customerName: 'Enterprise Facility Operator',
      customerEmail: 'operator@facility.org',
      product: 'AERIS AI ENVIRONMENT MONITOR',
      quantity: 1,
      paymentMode: 'PRE-ORDER RESERVATION (£0 DEPOSIT)',
      status: 'PRE-ORDER REGISTERED',
      address: '42 Broadgate Circle, London EC2M 2QS',
      created: new Date().toLocaleDateString(),
    }
  }

  useEffect(() => {
    setActiveOrder(findOrder(initialId))
  }, [initialId, contextOrders])

  const handleSearch = (e) => {
    e.preventDefault()
    if (!query.trim()) return
    setActiveOrder(findOrder(query))
  }

  const currentStageIndex = getStageIndex(activeOrder?.status)

  return (
    <div className={styles.page}>
      <div className={styles.techGrid} aria-hidden="true" />

      <div className={styles.container}>
        {/* Top Header */}
        <div className={styles.topBar}>
          <Link to="/" className={styles.backBtn} data-cursor="expand">
            <ArrowLeft size={16} />
            <span>RETURN TO PLATFORM</span>
          </Link>
          <span className={styles.statusLive}>
            <span className={styles.pulseDot} />
            <span>LIVE LEDGER TRACKING</span>
          </span>
        </div>

        {/* Title & Lookup */}
        <div className={styles.header}>
          <span className={styles.tag}>TELEMETRY MANIFEST MONITOR</span>
          <h1 className={styles.heading}>
            ORDER / <em>{activeOrder?.id || query}</em>
          </h1>

          <form onSubmit={handleSearch} className={styles.searchForm}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ENTER MANIFEST OR ORDER ID (e.g. ORD-2026-X89)"
              className={styles.searchInput}
            />
            <button type="submit" className={styles.searchBtn} data-cursor="expand">
              <Search size={16} />
              <span>LOCATE TELEMETRY</span>
            </button>
          </form>
        </div>

        {/* Dynamic Timeline Visualization */}
        <div className={styles.timelineCard}>
          <div className={styles.timelineHeader}>
            <span className={styles.timelineTitle}>BATCH 01 MANUFACTURING & DEPLOYMENT LIFECYCLE</span>
            <span className={styles.timelineCurrent}>{activeOrder?.status || 'PRE-ORDER REGISTERED'}</span>
          </div>

          <div className={styles.timelineTrack}>
            {LIFECYCLE_STAGES.map((step, idx) => {
              const isCompleted = idx <= currentStageIndex
              const isCurrent = idx === currentStageIndex

              return (
                <div
                  key={step.id}
                  className={`${styles.timelineNode} ${isCompleted ? styles.nodeComplete : styles.nodePending}`}
                >
                  <div className={styles.nodeIndicator}>
                    {isCompleted ? (
                      <CheckCircle2 size={20} className={styles.completeIcon} />
                    ) : (
                      <Clock size={18} className={styles.pendingIcon} />
                    )}
                    {idx < LIFECYCLE_STAGES.length - 1 && (
                      <div
                        className={`${styles.connectorLine} ${idx < currentStageIndex ? styles.connectorActive : ''}`}
                      />
                    )}
                  </div>

                  <div className={styles.nodeContent}>
                    <div className={styles.nodeMeta}>
                      <span className={styles.nodeDate}>
                        {isCurrent ? 'ACTIVE STAGE' : isCompleted ? 'STAGE COMPLETED' : 'QUEUED'}
                      </span>
                      <span className={styles.nodeStatusTag}>
                        {isCompleted ? 'VERIFIED' : 'PENDING'}
                      </span>
                    </div>
                    <h3 className={styles.nodeTitle}>{step.label}</h3>
                    <p className={styles.nodeDesc}>{step.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Manifest Attributes Grid */}
        {activeOrder && (
          <div className={styles.manifestGrid}>
            <div className={styles.attrCard}>
              <span className={styles.attrKey}>DEPLOYED HARDWARE</span>
              <span className={styles.attrVal}>{activeOrder.product}</span>
              <span className={styles.attrSub}>{activeOrder.quantity} SENSOR UNIT(S) IN ALLOCATION</span>
            </div>

            <div className={styles.attrCard}>
              <span className={styles.attrKey}>FACILITY DESTINATION</span>
              <span className={styles.attrVal}>{activeOrder.address}</span>
              <span className={styles.attrSub}>RECIPIENT: {activeOrder.customerName}</span>
            </div>

            <div className={styles.attrCard}>
              <span className={styles.attrKey}>PAYMENT ALLOCATION</span>
              <span className={styles.attrValGreen}>{activeOrder.paymentMode}</span>
              <span className={styles.attrSub}>PRIORITY BATCH QUEUE</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
