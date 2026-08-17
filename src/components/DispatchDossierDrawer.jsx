import React, { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { CONTRACTOR_UNITS } from '../data/mockData';

export default function DispatchDossierDrawer({
  report,
  isOpen,
  onClose,
  activeRole,
  onUpdateCase
}) {
  const drawerRef = useRef(null);
  const backdropRef = useRef(null);

  // Local form state for contractor assignment and status updates
  const [currentStatus, setCurrentStatus] = useState(report?.status || 'pending');
  const [selectedContractor, setSelectedContractor] = useState(report?.contractorUnitId || 'pru-alpha');
  const [priority, setPriority] = useState(report?.priority || 'High');
  const [officerNote, setOfficerNote] = useState('');
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    if (report) {
      setCurrentStatus(report.status);
      setSelectedContractor(report.contractorUnitId || 'pru-alpha');
      setPriority(report.priority || 'High');
      setOfficerNote('');
      setSaveMessage('');
    }
  }, [report]);

  useGSAP(() => {
    if (isOpen && drawerRef.current) {
      gsap.fromTo(
        drawerRef.current,
        { x: '100%' },
        { x: '0%', duration: 0.35, ease: 'power2.out' }
      );
      if (backdropRef.current) {
        gsap.fromTo(
          backdropRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.25 }
        );
      }
    }
  }, { scope: backdropRef, dependencies: [isOpen] });

  const handleClose = () => {
    if (drawerRef.current) {
      gsap.to(drawerRef.current, {
        x: '100%',
        duration: 0.25,
        ease: 'power2.in',
        onComplete: onClose
      });
    } else {
      onClose();
    }
  };

  const handleSaveChanges = () => {
    const updated = {
      ...report,
      status: currentStatus,
      priority: priority,
      contractorUnitId: selectedContractor,
      assignedContractor: CONTRACTOR_UNITS.find(c => c.id === selectedContractor)?.name || report.assignedContractor,
      auditTrail: [
        ...(report.auditTrail || []),
        {
          id: `aud-${Date.now()}`,
          timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC',
          actor: `${activeRole.name} (Session Clearance: ${activeRole.clearance})`,
          actorRole: activeRole.name,
          action: `Status updated to ${currentStatus.toUpperCase()}`,
          details: officerNote ? `Officer Log: ${officerNote}` : `Assigned contractor unit: ${selectedContractor}`
        }
      ]
    };

    onUpdateCase(updated);
    setSaveMessage('Case record & dispatch orders updated in central ledger.');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handlePrintWorkOrder = () => {
    window.print();
  };

  if (!isOpen || !report) return null;

  const canEdit = activeRole.permissions.canReassign || activeRole.permissions.canCertifyResolution;

  return (
    <div className="drawer-backdrop" ref={backdropRef} onClick={handleClose}>
      <div
        className="dossier-drawer"
        ref={drawerRef}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="drawer-header">
          <div>
            <div className="drawer-header-title">
              Municipal Case Dossier: {report.id}
            </div>
            <div className="drawer-header-meta">
              <span>Jurisdiction: {report.wardName || 'Ward 01'}</span>
              <span>•</span>
              <span>Lodged: {report.timestamp}</span>
            </div>
          </div>
          <button className="drawer-close-btn" onClick={handleClose}>
            Close [Esc]
          </button>
        </div>

        {/* Scrollable Dossier Content */}
        <div className="drawer-scroll-body">
          {saveMessage && (
            <div style={{
              background: '#F0FDF4',
              border: '1px solid #86EFAC',
              color: '#166534',
              padding: '0.6rem 0.85rem',
              fontSize: '12px',
              fontWeight: '600'
            }}>
              {saveMessage}
            </div>
          )}

          {/* 1. Incident Overview */}
          <div className="dossier-section">
            <div className="dossier-section-header">
              <span>1. Incident Classification & Coordinates</span>
              <span className={`status-badge-solid ${report.status}`}>
                {report.status}
              </span>
            </div>

            <div style={{ marginBottom: '0.75rem' }}>
              <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                {report.title}
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                {report.description}
              </p>
            </div>

            <div className="dossier-grid">
              <div className="dossier-field">
                <label>Physical Address / Location:</label>
                <div className="dossier-field-val">{report.location}</div>
              </div>
              <div className="dossier-field">
                <label>Geospatial Coordinates:</label>
                <div className="dossier-field-val" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
                  {report.geoCoordinates}
                </div>
              </div>
              <div className="dossier-field">
                <label>Citizen Reporter UID:</label>
                <div className="dossier-field-val">{report.reporter} ({report.reporterUid})</div>
              </div>
              <div className="dossier-field">
                <label>SLA Compliance Window:</label>
                <div className="dossier-field-val" style={{ color: report.status === 'urgent' ? '#B91C1C' : '#1E3A5F' }}>
                  {report.slaRemaining} (Target: {report.slaTargetHours || 24}h)
                </div>
              </div>
            </div>
          </div>

          {/* 2. Photographic Evidentiary Verification */}
          <div className="dossier-section">
            <div className="dossier-section-header">
              <span>2. Citizen & Field Photographic Evidence</span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                {report.evidencePhotos?.length || 0} Tamper-Checked Attachments
              </span>
            </div>

            <div className="evidence-gallery">
              {report.evidencePhotos?.map((photo) => (
                <div key={photo.id} className="evidence-card">
                  <div className="evidence-img-placeholder">
                    <span>[ Verified Municipal Inspection Photo ]</span>
                    <span style={{ fontSize: '10px', color: '#64748B', marginTop: '0.2rem' }}>
                      {photo.title}
                    </span>
                  </div>
                  <div className="evidence-details">
                    <div className="evidence-caption">{photo.caption}</div>
                    <div className="evidence-exif">{photo.exifData}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Contractor Triage & Dispatch Control (RBAC Gated) */}
          <div className="dossier-section">
            <div className="dossier-section-header">
              <span>3. Departmental Contractor Dispatch Controls</span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Active Clearance: {activeRole.clearance}
              </span>
            </div>

            <div className="dossier-grid" style={{ marginBottom: '0.75rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '0.25rem', fontWeight: 600 }}>
                  Assigned Contractor Fleet:
                </label>
                <select
                  className="admin-select"
                  style={{ width: '100%' }}
                  value={selectedContractor}
                  disabled={!activeRole.permissions.canReassign}
                  onChange={(e) => setSelectedContractor(e.target.value)}
                >
                  {CONTRACTOR_UNITS.map((unit) => (
                    <option key={unit.id} value={unit.id}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '0.25rem', fontWeight: 600 }}>
                  Triage Case Status:
                </label>
                <select
                  className="admin-select"
                  style={{ width: '100%' }}
                  value={currentStatus}
                  disabled={!canEdit}
                  onChange={(e) => setCurrentStatus(e.target.value)}
                >
                  <option value="pending">Pending Officer Review</option>
                  <option value="progress">Active Field Execution</option>
                  <option value="urgent">Escalated / SLA Urgent</option>
                  <option value="resolved">Resolved & Certified</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '0.25rem', fontWeight: 600 }}>
                Departmental Officer Dispatch Directive:
              </label>
              <textarea
                style={{
                  width: '100%',
                  padding: '0.45rem',
                  fontFamily: 'inherit',
                  fontSize: '12px',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-xs)',
                  resize: 'vertical',
                  minHeight: '55px'
                }}
                placeholder={canEdit ? "Enter official instruction for field supervisor or dispatch contractor..." : "Read-only mode under current role."}
                value={officerNote}
                disabled={!canEdit}
                onChange={(e) => setOfficerNote(e.target.value)}
              />
            </div>
          </div>

          {/* 4. Immutable Historical Audit Trail */}
          <div className="dossier-section">
            <div className="dossier-section-header">
              <span>4. Tamper-Evident Audit Trail</span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Immutable Ledger
              </span>
            </div>

            <div className="audit-timeline">
              {report.auditTrail?.map((entry) => (
                <div key={entry.id} className="audit-entry">
                  <div className="audit-dot"></div>
                  <div className="audit-action-title">{entry.action}</div>
                  <div className="audit-actor">{entry.actor} ({entry.timestamp})</div>
                  <div className="audit-details">{entry.details}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Drawer Action Footer */}
        <div className="drawer-footer">
          <button
            className="admin-btn"
            onClick={handlePrintWorkOrder}
          >
            Print Work Order
          </button>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              className="admin-btn"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              className="admin-btn primary"
              disabled={!canEdit}
              onClick={handleSaveChanges}
            >
              Update Ledger & Dispatch
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
