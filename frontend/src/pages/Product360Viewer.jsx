import { useState } from "react";
// Online 360 image folder (36 frames suggested)
// Example set taken from: https://scaleflex.cloudimg.io/v7/demo/360-car/ (public demo images)
// Images are named: 01.jpg, 02.jpg ... 36.jpg
export default function Product360Viewer() {
  const totalFrames = 36;
  const framePath = "https://fastly-production.24c.in/webin/360"; // online images folder
  const [frame, setFrame] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const diff = e.clientX - startX;
    if (Math.abs(diff) > 5) {
      let newFrame = frame + (diff > 0 ? 1 : -1);
      if (newFrame > totalFrames) newFrame = 1;
      if (newFrame < 1) newFrame = totalFrames;
      setFrame(newFrame);
      setStartX(e.clientX);
    }
  };
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-100 p-6 select-none">
      <h1 className="text-3xl font-bold mb-6">360° Product Viewer</h1>
      <div
        className="w-[400px] h-[400px] bg-white rounded-2xl shadow-xl flex justify-center items-center overflow-hidden border border-gray-300"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
      >
        <img
          src={`${framePath}${String(frame).padStart(2, "0")}.jpg`}
          alt="Product"
          className="w-full h-full object-contain"
        />
      </div>
      <p className="text-gray-600 mt-4">Drag left or right to rotate</p>
    </div>
  );
}