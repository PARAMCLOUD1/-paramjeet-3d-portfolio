// Native <canvas> fallback children mount even when WebGL works. Keep them inert:
// their mounting is not a renderer capability check or an error signal.
export default function CanvasFallback() {
  return <p className="scene-fallback">Your browser cannot display the 3D office. Use the section controls or read the portfolio below.</p>
}
