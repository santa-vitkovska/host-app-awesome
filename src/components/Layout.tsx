import type { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
  hideFooter?: boolean;
  fullHeight?: boolean;
}

export const Layout = ({ children, hideFooter = false, fullHeight = false }: LayoutProps) => {
  return (
    <div className={fullHeight ? "h-screen flex flex-col overflow-hidden" : "min-h-screen flex flex-col"}>
      <Header />
      <main className={fullHeight ? "flex-1 overflow-hidden" : "flex-1"}>
        {children}
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
};

