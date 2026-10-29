import React, { useState } from 'react'
import {
  CheckCircle2,
  AlertTriangle,
  Info,
  ChevronRight
} from 'lucide-react'
import {
  PROJECT_OVERVIEW,
  PROJECT_CHARTER,
  OBJECTIVES_DATA,
  SCOPE_DATA,
  DELIVERABLES_DATA,
  STAKEHOLDER_DATA,
  STAKEHOLDER_MATRIX,
  BUDGET_DATA,
  RISK_DATA,
  WBS_DATA,
  MILESTONES_DATA,
  LIFECYCLES_COMPARISON,
  QUALITY_SECURITY_DATA,
  DEPLOYMENT_DATA,
  HANDOVER_DATA,
} from '../../data/projectData'
import styles from './ProjectControl.module.css'

export default function ProjectControl() {
  const [activeSection, setActiveSection] = useState('all')
  const [selectedRiskCategory, setSelectedRiskCategory] = useState('ALL')
  const [stakeholderFilter, setStakeholderFilter] = useState('ALL')

  const SECTIONS = [
    { id: 'all', num: '00', label: 'ALL SECTIONS' },
    { id: 'overview', num: '01', label: 'OVERVIEW' },
    { id: 'charter', num: '02', label: 'PROJECT CHARTER' },
    { id: 'objectives', num: '03', label: 'OBJECTIVES & KPIS' },
    { id: 'scope', num: '04', label: 'SCOPE' },
    { id: 'deliverables', num: '05', label: 'DELIVERABLES' },
    { id: 'stakeholders', num: '06', label: 'STAKEHOLDERS' },
    { id: 'budget', num: '07', label: 'BUDGET' },
    { id: 'risks', num: '08', label: 'RISK MANAGEMENT' },
    { id: 'wbs', num: '09', label: 'WBS' },
    { id: 'milestones', num: '10', label: 'MILESTONES & LIFECYCLES' },
    { id: 'quality', num: '11', label: 'QUALITY & SECURITY' },
    { id: 'deployment', num: '12', label: 'DEPLOYMENT' },
    { id: 'handover', num: '13', label: 'HANDOVER' },
  ]

  const shouldShow = (id) => activeSection === 'all' || activeSection === id

  const filteredRisks = selectedRiskCategory === 'ALL'
    ? RISK_DATA.register
    : RISK_DATA.register.filter(r => r.category.includes(selectedRiskCategory))

  const filteredStakeholders = stakeholderFilter === 'ALL'
    ? STAKEHOLDER_DATA
    : STAKEHOLDER_DATA.filter(s => s.group.toUpperCase().includes(stakeholderFilter.toUpperCase()))

  return (
    <div className={styles.projectWrapper}>
      {/* ── TOP CONTROL HEADER ── */}
      <div className={styles.projectHeader}>
        <div className={styles.headerInfo}>
          <div className={styles.badgeRow}>
            <span className={styles.tag}>{PROJECT_OVERVIEW.courseCode}</span>
            <span className={styles.academicBadge}>REPORT CONTROL REPOSITORY</span>
            <span className={styles.liveBadge}>LOCAL DEMO READY</span>
          </div>
          <h1 className={styles.mainTitle}>{PROJECT_OVERVIEW.projectTitle}</h1>
          <p className={styles.subTitle}>
            {PROJECT_OVERVIEW.platformTitle} // PROJECT MANAGEMENT CONTROL CENTER
          </p>
        </div>

        <div className={styles.headerMetaBox}>
          <div className={styles.metaRow}>
            <span className={styles.metaKey}>STATUS:</span>
            <span className={styles.metaValGreen}>{PROJECT_OVERVIEW.status}</span>
          </div>
          <div className={styles.metaRow}>
            <span className={styles.metaKey}>BASELINE BUDGET:</span>
            <span className={styles.metaValHighlight}>{PROJECT_OVERVIEW.budgetTotal}</span>
          </div>
          <div className={styles.metaRow}>
            <span className={styles.metaKey}>ENVIRONMENT:</span>
            <span className={styles.metaVal}>{PROJECT_OVERVIEW.currentEnvironment}</span>
          </div>
        </div>
      </div>

      {/* ── SECTION NAVIGATOR PILLS ── */}
      <div className={styles.navBarSticky}>
        <div className={styles.navScroller}>
          {SECTIONS.map((sec) => (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              className={`${styles.navPill} ${activeSection === sec.id ? styles.navPillActive : ''}`}
            >
              <span className={styles.pillNum}>{sec.num}</span>
              <span className={styles.pillLabel}>{sec.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────── */}
      {/* 01 OVERVIEW */}
      {/* ────────────────────────────────────────────────────────── */}
      {shouldShow('overview') && (
        <section id="section-overview" className={styles.sectionBlock}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNum}>01 // CONTROL METRICS</span>
            <h2 className={styles.sectionTitle}>PROJECT OVERVIEW & EXECUTIVE DASHBOARD</h2>
          </div>

          <div className={styles.overviewIntro}>
            <p className={styles.leadText}>
              <strong>Primary Objective:</strong> {PROJECT_OVERVIEW.primaryObjective}
            </p>
            <div className={styles.disclaimerBox}>
              <Info size={16} />
              <span>
                <strong>ACADEMIC DEMO NOTICE:</strong> All data, metrics, and budget allocations faithfully 
                represent the ITM3207 Group Assignment Report. Measurements represent planned control baselines; 
                e-commerce and telemetry feeds run in verified local prototype mode.
              </span>
            </div>
          </div>

          {/* KPI Cards Grid */}
          <div className={styles.kpiGrid}>
            {PROJECT_OVERVIEW.kpiCards.map((kpi) => (
              <div key={kpi.id} className={styles.kpiCard}>
                <div className={styles.kpiTop}>
                  <span className={styles.kpiLabel}>{kpi.label}</span>
                  <span className={`${styles.kpiBadge} ${styles['badge_' + kpi.tone]}`}>
                    {kpi.badge}
                  </span>
                </div>
                <div className={styles.kpiValue}>{kpi.value}</div>
                <div className={styles.kpiSub}>{kpi.subtext}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ────────────────────────────────────────────────────────── */}
      {/* 02 PROJECT CHARTER */}
      {/* ────────────────────────────────────────────────────────── */}
      {shouldShow('charter') && (
        <section id="section-charter" className={styles.sectionBlock}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNum}>02 // GOVERNANCE FOUNDATION</span>
            <h2 className={styles.sectionTitle}>PROJECT CHARTER & MANDATE</h2>
          </div>

          <div className={styles.twoColGrid}>
            <div className={styles.infoCard}>
              <h3 className={styles.cardHeader}>Project Background</h3>
              <p className={styles.cardBodyText}>{PROJECT_CHARTER.background}</p>

              <h3 className={styles.cardHeader} style={{ marginTop: '1.5rem' }}>Business Justification</h3>
              <p className={styles.cardBodyText}>{PROJECT_CHARTER.businessJustification}</p>

              <h3 className={styles.cardHeader} style={{ marginTop: '1.5rem' }}>Project Aim</h3>
              <p className={styles.cardBodyText}>{PROJECT_CHARTER.projectAim}</p>
            </div>

            <div className={styles.infoCard}>
              <h3 className={styles.cardHeader}>Key Governance Roles</h3>
              <div className={styles.roleList}>
                {PROJECT_CHARTER.governanceRoles.map((g, i) => (
                  <div key={i} className={styles.roleItem}>
                    <div className={styles.roleTitle}>{g.role}</div>
                    <div className={styles.roleName}>{g.name}</div>
                    <div className={styles.roleDesc}>{g.responsibility}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Constraints and Assumptions */}
          <div className={styles.twoColGrid} style={{ marginTop: '1.5rem' }}>
            <div className={styles.infoCard}>
              <h3 className={styles.cardHeader}>Four Project Constraints</h3>
              <div className={styles.constraintList}>
                {PROJECT_CHARTER.constraints.map((c, i) => (
                  <div key={i} className={styles.constraintItem}>
                    <span className={styles.constraintTag}>{c.type}</span>
                    <span className={styles.constraintDetail}>{c.detail}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.infoCard}>
              <h3 className={styles.cardHeader}>Baseline Project Assumptions</h3>
              <ul className={styles.assumptionList}>
                {PROJECT_CHARTER.assumptions.map((a, i) => (
                  <li key={i} className={styles.assumptionItem}>
                    <ChevronRight size={14} className={styles.bulletIcon} />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* ────────────────────────────────────────────────────────── */}
      {/* 03 OBJECTIVES & KPIS */}
      {/* ────────────────────────────────────────────────────────── */}
      {shouldShow('objectives') && (
        <section id="section-objectives" className={styles.sectionBlock}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNum}>03 // TARGET VERIFICATION</span>
            <h2 className={styles.sectionTitle}>PROJECT OBJECTIVES & KPI VERIFICATION</h2>
          </div>

          <div className={styles.tableResponsive}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th style={{ width: '80px' }}>CODE</th>
                  <th style={{ width: '220px' }}>OBJECTIVE</th>
                  <th>REPORT TARGET</th>
                  <th>VERIFICATION METHOD</th>
                  <th style={{ width: '180px' }}>CURRENT STATUS</th>
                </tr>
              </thead>
              <tbody>
                {OBJECTIVES_DATA.map((obj) => (
                  <tr key={obj.code}>
                    <td className={styles.codeCell}>{obj.code}</td>
                    <td>
                      <strong className={styles.cellHeading}>{obj.objective}</strong>
                    </td>
                    <td className={styles.targetCell}>{obj.target}</td>
                    <td className={styles.verificationCell}>{obj.verification}</td>
                    <td>
                      <span className={`${styles.statusPill} ${styles['pill_' + obj.statusTone]}`}>
                        {obj.currentStatus}
                      </span>
                      <div className={styles.statusNote}>{obj.statusDetail}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* ────────────────────────────────────────────────────────── */}
      {/* 04 SCOPE */}
      {/* ────────────────────────────────────────────────────────── */}
      {shouldShow('scope') && (
        <section id="section-scope" className={styles.sectionBlock}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNum}>04 // BOUNDARY DEFINITION</span>
            <h2 className={styles.sectionTitle}>PROJECT SCOPE BREAKDOWN</h2>
          </div>

          <div className={styles.twoColGrid}>
            {/* IN SCOPE */}
            <div className={`${styles.scopeCard} ${styles.scopeIn}`}>
              <div className={styles.scopeHeader}>
                <CheckCircle2 size={18} className={styles.scopeIconIn} />
                <h3>IN SCOPE ({SCOPE_DATA.inScope.length} WORK PACKAGES)</h3>
              </div>
              <div className={styles.scopeList}>
                {SCOPE_DATA.inScope.map((item, idx) => (
                  <div key={idx} className={styles.scopeItem}>
                    <span className={styles.scopeItemNum}>IN-0{idx + 1 < 10 ? '0' + (idx + 1) : idx + 1}</span>
                    <div className={styles.scopeItemContent}>
                      <strong>{item.title}</strong>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* OUT OF SCOPE */}
            <div className={`${styles.scopeCard} ${styles.scopeOut}`}>
              <div className={styles.scopeHeader}>
                <AlertTriangle size={18} className={styles.scopeIconOut} />
                <h3>OUT OF SCOPE ({SCOPE_DATA.outOfScope.length} EXCLUSIONS)</h3>
              </div>
              <div className={styles.scopeList}>
                {SCOPE_DATA.outOfScope.map((item, idx) => (
                  <div key={idx} className={styles.scopeItem}>
                    <span className={styles.scopeItemNum}>OUT-0{idx + 1}</span>
                    <div className={styles.scopeItemContent}>
                      <strong>{item.title}</strong>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ────────────────────────────────────────────────────────── */}
      {/* 05 DELIVERABLES (D1–D9) */}
      {/* ────────────────────────────────────────────────────────── */}
      {shouldShow('deliverables') && (
        <section id="section-deliverables" className={styles.sectionBlock}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNum}>05 // CONTRACTUAL OUTPUTS</span>
            <h2 className={styles.sectionTitle}>PROJECT DELIVERABLES (D1 – D9)</h2>
          </div>

          <div className={styles.deliverablesGrid}>
            {DELIVERABLES_DATA.map((d) => (
              <div key={d.code} className={styles.deliverableCard}>
                <div className={styles.delivTop}>
                  <span className={styles.delivCode}>{d.code}</span>
                  <span className={`${styles.statusPill} ${styles['pill_' + d.statusTone]}`}>
                    {d.status}
                  </span>
                </div>
                <h3 className={styles.delivName}>{d.name}</h3>
                <p className={styles.delivDesc}>{d.description}</p>
                <div className={styles.delivEvidence}>
                  <span className={styles.delivEvidenceLabel}>EVIDENCE:</span>
                  <span className={styles.delivEvidenceVal}>{d.evidence}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ────────────────────────────────────────────────────────── */}
      {/* 06 STAKEHOLDERS */}
      {/* ────────────────────────────────────────────────────────── */}
      {shouldShow('stakeholders') && (
        <section id="section-stakeholders" className={styles.sectionBlock}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNum}>06 // ENGAGEMENT MATRIX</span>
            <h2 className={styles.sectionTitle}>STAKEHOLDER IDENTIFICATION & ANALYSIS</h2>
          </div>

          {/* Visual Power vs Interest Matrix */}
          <div className={styles.matrixContainer}>
            <div className={styles.matrixTitle}>VISUAL POWER VS. INTEREST MATRIX</div>
            <div className={styles.matrixGrid}>
              <div className={styles.quadrant}>
                <div className={styles.quadrantHeader}>
                  <span>KEEP SATISFIED</span>
                  <span className={styles.quadrantCoord}>[HIGH POWER / LOW-MOD INTEREST]</span>
                </div>
                <ul className={styles.quadrantList}>
                  {STAKEHOLDER_MATRIX.keepSatisfied.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>

              <div className={`${styles.quadrant} ${styles.quadrantKey}`}>
                <div className={styles.quadrantHeader}>
                  <span>MANAGE CLOSELY (KEY PLAYERS)</span>
                  <span className={styles.quadrantCoord}>[HIGH POWER / HIGH INTEREST]</span>
                </div>
                <ul className={styles.quadrantList}>
                  {STAKEHOLDER_MATRIX.manageClosely.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.quadrant}>
                <div className={styles.quadrantHeader}>
                  <span>MONITOR (MINIMAL EFFORT)</span>
                  <span className={styles.quadrantCoord}>[LOW POWER / LOW INTEREST]</span>
                </div>
                <ul className={styles.quadrantList}>
                  {STAKEHOLDER_MATRIX.monitor.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.quadrant}>
                <div className={styles.quadrantHeader}>
                  <span>KEEP INFORMED</span>
                  <span className={styles.quadrantCoord}>[LOW POWER / HIGH INTEREST]</span>
                </div>
                <ul className={styles.quadrantList}>
                  {STAKEHOLDER_MATRIX.keepInformed.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Stakeholder Register Table */}
          <div style={{ marginTop: '2rem' }}>
            <div className={styles.filterBar}>
              <span className={styles.filterLabel}>FILTER BY GROUP:</span>
              {['ALL', 'EXECUTIVE', 'COMMERCIAL', 'PROJECT MANAGEMENT', 'INFRASTRUCTURE', 'ACADEMIC'].map((grp) => (
                <button
                  key={grp}
                  onClick={() => setStakeholderFilter(grp)}
                  className={`${styles.filterBtn} ${stakeholderFilter === grp ? styles.filterBtnActive : ''}`}
                >
                  {grp}
                </button>
              ))}
            </div>

            <div className={styles.tableResponsive}>
              <table className={styles.dataTable}>
                <thead>
                  <tr>
                    <th>ROLE & ENTITY</th>
                    <th>POWER / INTEREST</th>
                    <th>KEY EXPECTATIONS</th>
                    <th>COMMUNICATION</th>
                    <th>MANAGEMENT STRATEGY</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStakeholders.map((s, i) => (
                    <tr key={i}>
                      <td>
                        <strong>{s.role}</strong>
                        <div className={styles.groupTag}>{s.group}</div>
                      </td>
                      <td>
                        <span className={styles.tag}>P: {s.power}</span>{' '}
                        <span className={styles.tag}>I: {s.interest}</span>
                      </td>
                      <td className={styles.targetCell}>{s.expectations}</td>
                      <td className={styles.verificationCell}>{s.communication}</td>
                      <td>
                        <strong className={styles.cellHighlight}>{s.strategy}</strong>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* ────────────────────────────────────────────────────────── */}
      {/* 07 BUDGET */}
      {/* ────────────────────────────────────────────────────────── */}
      {shouldShow('budget') && (
        <section id="section-budget" className={styles.sectionBlock}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNum}>07 // RESOURCE ALLOCATION</span>
            <h2 className={styles.sectionTitle}>PROJECT BUDGET DASHBOARD (RM500,000)</h2>
          </div>

          <div className={styles.disclaimerBox}>
            <Info size={16} />
            <span>
              <strong>GOVERNANCE NOTICE:</strong> {BUDGET_DATA.planningNotice}. Authorized baseline 
              expenditure ceiling is RM500,000. Changes require formal change control authorization (Gate G1).
            </span>
          </div>

          {/* Budget Summary Cards */}
          <div className={styles.budgetKpiGrid}>
            <div className={styles.budgetCard}>
              <span className={styles.budgetCardLabel}>TOTAL BASELINE CEILING</span>
              <span className={styles.budgetCardVal}>RM 500,000</span>
              <span className={styles.budgetCardSub}>100% of Authorized Capital</span>
            </div>
            <div className={styles.budgetCard}>
              <span className={styles.budgetCardLabel}>PRIMARY DEVELOPMENT</span>
              <span className={styles.budgetCardVal}>RM 190,000</span>
              <span className={styles.budgetCardSub}>38% (Architecture, 3D, Commerce)</span>
            </div>
            <div className={styles.budgetCard}>
              <span className={styles.budgetCardLabel}>CONTINGENCY RESERVE</span>
              <span className={styles.budgetCardVal}>RM 70,000</span>
              <span className={styles.budgetCardSub}>14% Risk Mitigation Allowance</span>
            </div>
            <div className={styles.budgetCard}>
              <span className={styles.budgetCardLabel}>CURRENT EXPENDITURE STATUS</span>
              <span className={styles.budgetCardValGreen}>ON TARGET</span>
              <span className={styles.budgetCardSub}>Demo Development Sprint</span>
            </div>
          </div>

          {/* Horizontal Bar Chart of Categories */}
          <div className={styles.budgetVisuals}>
            <h3 className={styles.cardHeader}>WBS Budget Distribution</h3>
            <div className={styles.barChartWrap}>
              {BUDGET_DATA.categories.map((c) => (
                <div key={c.id} className={styles.barItem}>
                  <div className={styles.barInfo}>
                    <span className={styles.barName}>{c.name}</span>
                    <span className={styles.barVal}>
                      RM {c.allocation.toLocaleString()} ({c.percentage}%)
                    </span>
                  </div>
                  <div className={styles.barTrack}>
                    <div
                      className={styles.barFill}
                      style={{ width: `${(c.percentage / 38) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Itemized Category Breakdown */}
          <div className={styles.categoryDetailGrid}>
            {BUDGET_DATA.categories.map((cat) => (
              <div key={cat.id} className={styles.catBox}>
                <div className={styles.catTop}>
                  <h4 className={styles.catTitle}>{cat.name}</h4>
                  <span className={styles.catTotal}>RM {cat.allocation.toLocaleString()}</span>
                </div>
                <p className={styles.catDesc}>{cat.description}</p>
                <div className={styles.subItemList}>
                  {cat.breakdown.map((item, idx) => (
                    <div key={idx} className={styles.subItem}>
                      <span className={styles.subName}>{item.item}</span>
                      <span className={styles.subAmount}>RM {item.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ────────────────────────────────────────────────────────── */}
      {/* 08 RISK MANAGEMENT */}
      {/* ────────────────────────────────────────────────────────── */}
      {shouldShow('risks') && (
        <section id="section-risks" className={styles.sectionBlock}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNum}>08 // CONTINGENCY PLANNING</span>
            <h2 className={styles.sectionTitle}>RISK MANAGEMENT & RISK REGISTER</h2>
          </div>

          {/* Formula & Scales */}
          <div className={styles.riskFormulaCard}>
            <div className={styles.formulaLeft}>
              <span className={styles.formulaLabel}>RISK CALCULATION FORMULA:</span>
              <strong className={styles.formulaCode}>{RISK_DATA.formula}</strong>
            </div>
            <div className={styles.scaleBadges}>
              {RISK_DATA.scales.map((s, i) => (
                <div key={i} className={`${styles.scalePill} ${styles['pill_' + s.tone]}`}>
                  <strong>{s.range}</strong> // {s.label}
                </div>
              ))}
            </div>
          </div>

          {/* 5x5 Heatmap Matrix */}
          <div className={styles.heatmapCard}>
            <div className={styles.heatmapTitle}>
              VISUAL 5 × 5 RISK HEATMAP MATRIX (PROBABILITY VS. IMPACT)
            </div>
            <div className={styles.heatmapWrap}>
              <div className={styles.yAxisLabel}>PROBABILITY (1 to 5) →</div>
              <div className={styles.heatmapGrid}>
                {[5, 4, 3, 2, 1].map((prob) => (
                  <div key={prob} className={styles.heatmapRow}>
                    <span className={styles.axisCoord}>P={prob}</span>
                    {[1, 2, 3, 4, 5].map((imp) => {
                      const score = prob * imp
                      const cellTone =
                        score >= 17 ? 'red' : score >= 10 ? 'orange' : score >= 5 ? 'yellow' : 'green'
                      const risksHere = RISK_DATA.register.filter(
                        (r) => r.probability === prob && r.impact === imp
                      )
                      return (
                        <div
                          key={imp}
                          className={`${styles.heatmapCell} ${styles['cell_' + cellTone]}`}
                        >
                          <span className={styles.cellScore}>{score}</span>
                          <div className={styles.cellRisks}>
                            {risksHere.map((r) => (
                              <span key={r.id} className={styles.riskMarker} title={`${r.id}: ${r.event}`}>
                                {r.id}
                              </span>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ))}
                <div className={styles.xAxisRow}>
                  <span className={styles.axisCoord}></span>
                  {[1, 2, 3, 4, 5].map((imp) => (
                    <span key={imp} className={styles.xAxisLabel}>I={imp}</span>
                  ))}
                </div>
                <div className={styles.xAxisTitle}>IMPACT (1 to 5) →</div>
              </div>
            </div>
          </div>

          {/* Filter and Register */}
          <div style={{ marginTop: '2rem' }}>
            <div className={styles.filterBar}>
              <span className={styles.filterLabel}>RBS CATEGORY:</span>
              {['ALL', 'Project Management', 'Technical', 'Cybersecurity', 'Product', 'Supplier'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedRiskCategory(cat)}
                  className={`${styles.filterBtn} ${selectedRiskCategory === cat ? styles.filterBtnActive : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className={styles.tableResponsive}>
              <table className={styles.dataTable}>
                <thead>
                  <tr>
                    <th style={{ width: '60px' }}>ID</th>
                    <th>RISK EVENT</th>
                    <th style={{ width: '90px' }}>P × I</th>
                    <th style={{ width: '100px' }}>SCORE</th>
                    <th>PREVENTIVE MITIGATION</th>
                    <th>CONTINGENCY ACTION</th>
                    <th>OWNER</th>
                    <th>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRisks.map((r) => (
                    <tr key={r.id}>
                      <td className={styles.codeCell}>{r.id}</td>
                      <td>
                        <strong>{r.event}</strong>
                        <div className={styles.groupTag}>{r.category}</div>
                      </td>
                      <td className={styles.calcCell}>
                        {r.probability} × {r.impact}
                      </td>
                      <td>
                        <span className={`${styles.statusPill} ${styles['pill_' + r.tone]}`}>
                          {r.score} // {r.level}
                        </span>
                      </td>
                      <td className={styles.targetCell}>{r.mitigation}</td>
                      <td className={styles.verificationCell}>{r.contingency}</td>
                      <td>
                        <span className={styles.tag}>{r.owner}</span>
                      </td>
                      <td>
                        <strong className={styles.cellHighlight}>{r.status}</strong>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* ────────────────────────────────────────────────────────── */}
      {/* 09 WBS */}
      {/* ────────────────────────────────────────────────────────── */}
      {shouldShow('wbs') && (
        <section id="section-wbs" className={styles.sectionBlock}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNum}>09 // WORK BREAKDOWN STRUCTURE</span>
            <h2 className={styles.sectionTitle}>NINE WBS WORK PACKAGES (1.0 TO 9.0)</h2>
          </div>

          <div className={styles.wbsGrid}>
            {WBS_DATA.map((wbs) => (
              <div key={wbs.code} className={styles.wbsCard}>
                <div className={styles.wbsTop}>
                  <span className={styles.wbsCode}>{wbs.code}</span>
                  <span className={styles.wbsDeliverable}>{wbs.deliverable}</span>
                </div>
                <h3 className={styles.wbsName}>{wbs.name}</h3>
                <div className={styles.wbsTaskList}>
                  {wbs.tasks.map((t, idx) => (
                    <div key={idx} className={styles.wbsTaskItem}>
                      <ChevronRight size={14} className={styles.wbsBullet} />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ────────────────────────────────────────────────────────── */}
      {/* 10 MILESTONES & TWO LIFECYCLES */}
      {/* ────────────────────────────────────────────────────────── */}
      {shouldShow('milestones') && (
        <section id="section-milestones" className={styles.sectionBlock}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNum}>10 // PROGRESS GATES & LIFECYCLES</span>
            <h2 className={styles.sectionTitle}>QUALITY GATES (G1–G9) & LIFECYCLE SEPARATION</h2>
          </div>

          {/* CRITICAL DISTINCTION OF TWO LIFECYCLES */}
          <div className={styles.twoLifecyclesBanner}>
            <div className={styles.lifecycleCard}>
              <div className={styles.lifecycleTop}>
                <span className={styles.badge_green}>COMMERCIAL TRANSACTION SYSTEM</span>
                <h3>{LIFECYCLES_COMPARISON.customerOrderLifecycle.title}</h3>
              </div>
              <p className={styles.lifecycleDesc}>
                {LIFECYCLES_COMPARISON.customerOrderLifecycle.description}
              </p>
              <div className={styles.stageStepper}>
                {LIFECYCLES_COMPARISON.customerOrderLifecycle.stages.map((st) => (
                  <div key={st.step} className={styles.stepItem}>
                    <span className={styles.stepNum}>{st.step}</span>
                    <strong className={styles.stepName}>{st.name}</strong>
                    <span className={styles.stepDesc}>{st.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.lifecycleCard}>
              <div className={styles.lifecycleTop}>
                <span className={styles.badge_yellow}>SOFTWARE GOVERNANCE SYSTEM</span>
                <h3>{LIFECYCLES_COMPARISON.projectDeliveryLifecycle.title}</h3>
              </div>
              <p className={styles.lifecycleDesc}>
                {LIFECYCLES_COMPARISON.projectDeliveryLifecycle.description}
              </p>
              <div className={styles.stageStepper}>
                {LIFECYCLES_COMPARISON.projectDeliveryLifecycle.stages.map((st) => (
                  <div key={st.step} className={styles.stepItem}>
                    <span className={styles.stepNum}>{st.step}</span>
                    <strong className={styles.stepName}>{st.name}</strong>
                    <span className={styles.stepDesc}>{st.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 9 Quality Gates Table */}
          <div style={{ marginTop: '2.5rem' }}>
            <h3 className={styles.cardHeader}>Nine Milestone Quality Gates (G1 to G9)</h3>
            <p className={styles.cardSubText}>
              Note: The milestone plan represents a sequence rather than a committed calendar, per ITM3207 specification.
            </p>

            <div className={styles.tableResponsive}>
              <table className={styles.dataTable}>
                <thead>
                  <tr>
                    <th style={{ width: '90px' }}>GATE</th>
                    <th>MILESTONE GATE NAME</th>
                    <th>ENTRY / EXIT EVIDENCE</th>
                    <th>ACCOUNTABLE APPROVAL</th>
                    <th>CURRENT STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {MILESTONES_DATA.map((m) => (
                    <tr key={m.gate}>
                      <td className={styles.codeCell}>{m.gate}</td>
                      <td>
                        <strong>{m.name}</strong>
                      </td>
                      <td className={styles.targetCell}>{m.entryExitEvidence}</td>
                      <td>
                        <span className={styles.tag}>{m.accountableApproval}</span>
                      </td>
                      <td>
                        <span className={`${styles.statusPill} ${styles['pill_' + m.statusTone]}`}>
                          {m.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* ────────────────────────────────────────────────────────── */}
      {/* 11 QUALITY & SECURITY */}
      {/* ────────────────────────────────────────────────────────── */}
      {shouldShow('quality') && (
        <section id="section-quality" className={styles.sectionBlock}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNum}>11 // VERIFICATION EVIDENCE</span>
            <h2 className={styles.sectionTitle}>QUALITY ASSURANCE & SECURITY EVIDENCE</h2>
          </div>

          <div className={styles.qaGrid}>
            {QUALITY_SECURITY_DATA.map((qa, idx) => (
              <div key={idx} className={styles.qaCard}>
                <div className={styles.qaTop}>
                  <h3 className={styles.qaCategory}>{qa.category}</h3>
                  <span className={`${styles.statusPill} ${styles['pill_' + qa.tone]}`}>
                    {qa.status}
                  </span>
                </div>
                <div className={styles.qaBody}>
                  <div className={styles.qaSection}>
                    <span className={styles.qaLabel}>VERIFIED EVIDENCE:</span>
                    <p className={styles.qaText}>{qa.evidence}</p>
                  </div>
                  <div className={styles.qaSection}>
                    <span className={styles.qaLabel}>TECHNICAL NOTES:</span>
                    <p className={styles.qaNotes}>{qa.notes}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ────────────────────────────────────────────────────────── */}
      {/* 12 DEPLOYMENT */}
      {/* ────────────────────────────────────────────────────────── */}
      {shouldShow('deployment') && (
        <section id="section-deployment" className={styles.sectionBlock}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNum}>12 // INFRASTRUCTURE READINESS</span>
            <h2 className={styles.sectionTitle}>DEPLOYMENT READINESS DASHBOARD</h2>
          </div>

          <div className={styles.deployAlert}>
            <AlertTriangle size={20} />
            <div>
              <strong>ENVIRONMENT STATUS: LOCAL DEMO (http://localhost:4173/)</strong>
              <p>
                This application is deployed on a local Vite preview server for demonstration and academic evaluation. 
                It is <strong>NOT A PRODUCTION CLUSTER</strong>. No live banking, cloud secrets, or production SSL certs are configured.
              </p>
            </div>
          </div>

          <div className={styles.deployGrid}>
            {DEPLOYMENT_DATA.items.map((item, i) => (
              <div key={i} className={styles.deployCard}>
                <div className={styles.deployTop}>
                  <span className={styles.deployParam}>{item.parameter}</span>
                  <span className={`${styles.statusPill} ${styles['pill_' + item.tone]}`}>
                    {item.status}
                  </span>
                </div>
                <p className={styles.deployDetail}>{item.detail}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ────────────────────────────────────────────────────────── */}
      {/* 13 HANDOVER */}
      {/* ────────────────────────────────────────────────────────── */}
      {shouldShow('handover') && (
        <section id="section-handover" className={styles.sectionBlock}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNum}>13 // OPERATIONAL CLOSURE</span>
            <h2 className={styles.sectionTitle}>PROJECT HANDOVER CHECKLIST</h2>
          </div>

          <div className={styles.handoverList}>
            {HANDOVER_DATA.map((h, idx) => (
              <div key={idx} className={styles.handoverItem}>
                <div className={styles.handoverLeft}>
                  <div className={styles.handoverIndex}>H-0{idx + 1}</div>
                  <div>
                    <h3 className={styles.handoverItemTitle}>{h.item}</h3>
                    <p className={styles.handoverDesc}>{h.description}</p>
                  </div>
                </div>
                <div className={styles.handoverRight}>
                  <span className={`${styles.statusPill} ${styles['pill_' + h.tone]}`}>
                    {h.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
