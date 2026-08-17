import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

export default function MetricCard({ metric }) {
  const cardRef = useRef(null);
  const numberRef = useRef(null);
  const valueProxy = useRef({ val: 0 });

  useGSAP(() => {
    const targetVal = metric.value;
    
    gsap.to(valueProxy.current, {
      val: targetVal,
      duration: 0.6,
      ease: 'power1.out',
      onUpdate: () => {
        if (numberRef.current) {
          numberRef.current.textContent = Math.round(valueProxy.current.val).toLocaleString();
        }
      }
    });
  }, { scope: cardRef, dependencies: [metric.value] });

  return (
    <div className="metric-panel" ref={cardRef}>
      <div className="metric-panel-header">
        <span className="metric-panel-title">{metric.title}</span>
      </div>

      <div className="metric-panel-number" ref={numberRef}>
        {metric.value.toLocaleString()}
      </div>

      <div className="metric-panel-footer">
        <span>{metric.timeframe}</span>
        <span className={`metric-stat-pill ${metric.changeType}`}>
          {metric.change}
        </span>
      </div>
    </div>
  );
}
