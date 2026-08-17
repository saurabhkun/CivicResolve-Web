import React from 'react';

export default function RecentReportsFeed({
  reports,
  selectedReportId,
  onSelectReport,
  viewMode,
  selectedWard
}) {
  return (
    <div className="admin-card">
      <div className="admin-card-header">
        <div>
          <h2 className="admin-card-title">Live Municipal Grievance Intake & Dispatch Ledger</h2>
          <div className="admin-card-subtitle">
            {viewMode === 'sla_matrix' ? 'SLA Risk Matrix View - Highlighting immediate escalation priorities' :
             viewMode === 'departmental' ? 'Zonal Departmental Allocation View' :
             'Real-time public intake audit stream with SLA compliance metrics'}
          </div>
        </div>

        <div>
          <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
            Showing <strong>{reports.length}</strong> active records for <strong>{selectedWard === 'all' ? 'City-wide' : selectedWard.toUpperCase()}</strong>
          </span>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="admin-data-table">
          <thead>
            <tr>
              <th style={{ width: '125px' }}>Case Reference</th>
              <th>Incident Summary</th>
              <th>Category</th>
              <th>Jurisdiction / Ward</th>
              <th>Timestamp</th>
              <th>Assigned Contractor / Unit</th>
              <th>SLA Window</th>
              <th style={{ width: '110px' }}>Status</th>
              <th style={{ width: '100px', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.length === 0 ? (
              <tr>
                <td colSpan={9} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                  No active grievance records found matching selected ward or queue filters.
                </td>
              </tr>
            ) : (
              reports.map((report) => {
                const isSelected = selectedReportId === report.id;
                return (
                  <tr
                    key={report.id}
                    className={isSelected ? 'selected-row' : ''}
                    onClick={() => onSelectReport(report)}
                    title="Click row to open comprehensive Municipal Dispatch Dossier"
                  >
                    <td className="case-id-cell">{report.id}</td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{report.title}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        Reporter: {report.reporter} ({report.reporterUid})
                      </div>
                    </td>
                    <td>{report.category}</td>
                    <td>
                      <div>{report.location}</div>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{report.wardName || 'Ward 01'}</div>
                    </td>
                    <td style={{ fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>{report.timestamp}</td>
                    <td>
                      <div style={{ fontWeight: 500 }}>{report.assignedDepartment}</div>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{report.assignedContractor}</div>
                    </td>
                    <td>
                      <span className={`priority-pill ${report.status === 'urgent' ? 'high' : ''}`}>
                        {report.slaRemaining}
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge-solid ${report.status}`}>
                        {report.status === 'urgent' ? 'Urgent' :
                         report.status === 'pending' ? 'Pending' :
                         report.status === 'progress' ? 'In Progress' : 'Resolved'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <button
                        className="admin-btn primary"
                        style={{ padding: '0.2rem 0.55rem', fontSize: '11px' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectReport(report);
                        }}
                      >
                        Dossier
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="admin-pagination">
        <span>Click any case row to inspect evidence thumbnails, historical audit logs, and dispatch controls</span>
        <div className="pagination-controls">
          <button className="pagination-btn" disabled>Previous</button>
          <button className="pagination-btn" style={{ background: 'var(--gov-blue-primary)', color: '#FFFFFF' }}>1</button>
          <button className="pagination-btn" disabled>Next</button>
        </div>
      </div>
    </div>
  );
}
