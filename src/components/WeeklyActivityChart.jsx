import React, { useRef, useState, useMemo } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

export default function WeeklyActivityChart({ data, replayKey }) {
  const containerRef = useRef(null);
  const pathSubmittedRef = useRef(null);
  const pathResolvedRef = useRef(null);
  const tooltipRef = useRef(null);
  const crosshairRef = useRef(null);
  const [activeView, setActiveView] = useState('all');
  const [hoveredData, setHoveredData] = useState(null);

  const width = 760;
  const height = 240;
  const padding = { top: 20, right: 25, bottom: 35, left: 45 };

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const { maxVal, pointsSubmitted, pointsResolved, pathDSubmitted, pathDResolved } = useMemo(() => {
    const max = Math.max(...data.map(d => Math.max(d.submitted, d.resolved))) * 1.15 || 100;
    
    const pSub = data.map((d, i) => {
      const x = padding.left + (i / (data.length - 1)) * chartWidth;
      const y = padding.top + chartHeight - (d.submitted / max) * chartHeight;
      return { x, y, ...d };
    });

    const pRes = data.map((d, i) => {
      const x = padding.left + (i / (data.length - 1)) * chartWidth;
      const y = padding.top + chartHeight - (d.resolved / max) * chartHeight;
      return { x, y, ...d };
    });

    const createPath = (pts) => {
      if (pts.length === 0) return '';
      return pts.reduce((acc, pt, i) => (i === 0 ? `M ${pt.x},${pt.y}` : `${acc} L ${pt.x},${pt.y}`), '');
    };

    return {
      maxVal: max,
      pointsSubmitted: pSub,
      pointsResolved: pRes,
      pathDSubmitted: createPath(pSub),
      pathDResolved: createPath(pRes)
    };
  }, [data, chartWidth, chartHeight]);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power1.out' } });

    if (pathSubmittedRef.current) {
      const lenSub = pathSubmittedRef.current.getTotalLength();
      gsap.set(pathSubmittedRef.current, { strokeDasharray: lenSub, strokeDashoffset: lenSub });
      tl.to(pathSubmittedRef.current, { strokeDashoffset: 0, duration: 0.6 });
    }

    if (pathResolvedRef.current) {
      const lenRes = pathResolvedRef.current.getTotalLength();
      gsap.set(pathResolvedRef.current, { strokeDasharray: lenRes, strokeDashoffset: lenRes });
      tl.to(pathResolvedRef.current, { strokeDashoffset: 0, duration: 0.6 }, '-=0.4');
    }

    return () => {
      tl.kill();
    };
  }, { scope: containerRef, dependencies: [replayKey, data] });

  const handleMouseMove = (e) => {
    if (!containerRef.current || !tooltipRef.current) return;
    const svgEl = containerRef.current.querySelector('svg');
    if (!svgEl) return;
    const rect = svgEl.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;

    const closestIdx = pointsSubmitted.reduce((closest, pt, idx) => {
      const dist = Math.abs(pt.x - mouseX);
      const closestDist = Math.abs(pointsSubmitted[closest].x - mouseX);
      return dist < closestDist ? idx : closest;
    }, 0);

    const ptSub = pointsSubmitted[closestIdx];
    const ptRes = pointsResolved[closestIdx];

    setHoveredData({
      day: ptSub.day,
      date: ptSub.date,
      submitted: ptSub.submitted,
      resolved: ptRes.resolved,
      x: ptSub.x,
      y: ptSub.y
    });

    gsap.to(crosshairRef.current, {
      attr: { x1: ptSub.x, x2: ptSub.x },
      opacity: 1,
      duration: 0.05
    });

    gsap.to(tooltipRef.current, {
      left: ptSub.x,
      top: ptSub.y - 10,
      opacity: 1,
      duration: 0.1
    });
  };

  const handleMouseLeave = () => {
    setHoveredData(null);
    if (crosshairRef.current) {
      gsap.to(crosshairRef.current, { opacity: 0, duration: 0.1 });
    }
    if (tooltipRef.current) {
      gsap.to(tooltipRef.current, { opacity: 0, duration: 0.1 });
    }
  };

  return (
    <div className="admin-card" ref={containerRef}>
      <div className="admin-card-header">
        <div>
          <h2 className="admin-card-title">Weekly Intake & Resolution Volume</h2>
          <div className="admin-card-subtitle">7-Day comparative complaint registration versus certified closures</div>
        </div>

        <div style={{ display: 'flex', gap: '0.35rem' }}>
          <button
            className={`admin-btn ${activeView === 'all' ? 'primary' : ''}`}
            onClick={() => setActiveView('all')}
            style={{ fontSize: '11px', padding: '0.2rem 0.5rem' }}
          >
            Combined
          </button>
          <button
            className={`admin-btn ${activeView === 'submitted' ? 'primary' : ''}`}
            onClick={() => setActiveView('submitted')}
            style={{ fontSize: '11px', padding: '0.2rem 0.5rem' }}
          >
            Intake Only
          </button>
          <button
            className={`admin-btn ${activeView === 'resolved' ? 'primary' : ''}`}
            onClick={() => setActiveView('resolved')}
            style={{ fontSize: '11px', padding: '0.2rem 0.5rem' }}
          >
            Resolved Only
          </button>
        </div>
      </div>

      <div
        className="chart-content-body"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="admin-tooltip" ref={tooltipRef}>
          {hoveredData && (
            <>
              <div className="admin-tooltip-title">{hoveredData.day}, {hoveredData.date}</div>
              <div className="admin-tooltip-row">
                <span style={{ color: '#93C5FD' }}>Logged Complaints:</span>
                <strong>{hoveredData.submitted}</strong>
              </div>
              <div className="admin-tooltip-row" style={{ marginTop: '2px' }}>
                <span style={{ color: '#86EFAC' }}>Resolved Cases:</span>
                <strong>{hoveredData.resolved}</strong>
              </div>
            </>
          )}
        </div>

        <div className="chart-container-utilitarian">
          <svg className="chart-svg-solid" viewBox={`0 0 ${width} ${height}`}>
            {/* Horizontal Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
              const y = padding.top + chartHeight * ratio;
              const val = Math.round(maxVal * (1 - ratio));
              return (
                <g key={i}>
                  <line
                    x1={padding.left}
                    y1={y}
                    x2={width - padding.right}
                    y2={y}
                    className="chart-grid-line-solid"
                  />
                  <text
                    x={padding.left - 8}
                    y={y + 4}
                    textAnchor="end"
                    className="chart-axis-label"
                  >
                    {val}
                  </text>
                </g>
              );
            })}

            {/* X-axis Day labels */}
            {pointsSubmitted.map((p, i) => (
              <text
                key={i}
                x={p.x}
                y={height - 10}
                textAnchor="middle"
                className="chart-axis-label"
              >
                {p.day}
              </text>
            ))}

            {/* Vertical crosshair */}
            <line
              ref={crosshairRef}
              y1={padding.top}
              y2={padding.top + chartHeight}
              stroke="#94A3B8"
              strokeDasharray="2 2"
              opacity={0}
            />

            {/* Solid line paths */}
            {(activeView === 'all' || activeView === 'submitted') && (
              <path
                ref={pathSubmittedRef}
                d={pathDSubmitted}
                className="line-solid-inflow"
              />
            )}

            {(activeView === 'all' || activeView === 'resolved') && (
              <path
                ref={pathResolvedRef}
                d={pathDResolved}
                className="line-solid-resolved"
              />
            )}

            {/* Solid point markers */}
            {(activeView === 'all' || activeView === 'submitted') &&
              pointsSubmitted.map((p, i) => (
                <circle
                  key={`sub-${i}`}
                  cx={p.x}
                  cy={p.y}
                  r={3.5}
                  fill="#1E3A5F"
                  stroke="#FFFFFF"
                  strokeWidth={1.5}
                  className="point-solid-marker"
                />
              ))}

            {(activeView === 'all' || activeView === 'resolved') &&
              pointsResolved.map((p, i) => (
                <circle
                  key={`res-${i}`}
                  cx={p.x}
                  cy={p.y}
                  r={3}
                  fill="#16A34A"
                  stroke="#FFFFFF"
                  strokeWidth={1.5}
                  className="point-solid-marker"
                />
              ))}
          </svg>
        </div>
      </div>
    </div>
  );
}
