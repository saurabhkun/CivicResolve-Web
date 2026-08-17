import React from 'react';

export default function Footer() {
  return (
    <footer className="gov-footer">
      <div className="gov-footer-inner">
        <div>
          <strong>CivicResolve Municipal Administration Platform</strong>
          <div className="gov-disclaimer">
            An official portal of the Department of Public Works and Urban Grievance Redressal.
            All complaint logs, geospatial telemetry, and resolution records are subject to Public Records Compliance.
          </div>
        </div>

        <div className="gov-footer-links">
          <a href="#privacy">Privacy & Public Records Policy</a>
          <a href="#accessibility">Section 508 Accessibility</a>
          <a href="#terms">Terms of Administrative Use</a>
          <a href="#contact">Departmental Directory</a>
        </div>
      </div>
    </footer>
  );
}
