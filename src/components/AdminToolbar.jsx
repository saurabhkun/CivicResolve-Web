import React from 'react';
import { WARDS_DIRECTORY } from '../data/mockData';

export default function AdminToolbar({
  selectedWard,
  onWardChange,
  selectedStatus,
  onStatusChange,
  viewMode,
  onViewModeChange,
  onSimulateInflow,
  onExportCSV,
  onOpenAuditModal,
  totalRecords
}) {
  return (
    <div className="admin-control-bar">
      <div className="control-bar-left">
        <span className="control-bar-title">Jurisdiction / Ward:</span>

        {/* Multi-Jurisdiction Geo-Ward Quick-Toggle Tabs */}
        <div className="ward-tab-strip">
          {WARDS_DIRECTORY.map((ward) => (
            <button
              key={ward.id}
              className={`ward-tab-btn ${selectedWard === ward.id ? 'active' : ''}`}
              onClick={() => onWardChange(ward.id)}
              title={`${ward.name} (${ward.activeCases} active)`}
            >
              {ward.id === 'all' ? 'All Wards' : ward.id.toUpperCase().replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Workflow Queue Filter */}
        <div className="admin-input-group">
          <label htmlFor="status-filter">Workflow Queue:</label>
          <select
            id="status-filter"
            className="admin-select"
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
          >
            <option value="all">All Complaint States</option>
            <option value="urgent">Urgent / SLA Breach</option>
            <option value="pending">Pending Officer Intake</option>
            <option value="progress">Active Field Execution</option>
            <option value="resolved">Resolved & Certified</option>
          </select>
        </div>

        {/* View Mode Switcher */}
        <div className="admin-input-group">
          <label htmlFor="view-mode">View Mode:</label>
          <select
            id="view-mode"
            className="admin-select"
            value={viewMode}
            onChange={(e) => onViewModeChange(e.target.value)}
          >
            <option value="ledger">Standard Audit Ledger</option>
            <option value="sla_matrix">SLA Risk Matrix</option>
            <option value="departmental">Zonal Department View</option>
          </select>
        </div>
      </div>

      <div className="control-bar-right">
        {/* Verifiable Transparency Badge */}
        <button
          className="admin-btn"
          style={{ background: '#F0FDF4', color: '#166534', borderColor: '#86EFAC', fontSize: '11px' }}
          onClick={onOpenAuditModal}
          title="Inspect cryptographic ledger integrity"
        >
          [✓ Verified Audit Log]
        </button>

        <button
          className="admin-btn"
          onClick={onSimulateInflow}
          title="Simulate incoming dispatch queue telemetry"
        >
          Simulate Inflow
        </button>

        <button
          className="admin-btn amber"
          onClick={onExportCSV}
          title="Export complaint audit log as CSV"
        >
          Export CSV Log
        </button>
      </div>
    </div>
  );
}
