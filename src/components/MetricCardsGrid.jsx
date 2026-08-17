import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import MetricCard from './MetricCard';

export default function MetricCardsGrid({ metrics, replayKey }) {
  const gridRef = useRef(null);

  useGSAP(() => {
    const panels = gsap.utils.toArray('.metric-panel');
    
    gsap.from(panels, {
      opacity: 0,
      y: 6,
      stagger: 0.03,
      duration: 0.3,
      ease: 'power1.out'
    });
  }, { scope: gridRef, dependencies: [replayKey] });

  return (
    <section className="metrics-row" ref={gridRef}>
      {metrics.map((metric) => (
        <MetricCard key={metric.id} metric={metric} />
      ))}
    </section>
  );
}
