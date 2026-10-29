import React, { useEffect, useState } from 'react'
import {
  TrendingUp,
  Package,
  Users,
  ShoppingCart,
  DollarSign,
  Activity,
  AlertCircle,
  Clock,
  ArrowUpRight
} from 'lucide-react'
import { getAllOrders, getAllCustomers, getAnalytics } from '../../utils/mockApi'
import styles from './Dashboard.module.css'

export default function Dashboard() {
  const [orders, setOrders] = useState([])
  const [customers, setCustomers] = useState([])
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const [ord, cust, ana] = await Promise.all([
          getAllOrders(),
          getAllCustomers(),
          getAnalytics(),
        ])
        setOrders(ord)
        setCustomers(cust)
        setAnalytics(ana)
      } catch (err) {
        console.error('Failed to load dashboard:', err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) {
    return (
      <div className={styles.loadingWrap}>
        <span className={styles.loadingText}>SYNCHRONIZING TELEMETRY LEDGER...</span>
      </div>
    )
  }

  const totalUnits = orders.reduce((sum, o) => sum + (o.quantity || 1), 0)

  return (
    <div className={styles.dashboard}>
      {/* 4 Primary KPI Cards */}
      <div className={styles.kpiGrid}>
        {/* TOTAL PRE-ORDERS */}
        <div className={styles.kpiCard}>
          <div className={styles.kpiTop}>
            <span className={styles.kpiLabel}>TOTAL ALLOCATIONS</span>
            <ShoppingCart size={16} className={styles.kpiIcon} />
          </div>
          <div className={styles.kpiValueWrap}>
            <span className={styles.kpiValue}>{orders.length}</span>
            <span className={styles.kpiDelta}>+18.4% WoW</span>
          </div>
          <span className={styles.kpiFooter}>Across Batch 01 & 02 production queues</span>
        </div>

        {/* ALLOCATED SENSOR HARDWARE */}
        <div className={styles.kpiCard}>
          <div className={styles.kpiTop}>
            <span className={styles.kpiLabel}>SENSOR UNITS REQUESTED</span>
            <Package size={16} className={styles.kpiIcon} />
          </div>
          <div className={styles.kpiValueWrap}>
            <span className={styles.kpiValue}>{totalUnits}</span>
            <span className={styles.kpiDelta}>UNITS</span>
          </div>
          <span className={styles.kpiFooter}>Estimated manufacturing allocation</span>
        </div>

        {/* ACTIVE ENTERPRISE OPERATORS */}
        <div className={styles.kpiCard}>
          <div className={styles.kpiTop}>
            <span className={styles.kpiLabel}>REGISTERED ENTITIES</span>
            <Users size={16} className={styles.kpiIcon} />
          </div>
          <div className={styles.kpiValueWrap}>
            <span className={styles.kpiValue}>{customers.length + 14}</span>
            <span className={styles.kpiDelta}>HEALTHCARE / EDU / COMM</span>
          </div>
          <span className={styles.kpiFooter}>Verified facility management accounts</span>
        </div>

        {/* REVENUE PIPELINE */}
        <div className={styles.kpiCard}>
          <div className={styles.kpiTop}>
            <span className={styles.kpiLabel}>SETTLEMENT PIPELINE</span>
            <DollarSign size={16} className={styles.kpiIcon} />
          </div>
          <div className={styles.kpiValueWrap}>
            <span className={styles.kpiValueGreen}>£0 DEPOSIT</span>
            <span className={styles.kpiDelta}>LAUNCH TBC</span>
          </div>
          <span className={styles.kpiFooter}>Guaranteed non-binding reservation tier</span>
        </div>
      </div>

      {/* Visual Telemetry Trends & Charts */}
      <div className={styles.chartSection}>
        {/* Weekly Ingestion Graph */}
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <div className={styles.chartTitleWrap}>
              <span className={styles.chartCode}>TIME-SERIES INGESTION // 8 WEEKS</span>
              <h3 className={styles.chartTitle}>Pre-Order Allocation Velocity</h3>
            </div>
            <span className={styles.chartBadge}>ACTIVE LOG</span>
          </div>

          <div className={styles.barChart}>
            {[
              { week: 'W1', val: 12 },
              { week: 'W2', val: 19 },
              { week: 'W3', val: 28 },
              { week: 'W4', val: 34 },
              { week: 'W5', val: 45 },
              { week: 'W6', val: 58 },
              { week: 'W7', val: 72 },
              { week: 'W8', val: 89 },
            ].map(item => (
              <div key={item.week} className={styles.barCol}>
                <div className={styles.barTrack}>
                  <div className={styles.barFill} style={{ height: `${item.val}%` }} />
                </div>
                <span className={styles.barLabel}>{item.week}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Neural Network Status Overview */}
        <div className={styles.statusCard}>
          <div className={styles.chartHeader}>
            <div className={styles.chartTitleWrap}>
              <span className={styles.chartCode}>INFERENCE ENGINE // ON-DEVICE</span>
              <h3 className={styles.chartTitle}>Tensor V4 Fleet Health</h3>
            </div>
            <span className={styles.chartBadgeGreen}>ALL SYSTEMS OPTIMAL</span>
          </div>

          <div className={styles.statusList}>
            <div className={styles.statusRow}>
              <span className={styles.statusKey}>FIRMWARE COMPLIANCE:</span>
              <span className={styles.statusVal}>v4.2.1-RELEASE (100% NODES)</span>
            </div>
            <div className={styles.statusRow}>
              <span className={styles.statusKey}>GLOBAL PACKET LOSS:</span>
              <span className={styles.statusValGreen}>0.0001% (OVER Wi-Fi 6 / MESH)</span>
            </div>
            <div className={styles.statusRow}>
              <span className={styles.statusKey}>MEAN BAYESIAN ACCURACY:</span>
              <span className={styles.statusVal}>99.4% ANOMALY CLASSIFICATION</span>
            </div>
            <div className={styles.statusRow}>
              <span className={styles.statusKey}>BATTERY BACKUP STATUS:</span>
              <span className={styles.statusVal}>72HR STANDBY UNTAPPED</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Manifests Table */}
      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <div className={styles.tableTitleWrap}>
            <span className={styles.chartCode}>DISPATCH MANIFEST // RECENT QUEUED ALLOCATIONS</span>
            <h3 className={styles.chartTitle}>Batch 01 Production Register</h3>
          </div>
          <span className={styles.countBadge}>{orders.length} RECORDS</span>
        </div>

        <div className={styles.tableScroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>MANIFEST ID</th>
                <th>CLIENT ENTITY</th>
                <th>HARDWARE ALLOCATION</th>
                <th>UNITS</th>
                <th>STATUS</th>
                <th>PAYMENT</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td className={styles.monoCell}>{order.id}</td>
                  <td>
                    <div className={styles.custCell}>
                      <span className={styles.custName}>{order.customerName}</span>
                      <span className={styles.custEmail}>{order.customerEmail}</span>
                    </div>
                  </td>
                  <td className={styles.monoCell}>{order.product}</td>
                  <td className={styles.qtyCell}>{order.quantity}</td>
                  <td>
                    <span className={styles.statusBadge}>
                      <span className={styles.badgeDot} />
                      {order.status}
                    </span>
                  </td>
                  <td className={styles.monoCellGreen}>{order.paymentMode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
