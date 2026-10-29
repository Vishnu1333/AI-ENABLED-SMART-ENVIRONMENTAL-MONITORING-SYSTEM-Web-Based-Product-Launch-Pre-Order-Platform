import React, { useState, useEffect } from 'react'
import { ShoppingCart, Search, Filter, Check, Clock, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react'
import { getAllOrders, updateOrder } from '../../utils/mockApi'
import styles from './Orders.module.css'

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [filter, setFilter] = useState('ALL')
  const [search, setSearch] = useState('')
  const [expandedId, setExpandedId] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const data = await getAllOrders()
        setOrders(data)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const updated = await updateOrder(orderId, { status: newStatus })
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o))
    } catch (err) {
      alert('Failed to update status: ' + err.message)
    }
  }

  const filteredOrders = orders.filter(order => {
    const matchesFilter = filter === 'ALL' || order.status.toUpperCase().includes(filter)
    const matchesSearch =
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.customerName.toLowerCase().includes(search.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className={styles.wrap}>
      <div className={styles.topBar}>
        <div className={styles.titleWrap}>
          <span className={styles.code}>TELEMETRY LEDGER // MANIFEST REGISTER</span>
          <h3 className={styles.title}>Client Allocations & Queue Dispatch</h3>
        </div>

        <div className={styles.controls}>
          <div className={styles.searchWrap}>
            <Search size={14} className={styles.searchIcon} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="SEARCH MANIFEST OR CLIENT..."
              className={styles.searchInput}
            />
          </div>

          <div className={styles.filterWrap}>
            <Filter size={14} className={styles.filterIcon} />
            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className={styles.select}
            >
              <option value="ALL">ALL LIFECYCLE STATES</option>
              <option value="PRE-ORDER REGISTERED">PRE-ORDER REGISTERED</option>
              <option value="PRICE CONFIRMED">PRICE CONFIRMED</option>
              <option value="CHASSIS ASSEMBLY">CHASSIS ASSEMBLY</option>
              <option value="QUALITY TESTING">QUALITY TESTING</option>
              <option value="DISPATCH & COMMISSIONING">DISPATCH & COMMISSIONING</option>
            </select>
          </div>
        </div>
      </div>

      <div className={styles.tableCard}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>MANIFEST ID</th>
              <th>CLIENT ENTITY</th>
              <th>HARDWARE SKU</th>
              <th>UNITS</th>
              <th>LIFECYCLE STATUS</th>
              <th>UPDATE STATUS</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={6} className={styles.emptyCell}>
                  NO MATCHING HARDWARE ALLOCATIONS FOUND IN LEDGER.
                </td>
              </tr>
            ) : (
              filteredOrders.map(order => {
                const isExpanded = expandedId === order.id
                return (
                  <React.Fragment key={order.id}>
                    <tr
                      onClick={() => setExpandedId(isExpanded ? null : order.id)}
                      className={styles.clickableRow}
                    >
                      <td className={styles.monoCell}>
                        <div className={styles.idWrap}>
                          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          <span>{order.id}</span>
                        </div>
                      </td>
                      <td>
                        <div className={styles.clientBlock}>
                          <span className={styles.clientName}>{order.customerName}</span>
                          <span className={styles.clientEmail}>{order.customerEmail}</span>
                        </div>
                      </td>
                      <td className={styles.monoCell}>{order.product}</td>
                      <td className={styles.qtyCell}>{order.quantity}</td>
                      <td>
                        <span className={styles.statusPill}>
                          <span className={styles.dot} />
                          {order.status}
                        </span>
                      </td>
                      <td onClick={e => e.stopPropagation()}>
                        <select
                          value={order.status}
                          onChange={e => handleStatusChange(order.id, e.target.value)}
                          className={styles.statusSelect}
                        >
                          <option value="PRE-ORDER REGISTERED">PRE-ORDER REGISTERED</option>
                          <option value="PRICE CONFIRMED">PRICE CONFIRMED</option>
                          <option value="CHASSIS ASSEMBLY">CHASSIS ASSEMBLY</option>
                          <option value="QUALITY TESTING">QUALITY TESTING</option>
                          <option value="DISPATCH & COMMISSIONING">DISPATCH & COMMISSIONING</option>
                        </select>
                      </td>
                    </tr>

                    {/* Expanded Drawer */}
                    {isExpanded && (
                      <tr className={styles.expandedRow}>
                        <td colSpan={6}>
                          <div className={styles.drawer}>
                            <div className={styles.drawerItem}>
                              <span className={styles.drawerLabel}>DESTINATION ADDRESS:</span>
                              <span className={styles.drawerVal}>{order.address || '42 Broadgate Circle, London'}</span>
                            </div>
                            <div className={styles.drawerItem}>
                              <span className={styles.drawerLabel}>DIRECT PHONE:</span>
                              <span className={styles.drawerVal}>{order.customerPhone || '+44 7700 900000'}</span>
                            </div>
                            <div className={styles.drawerItem}>
                              <span className={styles.drawerLabel}>SETTLEMENT MODE:</span>
                              <span className={styles.drawerValGreen}>{order.paymentMode}</span>
                            </div>
                            <div className={styles.drawerItem}>
                              <span className={styles.drawerLabel}>DEPLOYMENT DIRECTIVES:</span>
                              <span className={styles.drawerVal}>{order.notes || 'None specified.'}</span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
