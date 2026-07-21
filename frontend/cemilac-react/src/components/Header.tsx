import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface HeaderProps {
  pageTitle?: string;
}

interface ConnectionStatus {
  status: 'connected' | 'disconnected' | 'loading';
  errorCode?: number;
  errorMessage?: string;
}

const Header: React.FC<HeaderProps> = ({ pageTitle }) => {
  const [currentDate, setCurrentDate] = useState<string>('--/--/----');
  const [currentTime, setCurrentTime] = useState<string>('00:00:00');
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>({
    status: 'loading'
  });
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [semaphore, setSemaphore] = useState<number>(0);
  const location = useLocation();

  // Get page title based on route
  const getPageTitle = (): string => {
    if (pageTitle) return pageTitle;
    
    const routeTitles: { [key: string]: string } = {
      '/dashboard': 'Design Agency Dashboard',
      '/qa-dashboard': 'QA Dashboard',
      '/project-view': 'Design Agency Dashboard',
      '/new-registration': 'Design Agency Dashboard',
      '/registration-status': 'Design Agency Dashboard',
      '/raised-requests': 'Design Agency Dashboard',
      '/service-certificate': 'Design Agency Dashboard',
      '/communication': 'Design Agency Dashboard',
      '/doas': 'Design Agency Dashboard',
      '/help-document': 'Design Agency Dashboard',
      '/certificate': 'Design Agency Dashboard'
    };

    const basePath = '/' + location.pathname.split('/')[1];
    return routeTitles[basePath] || '';
  };

  // Update date and time every second
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      
      // Format Date (Indian format)
      const options: Intl.DateTimeFormatOptions = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      };
      setCurrentDate(now.toLocaleDateString('en-IN', options));
      
      // Format Time (24-hour format)
      setCurrentTime(now.toLocaleTimeString('en-IN', { hour12: false }));
    };

    // Initial call
    updateDateTime();
    
    // Set interval to update every second
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  // Connection status check function (from JSP)
  const getStatus = async () => {
    // Check semaphore to prevent concurrent calls
    const currentSemaphore = sessionStorage.getItem('SEMAPHORE');
    if (currentSemaphore === '1') return;
    
    // Set semaphore
    sessionStorage.setItem('SEMAPHORE', '1');
    setConnectionStatus({ status: 'loading' });

    try {
      // Add timeout to prevent hanging
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch('https://cemilac-project-backend.onrender.com/iso/api/v1/connectionStatus', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        cache: 'no-cache',
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const result = await response.text();
      console.log('Connection status response:', result); // Debug log
      
      // Reset semaphore
      sessionStorage.setItem('SEMAPHORE', '0');

      if (result === "success") {
        sessionStorage.setItem('conchk', '0');
        sessionStorage.setItem('c', '1');
        setConnectionStatus({ status: 'connected' });
        setShowPopup(false);
      } else if (result === "socket fail") {
        sessionStorage.setItem('conchk', '402');
        setConnectionStatus({ 
          status: 'disconnected', 
          errorCode: 402, 
          errorMessage: "Error 402 : Unable to create socket" 
        });
        setShowPopup(true);
      } else if (result === "bind fail") {
        sessionStorage.setItem('conchk', '403');
        setConnectionStatus({ 
          status: 'disconnected', 
          errorCode: 403, 
          errorMessage: "Error 403 : Bind failed" 
        });
        setShowPopup(true);
      } else if (result === "not reach") {
        sessionStorage.setItem('conchk', '412');
        setConnectionStatus({ 
          status: 'disconnected', 
          errorCode: 412, 
          errorMessage: "Error 412 : Server not reachable" 
        });
        setShowPopup(true);
      } else if (result === "Dongle error") {
        sessionStorage.setItem('conchk', '417');
        setConnectionStatus({ 
          status: 'disconnected', 
          errorCode: 417, 
          errorMessage: "Error 417 : Dongle error" 
        });
        setShowPopup(true);
      } else {
        // Unknown response - treat as disconnected
        console.warn('Unknown connection status response:', result);
        sessionStorage.setItem('conchk', '1');
        sessionStorage.setItem('SEMAPHORE', '0');
        setConnectionStatus({ status: 'disconnected' });
        setShowPopup(false);
      }
    } catch (error) {
      console.error('Connection status check failed:', error);
      sessionStorage.setItem('conchk', '1');
      sessionStorage.setItem('SEMAPHORE', '0');
      
      // Set to disconnected instead of staying in loading state
      setConnectionStatus({ status: 'disconnected' });
      setShowPopup(false);
    }
  };

  // Initialize connection status and set up periodic checks (from JSP)
  useEffect(() => {
    // Initialize semaphore
    sessionStorage.setItem('SEMAPHORE', '0');
    
    // Check if API endpoint exists, if not, show as disconnected
    const checkApiAvailability = async () => {
      try {
        // Quick check to see if the endpoint exists
        const response = await fetch('https://cemilac-project-backend.onrender.com/iso/api/v1/connectionStatus', {
          method: 'HEAD', // Just check if endpoint exists
          signal: AbortSignal.timeout(5000)
        });
        
        if (response.status === 404) {
          // API doesn't exist, show as disconnected
          console.warn('API endpoint not available, showing as disconnected');
          setConnectionStatus({ status: 'disconnected' });
          return false;
        }
        return true;
      } catch (error) {
        console.warn('API endpoint check failed, proceeding with normal flow');
        return true; // Proceed normally if check fails
      }
    };

    const initializeStatus = async () => {
      const apiExists = await checkApiAvailability();
      if (apiExists) {
        // Initial status check
        getStatus();
        
        // Set interval to check status every 60 seconds (same as JSP)
        const statusInterval = setInterval(() => {
          // Only run if semaphore is clear
          const currentSemaphore = sessionStorage.getItem('SEMAPHORE');
          if (currentSemaphore === '0') {
            getStatus();
          }
        }, 10000);

        return () => clearInterval(statusInterval);
      }
    };

    initializeStatus();
  }, []);

  // Fallback: if stuck in loading for too long, switch to disconnected
  useEffect(() => {
    if (connectionStatus.status === 'loading') {
      const fallbackTimer = setTimeout(() => {
        console.warn('Connection check took too long, falling back to disconnected');
        sessionStorage.setItem('SEMAPHORE', '0');
        setConnectionStatus({ status: 'disconnected' });
      }, 10000); // 15 second fallback

      return () => clearTimeout(fallbackTimer);
    }
  }, [connectionStatus.status]);

  // Handle browser online/offline events (additional to JSP functionality)
  useEffect(() => {
    const handleOnline = () => {
      if (connectionStatus.status === 'disconnected') {
        getStatus();
      }
    };
    const handleOffline = () => {
      setConnectionStatus({ status: 'disconnected' });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [connectionStatus.status]);

  const hidePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <nav className="navbar-custom shadow-sm">
        <div className="container-fluid d-flex align-items-center justify-content-between">
          
          {/* Left Side: Company Logo */}
          <div className="d-flex align-items-center" style={{ minWidth: '100px' }}>
            <img 
              src={`${process.env.PUBLIC_URL}/assets/img/logo.png`}
              alt="CEMILAC Logo" 
              className="img-fluid" 
              style={{
                maxHeight: '75px',
                maxWidth: '100%',
                objectFit: 'contain',
                marginRight: '10px'
              }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                console.log('First logo failed, trying alternate:', target.src);
                
                // Try alternate logo path
                if (target.src.includes('cemilac_logo.png')) {
                  target.src = `${process.env.PUBLIC_URL}/assets/img/logo.png`;
                } else if (target.src.includes('logo.png')) {
                  // If both fail, hide and show icon
                  console.log('Both logos failed, showing fallback icon');
                  target.style.display = 'none';
                  if (target.parentElement) {
                    const icon = document.createElement('i');
                    icon.className = 'bi bi-shield-check';
                    icon.style.fontSize = '2rem';
                    icon.style.color = '#FFD700';
                    icon.title = 'CEMILAC Logo';
                    target.parentElement.appendChild(icon);
                  }
                }
              }}
            />
          </div>

          {/* Middle Center: Dashboard Title */}
          <div className="text-center flex-grow-1">
            <h1 className="main-title text-uppercase m-0">
              {getPageTitle()}
            </h1>
          </div>

          {/* Right Side: Date, Time and Status */}
          <div className="d-flex flex-column align-items-end justify-content-center text-end" style={{ width: '22%' }}>
            <div className="status-box">
              <div className="mb-1 fw-bold small">
                <i className="bi bi-calendar3 me-1"></i>
                <span id="current-date">{currentDate}</span>
                <span className="mx-1">|</span>
                <i className="bi bi-clock me-1"></i>
                <span id="current-time">{currentTime}</span>
              </div>
              <div className="d-flex align-items-center justify-content-end font-monospace fw-bold text-white small">
                {/* Loading Spinner */}
                {connectionStatus.status === 'loading' && (
                  <div className="d-flex align-items-center">
                    <div 
                      className="spinner-border spinner-border-sm me-2" 
                      role="status" 
                      style={{ width: '12px', height: '12px', cursor: 'pointer' }}
                      onClick={() => {
                        console.log('Manual stop of connection check');
                        sessionStorage.setItem('SEMAPHORE', '0');
                        setConnectionStatus({ status: 'disconnected' });
                      }}
                      title="Click to stop checking"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <span className="text-warning">Checking...</span>
                  </div>
                )}
                
                {/* Connected Status */}
                {connectionStatus.status === 'connected' && (
                  <>
                    <span className="status-dot bg-connected"></span>
                    <span className="text-success-gradient">Connected</span>
                  </>
                )}

                {/* Disconnected Status */}
                {connectionStatus.status === 'disconnected' && (
                  <>
                    <span className="status-dot bg-disconnected"></span>
                    <span className="text-danger">DisConnected</span>
                  </>
                )}
              </div>
            </div>
          </div>

        </div>
      </nav>

      {/* Error Popup (from JSP) */}
      {showPopup && connectionStatus.errorMessage && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" 
             style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999 }}>
          <div className="bg-white rounded-4 shadow-lg p-4 text-center" style={{ minWidth: '350px', maxWidth: '500px' }}>
            <div className="mb-3">
              <div style={{ 
                width: '50px', 
                height: '50px', 
                backgroundColor: '#d32f2f', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 15px', 
                color: 'white', 
                fontSize: '24px', 
                fontWeight: 'bold' 
              }}>
                ✕
              </div>
            </div>
            <h2 className="mb-2 fw-bold text-danger">Connection Failure!</h2>
            <hr className="mx-3" />
            <p className="text-dark mb-3">{connectionStatus.errorMessage}</p>
            <button 
              type="button" 
              className="btn btn-primary px-4 py-2 fw-semibold rounded-3"
              onClick={hidePopup}
              style={{ backgroundColor: 'var(--drdo-blue)', borderColor: 'var(--drdo-blue)' }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;