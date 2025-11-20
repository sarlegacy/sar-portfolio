import React, { useEffect, useRef } from 'react';

// Defines the options for the useFocusTrap hook.
interface UseFocusTrapOptions {
  // A ref to the element that should trap focus.
  trapRef: React.RefObject<HTMLElement>;
  // A boolean indicating whether the trap is currently active.
  isActive: boolean;
  // A callback function to be invoked when the trap should be deactivated (e.g., on Escape key press).
  onDeactivate: () => void;
  // Optional flag to disable scrolling on the body element when the trap is active. Defaults to true.
  disableBodyScroll?: boolean;
}

/**
 * A custom hook to trap focus within a specified element.
 * Useful for modals, dialogs, and popovers to improve accessibility.
 * 
 * - Traps focus for keyboard users (Tab and Shift+Tab).
 * - Closes the trap when the 'Escape' key is pressed.
 * - Disables scrolling on the body element to prevent background interaction.
 */
export const useFocusTrap = ({
  trapRef,
  isActive,
  onDeactivate,
  disableBodyScroll = true,
}: UseFocusTrapOptions) => {
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive || !trapRef.current) {
      return;
    }

    // Save the previously focused element to restore it later.
    previousActiveElement.current = document.activeElement as HTMLElement;
    
    // Use a timeout to ensure the modal is fully rendered before focusing
    const focusTimeout = setTimeout(() => {
       trapRef.current?.focus({ preventScroll: true });
    }, 50);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onDeactivate();
        return;
      }

      if (event.key === 'Tab') {
        const focusableElements = trapRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusableElements || focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (event.shiftKey) { // Shift + Tab
          if (document.activeElement === firstElement) {
            lastElement.focus();
            event.preventDefault();
          }
        } else { // Tab
          if (document.activeElement === lastElement) {
            firstElement.focus();
            event.preventDefault();
          }
        }
      }
    };
    
    // Add effect for body scroll
    if (disableBodyScroll) {
        document.body.style.overflow = 'hidden';
    }

    document.addEventListener('keydown', handleKeyDown);

    // Cleanup function
    return () => {
      clearTimeout(focusTimeout);
      document.removeEventListener('keydown', handleKeyDown);

      if (disableBodyScroll) {
        document.body.style.overflow = '';
      }
      
      // Restore focus to the previously active element.
      previousActiveElement.current?.focus();
    };
  }, [isActive, trapRef, onDeactivate, disableBodyScroll]);
};
