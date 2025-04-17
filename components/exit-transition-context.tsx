"use client";
import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface ExitTransitionContextType {
  triggerExit: (href: string) => void;
  isExiting: boolean;
}

const ExitTransitionContext = createContext<ExitTransitionContextType>({
  triggerExit: () => {},
  isExiting: false,
});

interface ExitTransitionProviderProps {
  children: ReactNode;
}

export function ExitTransitionProvider({ children }: ExitTransitionProviderProps) {
  const [isExiting, setIsExiting] = useState(false);
  const [nextHref, setNextHref] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const triggerExit = (href: string) => {
    if (isExiting) return;
    setNextHref(href);
    setIsExiting(true);
  };

  // After fade-out duration, navigate to nextHref
  useEffect(() => {
    if (isExiting && nextHref) {
      const timer = setTimeout(() => {
        router.push(nextHref);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isExiting, nextHref, router]);

  // When the pathname changes to the nextHref, reset exit state to fade in
  useEffect(() => {
    if (isExiting && nextHref && pathname === nextHref) {
      setIsExiting(false);
      setNextHref(null);
    }
  }, [pathname, isExiting, nextHref]);

  const wrapperClasses = `transition-all duration-500 ${
    isExiting ? 'ease-in opacity-0 translate-y-4' : 'ease-out opacity-100 translate-y-0'
  }`;

  return (
    <ExitTransitionContext.Provider value={{ triggerExit, isExiting }}>
      <div className={wrapperClasses}>
        {children}
      </div>
    </ExitTransitionContext.Provider>
  );
}

export function useExitTransition() {
  return useContext(ExitTransitionContext);
}