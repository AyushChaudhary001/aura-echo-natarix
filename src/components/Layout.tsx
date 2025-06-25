
import React from 'react';
import BottomNavigation from './BottomNavigation';
import FloatingActionButton from './FloatingActionButton';
import NotificationBell from './NotificationBell';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen w-full">
      <header className="fixed top-0 left-0 right-0 z-40 glass-nav p-4">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Natarix
            </h1>
          </div>
          <NotificationBell />
        </div>
      </header>
      
      <main className="pb-20 px-4 pt-20 max-w-md mx-auto">
        {children}
      </main>
      <FloatingActionButton />
      <BottomNavigation />
    </div>
  );
};

export default Layout;
