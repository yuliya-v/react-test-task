import { useRef } from 'react';
import './Overlay.css';

interface OverlayProps {
  children: React.ReactNode;
  onClose: () => void;
}

export function Overlay({ children, onClose }: OverlayProps) {
  const ref = useRef<HTMLDivElement>(null);
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target !== ref.current) {
      return;
    }
    onClose();
  };
  return (
    <div ref={ref} className="overlay" onClick={handleClick}>
      {children}
    </div>
  );
}

export default Overlay;
