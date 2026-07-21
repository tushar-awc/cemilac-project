import React, { useState, useEffect } from 'react';

interface Broadcast {
  sr_no: string;
  title: string;
  description: string;
  details: string;
  date: string;
  category: string;
}

interface DetailModalData extends Broadcast {
  srNo: string;
  bdTitle: string;
  bdDescription: string;
  bdDetails: string;
  bdDate: string;
  bdCategory: string;
}

const BroadcastsSidebar: React.FC = () => {
  const [broadcasts, setBroadcasts] = useState<Broadcast[]>([]);
  const [topBroadcasts, setTopBroadcasts] = useState<Broadcast[]>([]);
  const [detailModal, setDetailModal] = useState<DetailModalData | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showHistoricalModal, setShowHistoricalModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load broadcasts from CSV (simulated)
  useEffect(() => {
    const loadBroadcasts = () => {
      const csvData: Broadcast[] = [
        {
          sr_no: "1",
          title: "IMTAR-21 Revision Patch",
          description: "New safety checking algorithms have been deployed to the UAT cluster.",
          details: "Please review any applicability matrices flagged with a 'Re-Upload' status. Updated validation rules are now in effect.",
          date: "26-05-2026",
          category: "Urgent"
        },
        {
          sr_no: "2",
          title: "Scheduled ISO Node Sync",
          description: "Portal database sync operations are scheduled for Saturday from 22:00 to 02:00 IST.",
          details: "Minor connection timeouts may occur on secure file links during this window. Plan accordingly.",
          date: "24-05-2026",
          category: "System"
        },
        {
          sr_no: "3",
          title: "Digital Signature Standards",
          description: "E-Certification copies require verified hardware encryption tokens to generate.",
          details: "Applies to Green, Orange, or Red airworthiness wrappers; ensure tokens are registered before use.",
          date: "19-05-2026",
          category: "Policy"
        },
        {
          sr_no: "4",
          title: "Portal Maintenance Window",
          description: "Routine server maintenance has been planned for the DA-ISO portal.",
          details: "Users may experience intermittent access between 01:00 and 04:00 IST; save all drafts beforehand.",
          date: "15-05-2026",
          category: "System"
        },
        {
          sr_no: "5",
          title: "Upload Module Guidelines Update",
          description: "Revised guidelines for document upload workflows have been published.",
          details: "All project leads must acknowledge the updated checklist before submitting new iterations.",
          date: "10-05-2026",
          category: "Policy"
        },
        {
          sr_no: "6",
          title: "Critical Security Advisory",
          description: "A vulnerability affecting older client certificates has been identified.",
          details: "Users must renew their certificates immediately to avoid loss of secure access.",
          date: "05-05-2026",
          category: "Urgent"
        }
      ];

      setBroadcasts(csvData);
      setTopBroadcasts(csvData.slice(0, 3));
      setIsLoading(false);
    };

    loadBroadcasts();
  }, []);

  const getCategoryBadgeClass = (category: string): string => {
    const catLower = category.toLowerCase();
    if (catLower === 'urgent') return 'bg-danger text-white';
    if (catLower === 'system') return 'bg-info text-dark';
    return 'bg-secondary';
  };

  const openBroadcastDetailModal = (broadcast: Broadcast) => {
    setDetailModal({
      ...broadcast,
      srNo: broadcast.sr_no,
      bdTitle: broadcast.title,
      bdDescription: broadcast.description,
      bdDetails: broadcast.details,
      bdDate: broadcast.date,
      bdCategory: broadcast.category
    });
    setShowDetailModal(true);
  };

  const closeBroadcastDetailModal = () => {
    setShowDetailModal(false);
    setDetailModal(null);
  };

  if (isLoading) {
    return (
      <div className="card shadow-sm border-0 bg-white rounded-3 position-sticky" style={{ top: '20px' }}>
        <div className="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center">
          <h6 className="mb-0 fw-bold text-dark font-monospace text-uppercase d-flex align-items-center">
            <span className="broadcast-beacon-pulse me-2"></span>
            CEMILAC Broadcasts
          </h6>
          <span className="badge bg-danger-subtle text-danger font-monospace small">Live Feed</span>
        </div>
        <div className="card-body p-3 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 text-muted small">Loading broadcasts...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="card shadow-sm border-0 bg-white rounded-3">
        <div className="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center">
          <h6 className="mb-0 fw-bold text-dark font-monospace text-uppercase d-flex align-items-center">
            <span className="broadcast-beacon-pulse me-2"></span>
            CEMILAC Broadcasts
          </h6>
          <span className="badge bg-danger-subtle text-danger font-monospace small">Live Feed</span>
        </div>
        <div className="card-body p-3" style={{ maxHeight: '420px', overflowY: 'auto' }}>
          {topBroadcasts.map((broadcast) => (
            <div
              key={broadcast.sr_no}
              className="p-2 mb-3 rounded-2 notification-item-glow shadow-xs bg-light bg-opacity-50"
              style={{ cursor: 'pointer', transition: 'transform 0.2s', border: '1px solid #dee2e6' }}
              onMouseOver={(e) => {
                const target = e.currentTarget as HTMLElement;
                target.style.transform = 'scale(1.02)';
              }}
              onMouseOut={(e) => {
                const target = e.currentTarget as HTMLElement;
                target.style.transform = 'scale(1)';
              }}
              onClick={() => openBroadcastDetailModal(broadcast)}
            >
              <div className="d-flex justify-content-between align-items-center mb-1">
                <span className={`badge ${getCategoryBadgeClass(broadcast.category)} text-uppercase font-monospace`} style={{ fontSize: '0.65rem' }}>
                  {broadcast.category}
                </span>
                <small className="text-muted font-monospace" style={{ fontSize: '0.7rem' }}>
                  {broadcast.date}
                </small>
              </div>
              <h6 className="fw-bold text-dark mb-1" style={{ fontSize: '0.85rem' }}>
                {broadcast.title}
              </h6>
              <p className="text-secondary mb-0 text-wrap" style={{ fontSize: '0.75rem', lineHeight: '1.35' }}>
                {broadcast.description}
              </p>
            </div>
          ))}
        </div>
        <div className="card-footer bg-light border-0 p-3 rounded-bottom-3 border-top text-center">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setShowHistoricalModal(true);
            }}
            className="small font-monospace fw-bold text-decoration-none text-primary"
            style={{ fontSize: '0.75rem' }}
          >
            <i className="bi bi-archive-fill me-1"></i> View Historical Broadcast Archives
          </a>
        </div>
      </div>

      {/* Broadcast Detail Modal */}
      {showDetailModal && detailModal && (
        <div
          className="modal fade show"
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
          tabIndex={-1}
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div
              className="modal-content border-0 overflow-hidden"
              style={{
                borderRadius: '16px',
                boxShadow: '0 15px 45px rgba(0,0,0,0.2)',
                background: 'rgba(255, 255, 255, 0.95)'
              }}
            >
              <div className="modal-header border-0 d-flex justify-content-between align-items-start pb-0" style={{ padding: '1.5rem 2rem' }}>
                <div>
                  <span
                    className={`badge text-uppercase font-monospace mb-2 ${getCategoryBadgeClass(detailModal.bdCategory)}`}
                    style={{ fontSize: '0.7rem' }}
                  >
                    {detailModal.bdCategory}
                  </span>
                  <h5 className="modal-title fw-bold text-dark m-0" style={{ fontSize: '1.4rem' }}>
                    {detailModal.bdTitle}
                  </h5>
                </div>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeBroadcastDetailModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body px-4 py-4">
                <div className="d-flex align-items-center mb-3 text-muted font-monospace" style={{ fontSize: '0.85rem' }}>
                  <i className="bi bi-calendar-event me-2"></i> <span>{detailModal.bdDate}</span>
                </div>

                <div className="mb-4">
                  <h6 className="text-secondary fw-bold mb-2 font-monospace" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Summary
                  </h6>
                  <p className="text-dark" style={{ fontSize: '1rem', lineHeight: '1.5' }}>
                    {detailModal.bdDescription}
                  </p>
                </div>

                <div className="p-3 rounded-3" style={{ backgroundColor: 'rgba(10, 54, 99, 0.05)', borderLeft: '4px solid var(--cemilac-gold, #D4AF37)' }}>
                  <h6 className="text-primary fw-bold mb-2 font-monospace" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Detailed Information
                  </h6>
                  <p className="text-secondary mb-0" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                    {detailModal.bdDetails}
                  </p>
                </div>
              </div>
              <div className="modal-footer border-top py-3 bg-light d-flex justify-content-between align-items-center">
                <span className="text-muted font-monospace" style={{ fontSize: '0.75rem' }}>
                  Broadcast ID: <span className="fw-bold">{detailModal.srNo}</span>
                </span>
                <button type="button" className="btn btn-outline-secondary btn-sm px-4 rounded-pill fw-bold" onClick={closeBroadcastDetailModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Historical Broadcasts Modal */}
      {showHistoricalModal && (
        <div
          className="modal fade show"
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
          tabIndex={-1}
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable" role="document">
            <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '12px' }}>
              <div className="modal-header bg-dark text-white border-0 py-3">
                <h5 className="modal-title fw-bold font-monospace text-uppercase d-flex align-items-center">
                  <i className="bi bi-archive-fill text-warning me-2"></i> Historical Broadcast Archives
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowHistoricalModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body p-0 bg-light">
                <div className="table-responsive">
                  <table className="table table-hover table-striped align-middle mb-0 text-nowrap">
                    <thead className="table-light text-secondary uppercase font-monospace small">
                      <tr>
                        <th className="ps-4">Sr.No</th>
                        <th>Category</th>
                        <th>Release Date</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {broadcasts.map((broadcast) => (
                        <tr key={broadcast.sr_no}>
                          <td className="ps-4 fw-bold text-muted">{broadcast.sr_no}</td>
                          <td>
                            <span className={`badge ${getCategoryBadgeClass(broadcast.category)} font-monospace`}>
                              {broadcast.category}
                            </span>
                          </td>
                          <td className="font-monospace text-secondary small">{broadcast.date}</td>
                          <td className="fw-bold text-dark">{broadcast.title}</td>
                          <td className="text-secondary small text-truncate" style={{ maxWidth: '250px' }}>
                            {broadcast.description}
                          </td>
                          <td className="text-center">
                            <button
                              className="btn btn-sm btn-outline-primary px-3 rounded-pill fw-bold"
                              onClick={() => {
                                openBroadcastDetailModal(broadcast);
                              }}
                            >
                              View Detail
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="modal-footer bg-white border-top p-3">
                <button type="button" className="btn btn-secondary px-4 rounded-pill fw-bold" onClick={() => setShowHistoricalModal(false)}>
                  Close Archives
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .broadcast-beacon-pulse {
          display: inline-block;
          width: 10px;
          height: 10px;
          background-color: #dc3545;
          border-radius: 50%;
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(220, 53, 69, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(220, 53, 69, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(220, 53, 69, 0);
          }
        }

        .notification-item-glow:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
        }
      `}</style>
    </>
  );
};

export default BroadcastsSidebar;