import { useState, useEffect, useRef, useCallback } from "react";

// Online 360 image folder (36 frames suggested)
// Images are named: 01.jpg, 02.jpg ... 36.jpg
export default function Product360Viewer() {
  const totalFrames = 36;
  // Update framePath based on your server structure:
  // - If images are in a folder: "https://yourdomain.com/path/to/360/"
  // - If images are directly named: "https://yourdomain.com/path/to/360" (no trailing slash)
  const framePath = "https://fastly-production.24c.in/webin/360"; // online images folder
  const [frame, setFrame] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);
  const containerRef = useRef(null);
  const dragStartX = useRef(0);
  const previousFrame = useRef(1);

  // Get image URL helper function
  const getImageUrl = useCallback((frameNum) => {
    // Handle both with and without trailing slash in framePath
    const separator = framePath.endsWith('/') ? '' : '/';
    return `${framePath}${separator}${String(frameNum).padStart(2, "0")}.jpg`;
  }, [framePath]);

  // Preload images for smoother rotation
  useEffect(() => {
    const images = [];
    const loadImages = async () => {
      setIsLoading(true);
      setImageError(false);
      let loadedCount = 0;
      let errorCount = 0;
      
      for (let i = 1; i <= totalFrames; i++) {
        const img = new Image();
        img.src = getImageUrl(i);
        
        img.onload = () => {
          images.push(img);
          loadedCount++;
          if (i === 1 || loadedCount === 1) {
            setIsLoading(false);
          }
        };
        
        img.onerror = () => {
          errorCount++;
          if (i === 1) {
            setImageError(true);
            setIsLoading(false);
          } else if (errorCount === totalFrames) {
            setImageError(true);
          }
        };
      }
    };
    
    loadImages();
  }, [framePath, totalFrames, getImageUrl]);

  // Auto-rotation effect
  useEffect(() => {
    if (!autoRotate || isDragging) return;
    
    const interval = setInterval(() => {
      setFrame((prevFrame) => {
        const nextFrame = prevFrame >= totalFrames ? 1 : prevFrame + 1;
        previousFrame.current = nextFrame;
        return nextFrame;
      });
    }, 100); // Adjust speed as needed (lower = faster)
    
    return () => clearInterval(interval);
  }, [autoRotate, isDragging, totalFrames]);

  // Calculate frame based on drag distance
  const updateFrame = useCallback((clientX) => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const containerWidth = container.offsetWidth;
    const dragDistance = clientX - dragStartX.current;
    const dragRatio = dragDistance / containerWidth;
    const frameChange = Math.round(dragRatio * totalFrames);
    const newFrame = previousFrame.current + frameChange;
    
    // Wrap around logic
    let finalFrame = ((newFrame - 1) % totalFrames) + 1;
    if (finalFrame < 1) finalFrame = totalFrames + finalFrame;
    if (finalFrame > totalFrames) finalFrame = finalFrame - totalFrames;
    
    setFrame(finalFrame);
  }, [totalFrames]);

  // Mouse handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setAutoRotate(false);
    dragStartX.current = e.clientX;
    previousFrame.current = frame;
    setStartX(e.clientX);
  };

  const handleMouseUp = () => {
    if (isDragging) {
      previousFrame.current = frame;
    }
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    updateFrame(e.clientX);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setAutoRotate(false);
    dragStartX.current = e.touches[0].clientX;
    previousFrame.current = frame;
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    updateFrame(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (isDragging) {
      previousFrame.current = frame;
    }
    setIsDragging(false);
  };

  // Toggle auto-rotation
  const toggleAutoRotate = () => {
    setAutoRotate(!autoRotate);
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <div className="text-center mb-4">
            <h1 className="display-4 fw-bold mb-3">360° Product Viewer</h1>
            <p className="text-muted">Drag or swipe to rotate the product</p>
          </div>

          <div className="position-relative" style={{ userSelect: 'none' }}>
            {/* 360 Viewer Container */}
            <div
              ref={containerRef}
              className="position-relative bg-white rounded-3 shadow-lg overflow-hidden border"
              style={{
                width: '100%',
                maxWidth: '600px',
                aspectRatio: '1',
                margin: '0 auto',
                cursor: isDragging ? 'grabbing' : 'grab',
                touchAction: 'none'
              }}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Loading State */}
              {isLoading && (
                <div className="position-absolute top-50 start-50 translate-middle">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}

              {/* Error State */}
              {imageError && !isLoading && (
                <div className="position-absolute top-50 start-50 translate-middle text-center p-4">
                  <p className="text-danger mb-2">Unable to load images</p>
                  <small className="text-muted">Please check the image path</small>
                </div>
              )}

              {/* Product Image */}
              {!isLoading && !imageError && (
                <img
                  src={getImageUrl(frame)}
                  alt={`Product view ${frame}`}
                  className="w-100 h-100"
                  style={{
                    objectFit: 'contain',
                    display: 'block',
                    transition: isDragging ? 'none' : 'opacity 0.3s ease'
                  }}
                  draggable={false}
                  onError={() => setImageError(true)}
                />
              )}

              {/* Drag Indicator */}
              {isDragging && (
                <div className="position-absolute bottom-0 start-50 translate-middle-x mb-3">
                  <div className="badge bg-dark bg-opacity-75 px-3 py-2">
                    <i className="bi bi-arrows-horizontal me-2"></i>
                    Dragging...
                  </div>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="text-center mt-4">
              <div className="btn-group" role="group">
                <button
                  type="button"
                  className={`btn ${autoRotate ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={toggleAutoRotate}
                >
                  <i className={`bi ${autoRotate ? 'bi-pause-fill' : 'bi-play-fill'} me-2`}></i>
                  {autoRotate ? 'Pause' : 'Auto Rotate'}
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    setFrame(1);
                    previousFrame.current = 1;
                    setAutoRotate(false);
                  }}
                >
                  <i className="bi bi-arrow-counterclockwise me-2"></i>
                  Reset
                </button>
              </div>

              {/* Frame Counter */}
              <div className="mt-3">
                <small className="text-muted">
                  Frame: {frame} / {totalFrames}
                </small>
              </div>

              {/* Instructions */}
              <div className="mt-4">
                <div className="row g-2 text-muted small">
                  <div className="col-md-4">
                    <i className="bi bi-mouse me-2"></i>
                    Mouse: Click & Drag
                  </div>
                  <div className="col-md-4">
                    <i className="bi bi-phone me-2"></i>
                    Touch: Swipe
                  </div>
                  <div className="col-md-4">
                    <i className="bi bi-arrow-repeat me-2"></i>
                    Auto Rotate: Toggle
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}