import React from 'react';
import { ADMINISTRATIVE_ROLES } from '../data/mockData';

export default function Header({
  activeRole,
  onRoleChange,
  onRefresh,
  isRefreshing,
  onOpenAuditModal
}) {
  return (
    <>
      {/* Official Government Top Bar */}
      <div className="gov-banner">
        <div className="gov-banner-text">
          <span className="gov-banner-flag"></span>
          <span>Official Public Works & Municipal Grievance Administration System</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span>Departmental Portal ID: SEC-MUNI-2026-B</span>
          <button
            onClick={onOpenAuditModal}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#38BDF8',
              textDecoration: 'underline',
              cursor: 'pointer',
              fontSize: '11px'
            }}
          >
            Audit Compliance: Certified (SHA-256)
          </button>
        </div>
      </div>

      {/* Main Administrative Header */}
      <header className="header-wrapper">
        <div className="header-inner">
          <div className="logo-group">
            <div className="logo-seal">
              CR
            </div>
            <div className="logo-text">
              <h1>CivicResolve Administration</h1>
              <div className="logo-sub">Municipal Grievance Redressal & Dispatch Console</div>
            </div>
          </div>

          <div className="header-right">
            {/* RBAC Role Selector Dropdown */}
            <div className="rbac-role-control">
              <span className="rbac-label">Session Role:</span>
              <select
                className="rbac-select"
                value={activeRole.id}
                onChange={(e) => {
                  const role = ADMINISTRATIVE_ROLES.find(r => r.id === e.target.value);
                  if (role) onRoleChange(role);
                }}
              >
                {ADMINISTRATIVE_ROLES.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Clearance Level Indicator */}
            <div className="clearance-badge" title={activeRole.jurisdiction}>
              <span>{activeRole.clearance}</span>
            </div>

            <button
              className="admin-btn primary"
              onClick={onRefresh}
              disabled={isRefreshing}
              title="Synchronize records with central database"
            >
              <span>{isRefreshing ? 'Syncing...' : 'Sync Gateway'}</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
