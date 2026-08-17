import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register GSAP plugins globally
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// Configurable motion presets & easing curves
export const MOTION_PRESETS = {
  duration: {
    instant: 0.2,
    fast: 0.4,
    normal: 0.75,
    slow: 1.2,
    cinematic: 1.8,
  },
  stagger: {
    tight: 0.05,
    normal: 0.08,
    relaxed: 0.12,
  },
  ease: {
    smooth: 'power3.out',
    snappy: 'power4.out',
    spring: 'back.out(1.4)',
    elastic: 'elastic.out(1, 0.6)',
    expo: 'expo.out',
    circ: 'circ.out',
    inOut: 'power2.inOut',
  }
};

export { gsap, ScrollTrigger, useGSAP };
