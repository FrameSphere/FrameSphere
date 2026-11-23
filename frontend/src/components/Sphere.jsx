import React, { useEffect, useRef } from 'react';

/*
 * Die "Sphere": eine Fibonacci-Kugel aus Punkten. Jedes Produkt ist ein
 * markierter Punkt. `focus` (Index in `labels`) dreht die Kugel so, dass
 * dieser Punkt nach vorne kommt – verbindet Liste und Bild (Gestalt: gemeinsames
 * Schicksal / Common Fate).
 *
 * Performance: Canvas 2D, ~500 Punkte, pausiert außerhalb des Viewports.
 * Barrierefreiheit: dekorativ (aria-hidden); bei prefers-reduced-motion statisch.
 */

const N = 520;
const BONE = [242, 239, 232];
const SIGNAL = [255, 77, 46];

function fibonacciSphere(n) {
  const pts = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const t = phi * i;
    pts.push([Math.cos(t) * r, y, Math.sin(t) * r]);
  }
  return pts;
}

export default function Sphere({ labels = [], live = [], focus = null, className = '' }) {
  const canvasRef = useRef(null);
  const focusRef = useRef(focus);
  focusRef.current = focus;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const pts = fibonacciSphere(N);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Produkt-Punkte gleichmäßig über die Kugel verteilen (mittleres Band bevorzugt)
    const marks = labels.map((_, k) => {
      const t = (k + 0.5) / labels.length;
      return Math.round((0.18 + t * 0.64) * (N - 1));
    });
    const markIndex = new Map(marks.map((idx, k) => [idx, k]));

    let ry = 0.6;
    let rx = -0.35;
    let targetRy = null;
    let targetRx = null;
    let mx = 0;
    let my = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let visible = true;
    let lastFocus = null;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      my = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const angleDiff = (a, b) => {
      let d = (b - a) % (Math.PI * 2);
      if (d > Math.PI) d -= Math.PI * 2;
      if (d < -Math.PI) d += Math.PI * 2;
      return d;
    };

    const draw = () => {
      const f = focusRef.current;
      if (f !== lastFocus) {
        lastFocus = f;
        if (f != null && marks[f] != null) {
          const [x, y, z] = pts[marks[f]];
          targetRy = Math.atan2(-x, z);
          const zp = Math.hypot(x, z);
          targetRx = Math.atan2(y, zp);
        } else {
          targetRy = null;
          targetRx = null;
        }
      }

      if (targetRy != null) {
        ry += angleDiff(ry, targetRy) * 0.08;
        rx += (targetRx - rx) * 0.08;
      } else if (!reduce) {
        ry += 0.0022 + mx * 0.004;
        rx += (-0.35 + my * 0.25 - rx) * 0.03;
      }

      ctx.clearRect(0, 0, w, h);
      const R = Math.min(w, h) * 0.42;
      const cx = w / 2;
      const cy = h / 2;
      const cy_ = Math.cos(ry);
      const sy_ = Math.sin(ry);
      const cx_ = Math.cos(rx);
      const sx_ = Math.sin(rx);

      const projected = [];
      for (let i = 0; i < N; i++) {
        const [x, y, z] = pts[i];
        const x1 = x * cy_ + z * sy_;
        const z1 = -x * sy_ + z * cy_;
        const y2 = y * cx_ - z1 * sx_;
        const z2 = y * sx_ + z1 * cx_;
        projected.push([cx + x1 * R, cy + y2 * R, z2, i]);
      }
      projected.sort((a, b) => a[2] - b[2]);

      for (const [px, py, z, i] of projected) {
        const depth = (z + 1) / 2; // 0 hinten … 1 vorne
        const k = markIndex.get(i);
        if (k !== undefined) continue; // Produkte separat obendrauf
        const a = 0.08 + depth * 0.7;
        const s = 0.6 + depth * 1.25;
        ctx.fillStyle = `rgba(${BONE[0]},${BONE[1]},${BONE[2]},${a})`;
        ctx.beginPath();
        ctx.arc(px, py, s, 0, Math.PI * 2);
        ctx.fill();
      }

      // Produkt-Punkte + Labels
      ctx.font = '500 11px "Geist Mono", ui-monospace, monospace';
      ctx.textBaseline = 'middle';
      for (const [px, py, z, i] of projected) {
        const k = markIndex.get(i);
        if (k === undefined) continue;
        const depth = (z + 1) / 2;
        const isFocus = f === k;
        const isLive = live[k];
        const col = isLive ? SIGNAL : BONE;
        const a = isFocus ? 1 : 0.15 + depth * 0.85;
        const s = (isFocus ? 5.5 : 2.6) + depth * 1.6;

        if (isFocus) {
          ctx.strokeStyle = `rgba(${SIGNAL[0]},${SIGNAL[1]},${SIGNAL[2]},0.45)`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(px, py, s + 7, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.fillStyle = `rgba(${col[0]},${col[1]},${col[2]},${a})`;
        ctx.beginPath();
        ctx.arc(px, py, s, 0, Math.PI * 2);
        ctx.fill();

        if (z > 0.15 || isFocus) {
          const la = isFocus ? 1 : Math.min(1, (z - 0.15) * 2) * 0.75;
          ctx.fillStyle = `rgba(${BONE[0]},${BONE[1]},${BONE[2]},${la})`;
          ctx.fillText(labels[k].toUpperCase(), px + s + 9, py);
        }
      }

      if (visible) raf = requestAnimationFrame(draw);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(draw);
      }
    });
    io.observe(canvas);

    window.addEventListener('pointermove', onMove, { passive: true });
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
    };
    // labels/live sind statisch pro Seite
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={`block h-full w-full ${className}`} />;
}
