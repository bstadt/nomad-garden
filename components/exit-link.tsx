"use client";
import React from 'react';
import Link from 'next/link';
import { useExitTransition } from './exit-transition-context';

interface ExitLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  prefetch?: boolean;
}

export default function ExitLink({ href, children, className, prefetch = true }: ExitLinkProps) {
  const { triggerExit } = useExitTransition();
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    triggerExit(href);
  };
  
  return (
    <Link href={href} prefetch={prefetch} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}