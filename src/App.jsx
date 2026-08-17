import React, { useState, useCallback, useMemo } from 'react';
import Header from './components/Header';
import AdminToolbar from './components/AdminToolbar';
import MetricCardsGrid from './components/MetricCardsGrid';
import WeeklyActivityChart from './components/WeeklyActivityChart';
import StatusDistributionChart from './components/StatusDistributionChart';
import RecentReportsFeed from './components/RecentReportsFeed';
import DispatchDossierDrawer from './components/DispatchDossierDrawer';
import AuditVerificationModal from './components/AuditVerificationModal';
import Footer from './components/Footer';

import {
  ADMINISTRATIVE_ROLES,
  INITIAL_METRICS_BY_WARD,
  WEEKLY_ACTIVITY_DATA_BY_WARD,
  STATUS_DISTRIBUTION_DATA,
  RECENT_REPORTS_DETAILED
} from './data/mockData';

export default function App() {
  // 1. RBAC Active Role State
  const [activeRole, setActiveRole] = useState(ADMINISTRATIVE_ROLES[0]);

  // 2. Multi-Jurisdiction Geo-Ward State
  const [selectedWard, setSelectedWard] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [viewMode, setViewMode] = useState('ledger'); // 'ledger', 'sla_matrix', 'departmental'

  // 3. Reports Ledger State
  const [allReports, setAllReports] = useState(RECENT_REPORTS_DETAILED);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // 4. Audit Modal State
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);

  // 5. Inflow Simulation & Animation Replay State
  const [replayKey, setReplayKey] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Dynamic Metrics & Chart Data based on selected Ward
  const currentMetrics = useMemo(() => {
    return INITIAL_METRICS_BY_WARD[selectedWard] || INITIAL_METRICS_BY_WARD.all;
  }, [selectedWard]);

  const currentWeeklyData = useMemo(() => {
    return WEEKLY_ACTIVITY_DATA_BY_WARD[selectedWard] || WEEKLY_ACTIVITY_DATA_BY_WARD.all;
  }, [selectedWard]);

  // Filtered reports based on Ward & Status
  const filteredReports = useMemo(() => {
    return allReports.filter((report) => {
      if (selectedWard !== 'all' && report.wardId !== selectedWard) {
        return false;
      }
      if (selectedStatus !== 'all' && report.status !== selectedStatus) {
        return false;
      }
      if (viewMode === 'sla_matrix' && report.status === 'resolved') {
        return false; // In SLA risk matrix, show open/at-risk issues
      }
      return true;
    });
  }, [allReports, selectedWard, selectedStatus, viewMode]);

  // Open / Close Dispatch Dossier Drawer
  const handleSelectReport = useCallback((report) => {
    setSelectedReport(report);
    setIsDrawerOpen(true);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setIsDrawerOpen(false);
  }, []);

  // Update Case Record from Drawer
  const handleUpdateCase = useCallback((updatedReport) => {
    setAllReports((prev) =>
      prev.map((r) => (r.id === updatedReport.id ? updatedReport : r))
    );
    setSelectedReport(updatedReport);
  }, []);

  // Simulate Inflow
  const handleSimulateInflow = useCallback(() => {
    setReplayKey((prev) => prev + 1);
  }, []);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      handleSimulateInflow();
      setIsRefreshing(false);
    }, 400);
  }, [handleSimulateInflow]);

  // Functional CSV Export
  const handleExportCSV = useCallback(() => {
    const header = "CaseReference,Ward,IncidentSummary,Category,Location,GeoCoordinates,Timestamp,ReporterUID,AssignedDepartment,AssignedContractor,SLAStatus,CaseStatus\n";
    const rows = filteredReports.map((r) =>
      `"${r.id}","${r.wardName}","${r.title}","${r.category}","${r.location}","${r.geoCoordinates}","${r.timestamp}","${r.reporterUid}","${r.assignedDepartment}","${r.assignedContractor}","${r.slaRemaining}","${r.status}"`
    ).join("\n");

    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `civicresolve-municipal-ledger-${selectedWard}-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [filteredReports, selectedWard]);

  return (
    <div className="app-container">
      {/* 1. Header with RBAC Context */}
      <Header
        activeRole={activeRole}
        onRoleChange={setActiveRole}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        onOpenAuditModal={() => setIsAuditModalOpen(true)}
      />

      {/* Main Administrative Workspace */}
      <main className="dashboard-main">
        {/* 2. Administrative Control Bar with Multi-Jurisdiction Geo-Ward Switch */}
        <AdminToolbar
          selectedWard={selectedWard}
          onWardChange={setSelectedWard}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onSimulateInflow={handleSimulateInflow}
          onExportCSV={handleExportCSV}
          onOpenAuditModal={() => setIsAuditModalOpen(true)}
          totalRecords={filteredReports.length}
        />

        {/* 3. Flat High-Density Metric Overview KPI Panels (Ward-Reactive) */}
        <MetricCardsGrid
          metrics={currentMetrics}
          replayKey={replayKey}
        />

        {/* 4. Structured Analytical Charts (Ward-Reactive) */}
        <div className="charts-grid-row">
          <WeeklyActivityChart
            data={currentWeeklyData}
            replayKey={replayKey}
          />

          <StatusDistributionChart
            distribution={STATUS_DISTRIBUTION_DATA}
            replayKey={replayKey}
          />
        </div>

        {/* 5. Interactive Grievance Intake & Dispatch Ledger Table */}
        <RecentReportsFeed
          reports={filteredReports}
          selectedReportId={selectedReport?.id}
          onSelectReport={handleSelectReport}
          viewMode={viewMode}
          selectedWard={selectedWard}
        />
      </main>

      {/* 6. Interactive Dispatch Dossier Side-Drawer */}
      <DispatchDossierDrawer
        report={selectedReport}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        activeRole={activeRole}
        onUpdateCase={handleUpdateCase}
      />

      {/* 7. Tamper-Evident Audit Verification Modal */}
      <AuditVerificationModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        records={allReports}
        onExportCSV={handleExportCSV}
      />

      {/* 8. Legal & Compliance Footer */}
      <Footer />
    </div>
  );
}
