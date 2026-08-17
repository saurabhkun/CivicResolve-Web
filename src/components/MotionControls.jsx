import React from 'react';
import { Sliders, RotateCcw, Shuffle, Zap } from 'lucide-react';

export default function MotionControls({
  onReplay,
  onRandomizeData,
  speed,
  onSpeedChange
}) {
  return (
    <section className="motion-controls-bar">
      <div className="controls-left">
        <div className="controls-title">
          <Sliders size={16} color="#94a3b8" />
          <span>Motion Engine Diagnostics</span>
        </div>

        <button className="control-btn primary" onClick={onReplay} id="btn-replay-timelines">
          <RotateCcw size={13} />
          <span>Replay Stagger Timelines</span>
        </button>

        <button className="control-btn" onClick={onRandomizeData} id="btn-simulate-update">
          <Shuffle size={13} color="#94a3b8" />
          <span>Simulate Telemetry Update</span>
        </button>
      </div>

      <div className="controls-right" style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          <Zap size={13} color="#94a3b8" />
          <span>Transition Pace:</span>
          <div className="speed-selector">
            <button
              className={`speed-option ${speed === 0.5 ? 'active' : ''}`}
              onClick={() => onSpeedChange(0.5)}
            >
              0.5x
            </button>
            <button
              className={`speed-option ${speed === 1.0 ? 'active' : ''}`}
              onClick={() => onSpeedChange(1.0)}
            >
              1.0x (Standard)
            </button>
            <button
              className={`speed-option ${speed === 1.75 ? 'active' : ''}`}
              onClick={() => onSpeedChange(1.75)}
            >
              1.75x
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
