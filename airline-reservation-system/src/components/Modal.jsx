// frontend/src/components/Modal.jsx
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const Backdrop = styled.div`
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.6);
  display: grid; place-items: center;
  z-index: 1000;
`;

const Shell = styled.div`
  background: #2b2b2b;
  color: #e9e9e9;
  width: min(560px, 92vw);
  border-radius: 14px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.5);
  overflow: hidden;
  transform: translateY(0);
`;

const Header = styled.div`
  padding: 1rem 1.25rem;
  background: #3a3a3a;
  display: flex; align-items: center; justify-content: space-between;
  h3 { margin: 0; font-size: 1.1rem; }
`;

const Body = styled.div`
  padding: 1.25rem;
`;

const CloseBtn = styled.button`
  appearance: none; border: 0; background: transparent; color: #cfcfcf;
  font-size: 1.25rem; cursor: pointer; line-height: 1;
  &:hover { color: #fff; }
`;

const modalRoot = typeof document !== 'undefined'
  ? (document.getElementById('modal-root') || (()=>{
      const el = document.createElement('div');
      el.id = 'modal-root';
      document.body.appendChild(el);
      return el;
    })())
  : null;

export default function Modal({ title, children, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose?.();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const content = (
    <Backdrop onClick={(e) => e.target === e.currentTarget && onClose?.()}>
      <Shell role="dialog" aria-modal="true" aria-label={title || 'Dialog'}>
        <Header>
          <h3>{title}</h3>
          <CloseBtn onClick={onClose} aria-label="Close">×</CloseBtn>
        </Header>
        <Body>{children}</Body>
      </Shell>
    </Backdrop>
  );

  return modalRoot ? ReactDOM.createPortal(content, modalRoot) : content;
}

Modal.Header = Header;
Modal.Body = Body;
