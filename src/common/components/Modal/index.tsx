import React from 'react';
import styled from 'styled-components';
import { IoMdClose } from 'react-icons/io';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.25);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalBox = styled.div`
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 8px 32px rgba(15, 23, 42, 0.18);
  padding: 0 var(--space-xl) var(--space-xl) var(--space-xl);
  min-width: 380px;
  max-width: 96vw;
  max-height: 96vh;
  overflow-y: auto;
  position: relative;
  animation: modalIn 0.18s cubic-bezier(.4,0,.2,1);

  input:not([type='radio']):not([type='checkbox']):not([type='file']),
  select {
    min-height: 40px;
    height: 40px;
  }

  label {
    font-weight: 500 !important;
  }

  @keyframes modalIn {
    from { opacity: 0; transform: translateY(-16px) scale(0.98); }
    to { opacity: 1; transform: none; }
  }
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  font-size:13px;
  gap: var(--space-md);
  padding: 28px 0 var(--space-sm) 0;
`;

const ModalTitle = styled.h2`
  font-size: var(--font-size-xs);
  font-weight: 500;
  color: #1d4f91;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #64748b;
  font-size: 1.7rem;
  cursor: pointer;
  padding: 0;
  margin: 0;
  transition: color 0.2s;
  &:hover {
    color: #e11d48;
  }
`;

interface ModalProps {
    open: boolean;
    onClose: () => void;
    titulo?: string;
    children: React.ReactNode;
}

export function Modal({ open, onClose, titulo, children }: ModalProps) {
    if (!open) return null;
    return (
        <Overlay onClick={onClose}>
            <ModalBox onClick={e => e.stopPropagation()}>
                <ModalHeader>
                    {titulo && <ModalTitle>{titulo}</ModalTitle>}
                    <CloseButton aria-label="Fechar" onClick={onClose}>
                        <IoMdClose />
                    </CloseButton>
                </ModalHeader>
                {children}
            </ModalBox>
        </Overlay>
    );
}
