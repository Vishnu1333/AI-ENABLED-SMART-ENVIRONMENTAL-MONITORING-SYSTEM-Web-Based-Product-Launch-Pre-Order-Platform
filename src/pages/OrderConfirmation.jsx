import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CheckCircle, ArrowRight, ShieldCheck, Download, Truck } from 'lucide-react'
import { useApp } from '../context/AppContext'
import styles from './OrderConfirmation.module.css'

export default function OrderConfirmation() {
  const [searchParams] = useSearchParams()
  const orderId = searchParams.get('orderId') || 'ORD-2026-X89'
  const { orders } = useApp()

  const currentOrder = orders.find(o => o.id === orderId) || {
    id: orderId,
    customerName: 'Marcus Thorne',
    customerEmail: 'm.thorne@facility.com',
    product: 'AERIS AI ENVIRONMENT MONITOR',
    quantity: 1,
    paymentMode: 'PRE-ORDER RESERVATION (£0 DEPOSIT)',
    status: 'PRE-ORDER REGISTERED',
    created: new Date().toISOString(),
  }

  return (
    <div className={styles.page}>
      <div className={styles.bgGrid} aria-hidden="true" />

      <div className={styles.container}>
        {/* Animated Check & Header */}
        <div className={styles.heroBox}>
          <div className={styles.checkRing}>
            <CheckCircle size={48} className={styles.checkIcon} />
          </div>

          <div className={styles.tagWrap}>
            <span className={styles.pulseDot} />
            <span className={styles.tag}>TELEMETRY ALLOCATION RECORDED // 2026</span>
          </div>

          <h1 className={styles.heading}>
            ORDER<br />
            <em>RECEIVED.</em>
          </h1>

          <p className={styles.subtitle}>
            Your allocation request has been cryptographically cataloged into the AERIS hardware production ledger.
            A confirmation receipt with deployment specifications has been dispatched to <strong>{currentOrder.customerEmail}</strong>.
          </p>
        </div>

        {/* Order Details Dossier */}
        <div className={styles.dossierCard}>
          <div className={styles.dossierHeader}>
            <div className={styles.dossierTitleWrap}>
              <span className={styles.orderLabel}>OFFICIAL MANIFEST NUMBER</span>
              <span className={styles.orderId}>{currentOrder.id}</span>
            </div>
            <div className={styles.statusPill}>
              <span className={styles.statusDot} />
              <span>{currentOrder.status}</span>
            </div>
          </div>

          <div className={styles.dossierGrid}>
            <div className={styles.dossierItem}>
              <span className={styles.itemKey}>ALLOCATED ENTITY</span>
              <span className={styles.itemVal}>{currentOrder.customerName}</span>
              <span className={styles.itemSub}>{currentOrder.customerEmail}</span>
            </div>

            <div className={styles.dossierItem}>
              <span className={styles.itemKey}>HARDWARE HARDENING</span>
              <span className={styles.itemVal}>{currentOrder.product}</span>
              <span className={styles.itemSub}>{currentOrder.quantity} SENSOR UNIT(S) ALLOCATED</span>
            </div>

            <div className={styles.dossierItem}>
              <span className={styles.itemKey}>SETTLEMENT STATUS</span>
              <span className={styles.itemValGreen}>{currentOrder.paymentMode}</span>
              <span className={styles.itemSub}>FINAL BILLING POST-CALIBRATION</span>
            </div>

            <div className={styles.dossierItem}>
              <span className={styles.itemKey}>ESTIMATED PROCESSING</span>
              <span className={styles.itemVal}>BATCH 01 // Q3 2026</span>
              <span className={styles.itemSub}>PRIORITY MANUFACTURING RUN</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className={styles.dossierActions}>
            <Link
              to={`/track-order?orderId=${currentOrder.id}`}
              className={styles.trackBtn}
              data-cursor="expand"
            >
              <span>TRACK TELEMETRY MANIFEST</span>
              <ArrowRight size={16} />
            </Link>

            <button
              type="button"
              onClick={() => window.print()}
              className={styles.printBtn}
              data-cursor="expand"
            >
              <Download size={16} />
              <span>EXPORT ALLOCATION PDF</span>
            </button>
          </div>
        </div>

        {/* Return link */}
        <div className={styles.bottomNav}>
          <Link to="/" className={styles.returnLink} data-cursor="expand">
            ← RETURN TO AERIS PLATFORM HOMEPAGE
          </Link>
        </div>
      </div>
    </div>
  )
}
