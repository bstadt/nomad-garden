 "use client";
 import { useState, useEffect } from 'react';
 import BackButton from './back-button';

 interface FadeInPostProps {
   children: React.ReactNode;
 }

 export default function FadeInPost({ children }: FadeInPostProps) {
   const [loaded, setLoaded] = useState(false);
   useEffect(() => {
     setLoaded(true);
   }, []);
   return (
     <>
       <div className={`transition-all duration-700 ease-out ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
         <BackButton />
       </div>
       <div className={`transition-all duration-700 ease-out delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
         {children}
       </div>
     </>
   );
 }