import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ShieldCheck, CreditCard, CheckCircle2, Lock, AlertTriangle } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { createOrder } from '../utils/mockApi'
import { validateEmail, validatePhone, validateName } from '../utils/validation'
import styles from './Checkout.module.css'

const STEPS = [
  { id: 1, label: '01 CUSTOMER' },
  { id: 2, label: '02 REVIEW' },
  { id: 3, label: '03 PAYMENT' },
  { id: 4, label: '04 SUBMIT' },
]

export default function Checkout() {
  const navigate = useNavigate()
  const { user, cart, clearCart, placeOrder } = useApp()

  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const [customer, setCustomer] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: '42 Broadgate Circle, London EC2M 2QS',
    country: 'United Kingdom',
    notes: 'Please coordinate on-site installation with facility director.',
  })

  const [payment, setPayment] = useState({
    mode: 'reservation', // 'reservation' (zero upfront) or 'mock_card'
    cardNumber: '•••• •••• •••• 4242',
    cardExp: '12/28',
    cardCvc: '•••',
  })

  const cartItem = cart.items[0] || {
    id: 'aeris-ai-monitor-v1',
    name: 'AERIS AI ENVIRONMENT MONITOR',
    quantity: 1,
    priceLabel: 'PRICE TO BE CONFIRMED',
  }

  const validateStep1 = () => {
    const errs = {}
    const nameChk = validateName(customer.name)
    if (!nameChk.valid) errs.name = nameChk.message

    const emailChk = validateEmail(customer.email)
    if (!emailChk.valid) errs.email = emailChk.message

    const phoneChk = validatePhone(customer.phone)
    if (!phoneChk.valid) errs.phone = phoneChk.message

    if (!customer.address) errs.address = 'Deployment address is required.'

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleNext = () => {
    if (currentStep === 1) {
      if (!validateStep1()) return
    }
    setCurrentStep(prev => Math.min(4, prev + 1))
  }

  const handleBack = () => {
    setCurrentStep(prev => Math.max(1, prev - 1))
  }

  const handleCompleteOrder = async () => {
    setLoading(true)
    try {
      const orderPayload = {
        userId: user?.id || 'guest',
        customerName: customer.name,
        customerEmail: customer.email,
        customerPhone: customer.phone,
        address: customer.address,
        country: customer.country,
        product: cartItem.name,
        quantity: cartItem.quantity,
        priceLabel: cartItem.priceLabel,
        paymentMode: payment.mode === 'reservation' ? 'PRE-ORDER RESERVATION (£0 DEPOSIT)' : 'TEST CARD VERIFIED',
        status: 'PRE-ORDER REGISTERED',
        notes: customer.notes,
      }

      const order = await createOrder(orderPayload)
      placeOrder(order)
      clearCart()
      navigate(`/order-confirmation?orderId=${order.id}`)
    } catch (err) {
      alert('Order failed: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.techGrid} aria-hidden="true" />

      <div className={styles.container}>
        {/* Top Header */}
        <div className={styles.topBar}>
          <Link to="/product" className={styles.backBtn} data-cursor="expand">
            <ArrowLeft size={16} />
            <span>RETURN TO HARDWARE</span>
          </Link>
          <span className={styles.securityBadge}>
            <Lock size={12} />
            <span>256-BIT ENCRYPTED CONSOLE</span>
          </span>
        </div>

        {/* Multi-step Stepper */}
        <div className={styles.stepper}>
          {STEPS.map(step => (
            <div
              key={step.id}
              className={`${styles.stepItem} ${currentStep === step.id ? styles.stepActive : ''} ${currentStep > step.id ? styles.stepComplete : ''}`}
            >
              <span className={styles.stepLabel}>{step.label}</span>
              <div className={styles.stepLine} />
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className={styles.checkoutGrid}>
          {/* Left Form Area */}
          <div className={styles.formCol}>
            {/* STEP 1: CUSTOMER */}
            {currentStep === 1 && (
              <div className={styles.stepCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.stepNum}>PHASE 01 // OPERATOR CONTACT</span>
                  <span className={styles.stepNote}>DEPLOYMENT DESTINATION</span>
                </div>

                <div className={styles.fields}>
                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>FULL NAME / FACILITY CONTACT</label>
                    <input
                      type="text"
                      value={customer.name}
                      onChange={e => setCustomer({ ...customer, name: e.target.value })}
                      placeholder="e.g. Marcus Thorne"
                      className={`${styles.input} ${errors.name ? styles.inputErr : ''}`}
                    />
                    {errors.name && <span className={styles.errText}>{errors.name}</span>}
                  </div>

                  <div className={styles.row2}>
                    <div className={styles.fieldGroup}>
                      <label className={styles.label}>OFFICIAL NOTIFICATION EMAIL</label>
                      <input
                        type="email"
                        value={customer.email}
                        onChange={e => setCustomer({ ...customer, email: e.target.value })}
                        placeholder="m.thorne@facility.com"
                        className={`${styles.input} ${errors.email ? styles.inputErr : ''}`}
                      />
                      {errors.email && <span className={styles.errText}>{errors.email}</span>}
                    </div>

                    <div className={styles.fieldGroup}>
                      <label className={styles.label}>CONTACT PHONE NUMBER</label>
                      <input
                        type="tel"
                        value={customer.phone}
                        onChange={e => setCustomer({ ...customer, phone: e.target.value })}
                        placeholder="+44 7700 900456"
                        className={`${styles.input} ${errors.phone ? styles.inputErr : ''}`}
                      />
                      {errors.phone && <span className={styles.errText}>{errors.phone}</span>}
                    </div>
                  </div>

                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>FACILITY DEPLOYMENT ADDRESS</label>
                    <input
                      type="text"
                      value={customer.address}
                      onChange={e => setCustomer({ ...customer, address: e.target.value })}
                      placeholder="Street address, building, suite"
                      className={`${styles.input} ${errors.address ? styles.inputErr : ''}`}
                    />
                    {errors.address && <span className={styles.errText}>{errors.address}</span>}
                  </div>

                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>JURISDICTION / COUNTRY</label>
                    <select
                      value={customer.country}
                      onChange={e => setCustomer({ ...customer, country: e.target.value })}
                      className={styles.select}
                    >
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United States">United States</option>
                      <option value="European Union">European Union (Germany / France / Ireland)</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                      <option value="Switzerland">Switzerland</option>
                    </select>
                  </div>
                </div>

                <div className={styles.stepActions}>
                  <button type="button" onClick={handleNext} className={styles.nextBtn} data-cursor="expand">
                    <span>CONTINUE TO REVIEW</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: REVIEW */}
            {currentStep === 2 && (
              <div className={styles.stepCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.stepNum}>PHASE 02 // ALLOCATION VERIFICATION</span>
                  <span className={styles.stepNote}>BATCH 01 SUMMARY</span>
                </div>

                <div className={styles.reviewBox}>
                  <div className={styles.reviewItem}>
                    <span className={styles.revKey}>HARDWARE MODEL</span>
                    <span className={styles.revVal}>{cartItem.name}</span>
                  </div>
                  <div className={styles.reviewItem}>
                    <span className={styles.revKey}>DEPLOYMENT UNITS</span>
                    <span className={styles.revVal}>{cartItem.quantity} SENSOR NODES</span>
                  </div>
                  <div className={styles.reviewItem}>
                    <span className={styles.revKey}>FACILITY DESTINATION</span>
                    <span className={styles.revVal}>{customer.address}, {customer.country}</span>
                  </div>
                  <div className={styles.reviewItem}>
                    <span className={styles.revKey}>DIRECT OPERATOR</span>
                    <span className={styles.revVal}>{customer.name} ({customer.email})</span>
                  </div>
                  <div className={styles.reviewItem}>
                    <span className={styles.revKey}>ESTIMATED BATCH DISPATCH</span>
                    <span className={styles.revValGreen}>Q3 2026 // PRIORITY QUEUE</span>
                  </div>
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label}>SPECIAL DISPATCH OR ON-SITE ACCESS DIRECTIVES</label>
                  <textarea
                    value={customer.notes}
                    onChange={e => setCustomer({ ...customer, notes: e.target.value })}
                    rows={3}
                    className={styles.textarea}
                  />
                </div>

                <div className={styles.stepActionsBetween}>
                  <button type="button" onClick={handleBack} className={styles.prevBtn}>
                    <ArrowLeft size={16} />
                    <span>BACK</span>
                  </button>
                  <button type="button" onClick={handleNext} className={styles.nextBtn} data-cursor="expand">
                    <span>PROCEED TO PAYMENT MODE</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: PAYMENT MODE */}
            {currentStep === 3 && (
              <div className={styles.stepCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.stepNum}>PHASE 03 // PAYMENT ARCHITECTURE</span>
                  <span className={styles.stepNote}>DEVELOPMENT TEST MODE</span>
                </div>

                <div className={styles.devBanner}>
                  <AlertTriangle size={18} className={styles.warnIcon} />
                  <div className={styles.devBannerText}>
                    <span className={styles.devTitle}>SANDBOX TEST ENVIRONMENT ACTIVE</span>
                    <span className={styles.devDesc}>
                      No real financial transaction will occur. Commercial pricing is confirmed prior to manufacturing release.
                    </span>
                  </div>
                </div>

                <div className={styles.paymentOptions}>
                  <label className={`${styles.payOption} ${payment.mode === 'reservation' ? styles.payOptionActive : ''}`}>
                    <input
                      type="radio"
                      name="paymode"
                      checked={payment.mode === 'reservation'}
                      onChange={() => setPayment({ ...payment, mode: 'reservation' })}
                      className={styles.radio}
                    />
                    <div className={styles.payOptionInfo}>
                      <div className={styles.payOptionTitleRow}>
                        <ShieldCheck size={18} className={styles.payOptionIcon} />
                        <span className={styles.payOptionTitle}>ZERO-DEPOSIT PRE-ORDER RESERVATION (RECOMMENDED)</span>
                      </div>
                      <p className={styles.payOptionDesc}>
                        Lock in Batch 01 queue position with £0 due today. Formal invoice issued upon environmental compliance certification.
                      </p>
                    </div>
                  </label>

                  <label className={`${styles.payOption} ${payment.mode === 'mock_card' ? styles.payOptionActive : ''}`}>
                    <input
                      type="radio"
                      name="paymode"
                      checked={payment.mode === 'mock_card'}
                      onChange={() => setPayment({ ...payment, mode: 'mock_card' })}
                      className={styles.radio}
                    />
                    <div className={styles.payOptionInfo}>
                      <div className={styles.payOptionTitleRow}>
                        <CreditCard size={18} className={styles.payOptionIcon} />
                        <span className={styles.payOptionTitle}>SIMULATED TEST CORPORATE CARD</span>
                      </div>
                      <p className={styles.payOptionDesc}>
                        Simulate instantaneous pre-authorization against mock enterprise payment gateway.
                      </p>
                    </div>
                  </label>
                </div>

                {payment.mode === 'mock_card' && (
                  <div className={styles.mockCardForm}>
                    <div className={styles.fieldGroup}>
                      <label className={styles.label}>TEST CARD NUMBER</label>
                      <input type="text" value={payment.cardNumber} disabled className={styles.inputDisabled} />
                    </div>
                    <div className={styles.row2}>
                      <div className={styles.fieldGroup}>
                        <label className={styles.label}>EXPIRATION</label>
                        <input type="text" value={payment.cardExp} disabled className={styles.inputDisabled} />
                      </div>
                      <div className={styles.fieldGroup}>
                        <label className={styles.label}>CVC</label>
                        <input type="text" value={payment.cardCvc} disabled className={styles.inputDisabled} />
                      </div>
                    </div>
                  </div>
                )}

                <div className={styles.stepActionsBetween}>
                  <button type="button" onClick={handleBack} className={styles.prevBtn}>
                    <ArrowLeft size={16} />
                    <span>BACK</span>
                  </button>
                  <button type="button" onClick={handleNext} className={styles.nextBtn} data-cursor="expand">
                    <span>FINAL CONFIRMATION</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: SUBMIT */}
            {currentStep === 4 && (
              <div className={styles.stepCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.stepNum}>PHASE 04 // PROTOCOL CONFIRMATION</span>
                  <span className={styles.stepNote}>READY FOR TRANSMISSION</span>
                </div>

                <div className={styles.confirmSummary}>
                  <CheckCircle2 size={36} className={styles.greenCheck} />
                  <h3 className={styles.confirmHeading}>READY TO REGISTER ALLOCATION</h3>
                  <p className={styles.confirmCopy}>
                    Your pre-order reservation for {cartItem.quantity} unit(s) will be cryptographically registered
                    into the AERIS Batch 01 production queue.
                  </p>
                </div>

                <div className={styles.stepActionsBetween}>
                  <button type="button" onClick={handleBack} className={styles.prevBtn}>
                    <ArrowLeft size={16} />
                    <span>BACK</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleCompleteOrder}
                    disabled={loading}
                    className={styles.completeBtn}
                    data-cursor="expand"
                  >
                    <span>{loading ? 'TRANSMITTING TELEMETRY...' : 'SUBMIT PRE-ORDER NOW'}</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Summary Column */}
          <div className={styles.summaryCol}>
            <div className={styles.summaryCard}>
              <div className={styles.summaryHeader}>
                <span className={styles.sumTitle}>ALLOCATION SUMMARY</span>
                <span className={styles.sumStatus}>BATCH 01</span>
              </div>

              <div className={styles.sumProductRow}>
                <div className={styles.sumProdInfo}>
                  <span className={styles.sumProdName}>{cartItem.name}</span>
                  <span className={styles.sumProdMeta}>QUANTITY: {cartItem.quantity} SENSOR(S)</span>
                </div>
                <span className={styles.sumProdPrice}>{cartItem.priceLabel}</span>
              </div>

              <div className={styles.sumBreakdown}>
                <div className={styles.sumRow}>
                  <span className={styles.sumKey}>HARDWARE SUB-TOTAL:</span>
                  <span className={styles.sumVal}>PRICE TBC AT LAUNCH</span>
                </div>
                <div className={styles.sumRow}>
                  <span className={styles.sumKey}>RESERVATION FEE:</span>
                  <span className={styles.sumValGreen}>£0.00 (NO DEPOSIT)</span>
                </div>
                <div className={styles.sumRow}>
                  <span className={styles.sumKey}>CALIBRATION & SURVEY:</span>
                  <span className={styles.sumValGreen}>INCLUDED // COHORT 01</span>
                </div>
              </div>

              <div className={styles.sumTotalRow}>
                <span className={styles.totalKey}>DUE TODAY:</span>
                <span className={styles.totalVal}>£0.00</span>
              </div>

              <div className={styles.slaBadge}>
                <ShieldCheck size={16} className={styles.slaIcon} />
                <span>PRICE GUARANTEE: YOU MAY CANCEL RESERVATION AT ANY TIME WITH ZERO PENALTY.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
