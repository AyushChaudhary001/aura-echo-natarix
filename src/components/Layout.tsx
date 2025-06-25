
import React from 'react';
import BottomNavigation from './BottomNavigation';
import FloatingActionButton from './FloatingActionButton';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen w-full">
      <main className="pb-20 px-4 pt-4 max-w-md mx-auto">
        {children}
      </main>
      <FloatingActionButton />
      <BottomNavigation />
    </div>
  );
};

export default Layout;
