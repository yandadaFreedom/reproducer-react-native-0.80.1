import {createContext} from 'react';

interface ScrollViewContextType {
  gestureRef: any;
  scrollOffset: any;
}

export const ScrollViewContext = createContext<ScrollViewContextType>({
  gestureRef: null,
  scrollOffset: { value: 0 } as any
});

