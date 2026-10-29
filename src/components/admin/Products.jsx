import React, { useState, useEffect } from 'react'
import { Package, Plus, Edit2, Check, X, Shield, RefreshCw } from 'lucide-react'
import { PRODUCTS } from '../../data/products'
import styles from './Products.module.css'

export default function Products() {
  const [productList, setProductList] = useState(() => {
    try {
      const saved = localStorage.getItem('aeris_admin_products')
      return saved ? JSON.parse(saved) : PRODUCTS
    } catch {
      return PRODUCTS
    }
  })

  const [isEditing, setIsEditing] = useState(false)
  const [editProduct, setEditProduct] = useState(null)

  const saveToStorage = (updated) => {
    setProductList(updated)
    localStorage.setItem('aeris_admin_products', JSON.stringify(updated))
  }

  const handleOpenEdit = (p) => {
    setEditProduct({ ...p })
    setIsEditing(true)
  }

  const handleOpenNew = () => {
    setEditProduct({
      id: `aeris-monitor-${Date.now()}`,
      name: 'AERIS AI SENSOR EXTENSION MODULE',
      tagline: 'Auxiliary particulate & cryogenic expansion probe',
      description: 'Extended spectrum auxiliary sensing node for cleanroom certification.',
      priceLabel: 'PRICE TO BE CONFIRMED',
      status: 'pre-order',
      badge: 'DEVELOPMENT',
      specs: [
        { label: 'Form Factor', value: 'IP67 Sealed Ruggedized' },
        { label: 'Sampling Rate', value: '200 Hz High-Frequency' },
      ],
      features: [
        'Cryogenic thermal detection down to -80°C',
        'Direct RS-485 Modbus serial integration',
      ],
    })
    setIsEditing(true)
  }

  const handleSave = (e) => {
    e.preventDefault()
    const exists = productList.find(p => p.id === editProduct.id)
    let updated
    if (exists) {
      updated = productList.map(p => p.id === editProduct.id ? editProduct : p)
    } else {
      updated = [...productList, editProduct]
    }
    saveToStorage(updated)
    setIsEditing(false)
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.topActions}>
        <div className={styles.titleWrap}>
          <span className={styles.code}>CATALOG // FLEET DEFINITIONS</span>
          <h3 className={styles.title}>Hardware SKUs & Production Specifications</h3>
        </div>

        <button type="button" onClick={handleOpenNew} className={styles.addBtn} data-cursor="expand">
          <Plus size={16} />
          <span>DEFINE NEW HARDWARE SKU</span>
        </button>
      </div>

      {/* Product List Cards / Table */}
      <div className={styles.tableCard}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>HARDWARE IDENTIFIER</th>
              <th>NAME & ARCHITECTURE</th>
              <th>STATUS</th>
              <th>PRICING TIER</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {productList.map(prod => (
              <tr key={prod.id}>
                <td className={styles.monoCell}>{prod.id}</td>
                <td>
                  <div className={styles.nameBlock}>
                    <span className={styles.prodName}>{prod.name}</span>
                    <span className={styles.prodTag}>{prod.tagline}</span>
                  </div>
                </td>
                <td>
                  <span className={styles.statusPill}>
                    <span className={styles.dot} />
                    {prod.status.toUpperCase()}
                  </span>
                </td>
                <td className={styles.monoCellGreen}>{prod.priceLabel}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(prod)}
                    className={styles.editBtn}
                    data-cursor="expand"
                  >
                    <Edit2 size={14} />
                    <span>MODIFY CONFIG</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard}>
            <div className={styles.modalHeader}>
              <div className={styles.modalTitleWrap}>
                <span className={styles.code}>CONFIGURATION EDITOR</span>
                <h3 className={styles.modalTitle}>{editProduct.name}</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className={styles.closeBtn}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className={styles.modalForm}>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>SKU NAME</label>
                <input
                  type="text"
                  value={editProduct.name}
                  onChange={e => setEditProduct({ ...editProduct, name: e.target.value })}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>TAGLINE / ARCHITECTURAL ROLE</label>
                <input
                  type="text"
                  value={editProduct.tagline}
                  onChange={e => setEditProduct({ ...editProduct, tagline: e.target.value })}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.row2}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>PRICING PLACEHOLDER</label>
                  <input
                    type="text"
                    value={editProduct.priceLabel}
                    onChange={e => setEditProduct({ ...editProduct, priceLabel: e.target.value })}
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label}>LIFECYCLE STATUS</label>
                  <select
                    value={editProduct.status}
                    onChange={e => setEditProduct({ ...editProduct, status: e.target.value })}
                    className={styles.select}
                  >
                    <option value="pre-order">PRE-ORDER OPEN</option>
                    <option value="active">ACTIVE PRODUCTION</option>
                    <option value="calibration">CALIBRATION & R&D</option>
                  </select>
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>TECHNICAL DESCRIPTION</label>
                <textarea
                  value={editProduct.description}
                  onChange={e => setEditProduct({ ...editProduct, description: e.target.value })}
                  rows={3}
                  className={styles.textarea}
                  required
                />
              </div>

              <div className={styles.modalActions}>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className={styles.cancelBtn}
                >
                  ABORT
                </button>
                <button type="submit" className={styles.saveBtn} data-cursor="expand">
                  <Check size={16} />
                  <span>COMMIT TO FLEET LEDGER</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
