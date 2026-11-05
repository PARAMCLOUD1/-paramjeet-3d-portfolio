// Native <canvas> fallback children mount even when WebGL works. Keep them inert:
// their mounting is not a renderer capability check or an error signal.
export default function CanvasFallback() {
  return <p className="scene-fallback">Your browser cannot display this canvas. Use the workspace links below.</p>
}
