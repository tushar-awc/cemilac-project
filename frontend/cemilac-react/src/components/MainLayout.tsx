import React, { ReactNode } from 'react';
import NavigationSidebar from './NavigationSidebar';
import BroadcastsSidebar from './BroadcastsSidebar';

interface MainLayoutProps {
  children: ReactNode;
  showIdentityRibbon?: boolean;
  agencyId?: string;
  agencyName?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  showIdentityRibbon = true,
  agencyId = 'DA0000000001',
  agencyName = 'CEMILAC'
}) => {
  return (
    <>
      {/* Identity Ribbon */}
      {showIdentityRibbon && (
        <div className="bg-dark text-white py-2 px-4 shadow-sm border-bottom border-secondary">
          <div className="container-fluid d-flex flex-column flex-md-row justify-content-between align-items-md-center font-monospace small">
            <div>
              <span className="text-warning fw-bold">DA Agency ID:</span> 
              <span className="text-white-10 fw-bold">{agencyId}</span>
            </div>
            <div className="mt-1 mt-md-0">
              <span className="text-warning fw-bold">DA Agency Name:</span> 
              <span className="fw-bold text-white-10">{agencyName}</span>
            </div>
          </div>
        </div>
      )}

      <div className="container-fluid flex-grow-1 my-4 px-md-4">
        <div className="row">
          
          {/* Left Sidebar Column - Fixed Position */}
          <div className="col-lg-3 col-md-4 order-1 mb-4">
            <div className="position-sticky" style={{ top: '100px', maxHeight: 'calc(100vh - 120px)', overflowY: 'auto' }}>
              <NavigationSidebar />
              <div className="mb-3"></div>
              <BroadcastsSidebar />
            </div>
          </div>
          
          {/* Right Content Column */}
          <div className="col-lg-9 col-md-8 order-2">
            {children}
          </div>

        </div>
      </div>
    </>
  );
};

export default MainLayout;
