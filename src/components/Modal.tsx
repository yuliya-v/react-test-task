import { useRef, useState } from 'react';
import './Modal.css';

interface ModalProps {
  onSubmit: (value: string) => void;
}

function Modal({ onSubmit }: ModalProps) {
  const [error, setError] = useState('');
  const ref = useRef<HTMLInputElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const value = ref.current?.value.trim();
    if (!value) {
      setError('Введите ваше метоположение');
      return;
    }
    onSubmit(value);
    setError('');
  };

  return (
    <div className="modal">
      <input ref={ref} className="text-input" type="text" placeholder="Местоположение" />
      {error && <div className="modal-error">{error}</div>}
      <button className="modal-btn" type="button" onClick={handleClick}>
        Выбрать
      </button>
    </div>
  );
}

export default Modal;
