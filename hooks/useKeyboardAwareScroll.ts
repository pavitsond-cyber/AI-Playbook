'use client'

import { useEffect } from 'react'

/**
 * Pads the body's bottom by the estimated keyboard height so content is
 * never clipped when the soft keyboard is open.
 *
 * Relies on window.visualViewport (available in all modern mobile browsers)
 * with a window.resize fallback for older environments.
 */
export function useKeyboardAwareScroll(maxKeyboardHeightPx = 500) {
  useEffect(() => {
    let baseHeight = window.innerHeight
    let lastPadding = 0

    function applyPadding(keyboardHeight: number) {
      const safe = Math.max(0, Math.min(keyboardHeight, maxKeyboardHeightPx))
      if (safe === lastPadding) return
      lastPadding = safe
      document.body.style.paddingBottom = safe ? `${safe}px` : ''
    }

    function handleResize() {
      const viewportHeight =
        window.visualViewport?.height ?? window.innerHeight

      // Re-learn the base height whenever the keyboard is clearly closed
      if (viewportHeight > baseHeight - 80) {
        baseHeight = viewportHeight
      }

      const keyboardHeight = baseHeight - viewportHeight
      applyPadding(keyboardHeight > 50 ? keyboardHeight : 0)
    }

    // Capture baseline before any keyboard opens
    baseHeight = window.innerHeight

    window.addEventListener('resize', handleResize)
    window.visualViewport?.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.visualViewport?.removeEventListener('resize', handleResize)
      document.body.style.paddingBottom = ''
    }
  }, [maxKeyboardHeightPx])
}
