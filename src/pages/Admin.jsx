import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  BarChart3,
  FileText,
  Menu,
  X,
  ArrowLeft
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import Dashboard from '../components/admin/Dashboard'
import Products from '../components/admin/Products'
import Customers from '../components/admin/Customers'
import Orders from '../components/admin/Orders'
import Analytics from '../components/admin/Analytics'
import ProjectControl from '../components/admin/ProjectControl'
import styles from './Admin.module.css'

export default function Admin() {
  const { user } = useApp()
  const location = useLocation()
  const navigate = useNavigate()
  
  const [internalTab, setInternalTab] = useState('dashboard')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Derive active tab based on route pathname or internal state
  const activeTab = location.pathname.includes('/project') ? 'project' : internalTab

  const handleTabChange = (tab) => {
    setInternalTab(tab)
    setMobileMenuOpen(false)
    if (tab === 'project') {
      navigate('/admin/project')
    } else {
      navigate('/admin')
    }
  }

  // Demo Administrator session info
  const adminUser = user || {
    name: 'AERIS AI Administrator',
    role: 'admin',
    email: 'admin@aerisai.com',
  }

  return (
    <div className={styles.adminWrap}>
      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${mobileMenuOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarTop}>
          <Link to="/" className={styles.brandTitle}>
            AERIS AI
          </Link>
          <span className={styles.brandSubtitle}>HARDWARE ADMIN v4.2</span>
        </div>

        <nav className={styles.navMenu}>
          <button
            type="button"
            onClick={() => handleTabChange('dashboard')}
            className={`${styles.navItem} ${activeTab === 'dashboard' ? styles.navActive : ''}`}
          >
            <LayoutDashboard size={18} />
            <span>DASHBOARD OVERVIEW</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('project')}
            className={`${styles.navItem} ${activeTab === 'project' ? styles.navActive : ''}`}
          >
            <FileText size={18} />
            <span>PROJECT CONTROL</span>
            <span className={styles.sidebarBadge}>ITM3207</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('products')}
            className={`${styles.navItem} ${activeTab === 'products' ? styles.navActive : ''}`}
          >
            <Package size={18} />
            <span>HARDWARE FLEET</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('orders')}
            className={`${styles.navItem} ${activeTab === 'orders' ? styles.navActive : ''}`}
          >
            <ShoppingCart size={18} />
            <span>PRE-ORDER MANIFESTS</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('customers')}
            className={`${styles.navItem} ${activeTab === 'customers' ? styles.navActive : ''}`}
          >
            <Users size={18} />
            <span>OPERATORS & ENTITIES</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('analytics')}
            className={`${styles.navItem} ${activeTab === 'analytics' ? styles.navActive : ''}`}
          >
            <BarChart3 size={18} />
            <span>TELEMETRY ANALYTICS</span>
          </button>
        </nav>

        {/* User Card & Storefront link */}
        <div className={styles.sidebarBottom}>
          <div className={styles.adminUser}>
            <div className={styles.userDot} />
            <div className={styles.userInfo}>
              <span className={styles.userName}>{adminUser.name}</span>
              <span className={styles.userRole}>SYSTEM SUPERVISOR (DEMO)</span>
            </div>
          </div>

          <div className={styles.bottomBtns}>
            <Link to="/" className={styles.publicLink}>
              <ArrowLeft size={14} />
              <span>RETURN TO PLATFORM</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={styles.mainContent}>
        {/* Top Header */}
        <header className={styles.topHeader}>
          <div className={styles.headerLeft}>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={styles.hamburgerBtn}
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <div className={styles.headerTitleWrap}>
              <span className={styles.sectionCode}>
                {activeTab === 'project'
                  ? 'REPORT // ITM3207'
                  : `PANEL // 0${activeTab === 'dashboard' ? '1' : activeTab === 'products' ? '2' : activeTab === 'orders' ? '3' : activeTab === 'customers' ? '4' : '5'}`}
              </span>
              <h2 className={styles.headerTitle}>
                {activeTab === 'project' ? 'PROJECT CONTROL (ITM3207)' : `${activeTab.toUpperCase()} CONSOLE`}
              </h2>
            </div>
          </div>

          <div className={styles.headerRight}>
            <div className={styles.telemetryBadge}>
              <span className={styles.pulseDot} />
              <span>SENSOR GRID LIVE (100 HZ)</span>
            </div>
          </div>
        </header>

        {/* Tab Content Display */}
        <div className={styles.bodyWrap}>
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'project' && <ProjectControl />}
          {activeTab === 'products' && <Products />}
          {activeTab === 'orders' && <Orders />}
          {activeTab === 'customers' && <Customers />}
          {activeTab === 'analytics' && <Analytics />}
        </div>
      </main>
    </div>
  )
}
