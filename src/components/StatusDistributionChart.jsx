import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

export default function StatusDistributionChart({ distribution, replayKey }) {
  const containerRef = useRef(null);
  const centerCounterRef = useRef(null);
  const totalProxy = useRef({ val: 0 });
  const [hoveredId, setHoveredId] = useState(null);

  const totalCount = distribution.reduce((sum, item) => sum + item.count, 0);

  const size = 170;
  const strokeWidth = 18;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let accumulatedPercent = 0;
  const segmentsWithOffset = distribution.map((item) => {
    const fraction = totalCount > 0 ? item.count / totalCount : 0;
    const strokeDasharray = `${fraction * circumference} ${circumference}`;
    const strokeDashoffset = -accumulatedPercent * circumference;
    accumulatedPercent += fraction;
    return {
      ...item,
      fraction,
      strokeDasharray,
      strokeDashoffset,
    };
  });

  useGSAP(() => {
    gsap.to(totalProxy.current, {
      val: totalCount,
      duration: 0.5,
      ease: 'power1.out',
      onUpdate: () => {
        if (centerCounterRef.current) {
          centerCounterRef.current.textContent = Math.round(totalProxy.current.val).toLocaleString();
        }
      }
    });

    gsap.from('.donut-slice-flat', {
      strokeDashoffset: circumference,
      stagger: 0.05,
      duration: 0.5,
      ease: 'power1.out'
    });
  }, { scope: containerRef, dependencies: [replayKey, totalCount] });

  return (
    <div className="admin-card" ref={containerRef}>
      <div className="admin-card-header">
        <div>
          <h2 className="admin-card-title">Grievance Status Distribution</h2>
          <div className="admin-card-subtitle">Active departmental case allocations</div>
        </div>
      </div>

      <div className="breakdown-body">
        <div className="breakdown-donut-box">
          <svg className="donut-svg-flat" viewBox={`0 0 ${size} ${size}`}>
            {segmentsWithOffset.map((seg) => (
              <circle
                key={seg.id}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={seg.color}
                strokeDasharray={seg.strokeDasharray}
                strokeDashoffset={seg.strokeDashoffset}
                className="donut-slice-flat"
                onMouseEnter={() => setHoveredId(seg.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  opacity: hoveredId && hoveredId !== seg.id ? 0.45 : 1
                }}
              />
            ))}
          </svg>

          <div className="donut-center-readout">
            <div className="donut-center-total" ref={centerCounterRef}>
              {totalCount}
            </div>
            <div className="donut-center-tag">Total Cases</div>
          </div>
        </div>

        {/* High-density status table */}
        <table className="breakdown-table">
          <tbody>
            {distribution.map((item) => {
              const percent = totalCount > 0 ? ((item.count / totalCount) * 100).toFixed(1) : 0;
              return (
                <tr
                  key={item.id}
                  style={{
                    backgroundColor: hoveredId === item.id ? 'var(--bg-surface-secondary)' : 'transparent',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <td>
                    <span className="breakdown-indicator" style={{ backgroundColor: item.color }}></span>
                    <span style={{ fontWeight: 500 }}>{item.label}</span>
                  </td>
                  <td style={{ textAlign: 'right', fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}>
                    {item.count.toLocaleString()}
                  </td>
                  <td style={{ textAlign: 'right', color: 'var(--text-muted)', fontVariantNumeric: 'tabular-nums', width: '45px' }}>
                    {percent}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
