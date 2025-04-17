"use client";
import React from 'react';
import { useExitTransition } from './exit-transition-context';

interface ExitLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function ExitLink({ href, children, className }: ExitLinkProps) {
  const { triggerExit } = useExitTransition();
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    triggerExit(href);
  };
  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}