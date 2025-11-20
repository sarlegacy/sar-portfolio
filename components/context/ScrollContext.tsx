
import React, { createContext, useContext, RefObject } from 'react';

/**
 * Defines the shape of the context data, which includes a ref
 * to the main scrollable container element.
 */
interface ScrollContextType {
  scrollContainerRef: RefObject<HTMLDivElement> | null;
}

/**
 * Creates a React Context for providing the main scrollable container ref
 * to descendant components. This avoids prop drilling and fragile DOM queries.
 */
const ScrollContext = createContext<ScrollContextType>({ scrollContainerRef: null });

/**
 * Custom hook for consuming the ScrollContext.
 * It provides an easy way for components to access the scroll container ref.
 * @returns {ScrollContextType} The context value containing the scroll container ref.
 */
export const useScrollContainer = () => useContext(ScrollContext);

/**
 * The provider component for the ScrollContext.
 * Should be used to wrap the component tree that needs access to the scroll container.
 */
export const ScrollContainerProvider = ScrollContext.Provider;
