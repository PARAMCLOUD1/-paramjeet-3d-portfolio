import { useLayoutEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import PortfolioContent from './PortfolioContent'
import { portfolioViews } from '../content'
import './PortfolioDialog.css'

export default function PortfolioDialog({ selected, onClose, returnFocus }) {
  const dialog = useRef(null)
  const closeButton = useRef(null)
  const closing = useRef(false)
  const tween = useRef(null)
  const title = portfolioViews.find(([id]) => id === selected)?.[1]

  useLayoutEffect(() => {
    const node = dialog.current
    const opener = returnFocus || document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    node.showModal()
    closeButton.current.focus({ preventScroll: true })
    if (window.matchMedia?.('(prefers-reduced-motion: no-preference)').matches) {
      tween.current = gsap.fromTo(node, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: .2, clearProps: 'opacity,transform' })
    }
    return () => {
      tween.current?.kill()
      node.close()
      document.body.style.overflow = previousOverflow
      if (opener?.isConnected) opener.focus({ preventScroll: true })
    }
  }, [returnFocus])

  const dismiss = () => {
    if (closing.current) return
    closing.current = true
    tween.current?.kill()
    if (window.matchMedia?.('(prefers-reduced-motion: no-preference)').matches) {
      tween.current = gsap.to(dialog.current, { opacity: 0, y: 6, duration: .14, onComplete: onClose })
    } else onClose()
  }
  const onKeyDown = event => {
    if (event.key === 'Escape') { event.preventDefault(); dismiss(); return }
    if (event.key !== 'Tab') return
    const focusable = [...dialog.current.querySelectorAll('a[href], button:not(:disabled), summary, [tabindex="0"]')]
      .filter(node => !node.closest('details:not([open])') || node.tagName === 'SUMMARY')
      .sort((a, b) => a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1)
    const first = focusable[0], last = focusable.at(-1)
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
  }
  return createPortal(<dialog ref={dialog} id="portfolio-dialog" className="portfolio-dialog" aria-labelledby="portfolio-dialog-title" onCancel={event => { event.preventDefault(); dismiss() }} onKeyDown={onKeyDown}>
    <div className="panel-header"><div><p className="panel-meta">Paramjeet.dev / Portfolio</p><h2 id="portfolio-dialog-title">{title}</h2></div><button ref={closeButton} className="panel-close" onClick={dismiss} aria-label="Close information panel">Close <span aria-hidden="true">×</span></button></div>
    <div className="panel-scroll" tabIndex={0} role="region" aria-label={`${title} content`}><PortfolioContent id={selected}/></div>
  </dialog>, document.body)
}
