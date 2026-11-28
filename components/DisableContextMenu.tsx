'use client';

import { useEffect } from 'react';

/**
 * Prevents the default browser context menu across the website.
 */
export function DisableContextMenu() {
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    document.addEventListener('contextmenu', handleContextMenu);
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  return null;
}
