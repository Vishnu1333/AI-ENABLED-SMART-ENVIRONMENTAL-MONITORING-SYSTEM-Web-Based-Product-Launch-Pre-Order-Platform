import React, { useState, useEffect } from 'react'
import { Users, Search, Mail, Phone, Calendar, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react'
import { getAllCustomers, getAllOrders } from '../../utils/mockApi'
import styles from './Customers.module.css'

export default function Customers() {
  const [customers, setCustomers] = useState([])
  const [orders, setOrders] = useState([])
  const [search, setSearch] = useState('')
  const [expandedEmail, setExpandedEmail] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const [c, o] = await Promise.all([getAllCustomers(), getAllOrders()])
        setCustomers(c)
        setOrders(o)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className={styles.wrap}>
      <div className={styles.topBar}>
        <div className={styles.titleWrap}>
          <span className={styles.code}>DIRECTORY // CLIENT ROSTER</span>
          <h3 className={styles.title}>Supervised Enterprise Operators & Entities</h3>
        </div>

        <div className={styles.searchWrap}>
          <Search size={14} className={styles.searchIcon} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="FILTER BY OPERATOR OR ENTITY..."
            className={styles.searchInput}
          />
        </div>
      </div>

      <div className={styles.tableCard}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>OPERATOR NAME</th>
              <th>OFFICIAL EMAIL</th>
              <th>DISPATCH PHONE</th>
              <th>ROLE</th>
              <th>ALLOCATIONS</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(cust => {
              const custOrders = orders.filter(
                o => o.customerEmail?.toLowerCase() === cust.email.toLowerCase()
              )
              const isExpanded = expandedEmail === cust.email

              return (
                <React.Fragment key={cust.id || cust.email}>
                  <tr
                    onClick={() => setExpandedEmail(isExpanded ? null : cust.email)}
                    className={styles.rowClickable}
                  >
                    <td>
                      <div className={styles.nameWrap}>
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        <span className={styles.custName}>{cust.name}</span>
                      </div>
                    </td>
                    <td className={styles.monoCell}>{cust.email}</td>
                    <td className={styles.monoCell}>{cust.phone || 'N/A'}</td>
                    <td>
                      <span className={cust.role === 'admin' ? styles.adminPill : styles.userPill}>
                        {cust.role === 'admin' ? 'CHIEF OPERATOR' : 'FACILITY LEAD'}
                      </span>
                    </td>
                    <td className={styles.qtyCell}>{custOrders.length} MANIFESTS</td>
                  </tr>

                  {isExpanded && (
                    <tr className={styles.drawerRow}>
                      <td colSpan={5}>
                        <div className={styles.drawer}>
                          <div className={styles.drawerHeader}>
                            <ShieldCheck size={16} className={styles.shieldIcon} />
                            <span>VERIFIED TIME-SERIES SUBSCRIBER PROFILE</span>
                          </div>

                          <div className={styles.ordersList}>
                            <span className={styles.orderListTitle}>ASSOCIATED PRODUCTION ORDERS:</span>
                            {custOrders.length === 0 ? (
                              <span className={styles.noOrders}>No recorded hardware manifests under this entity.</span>
                            ) : (
                              custOrders.map(ord => (
                                <div key={ord.id} className={styles.orderSnippet}>
                                  <span className={styles.orderId}>{ord.id}</span>
                                  <span className={styles.orderProd}>{ord.product} ({ord.quantity} units)</span>
                                  <span className={styles.orderStat}>{ord.status}</span>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
