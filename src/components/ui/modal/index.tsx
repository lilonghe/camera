'use client'

import { useRouter } from "next/navigation";
import { ElementRef, MouseEvent, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<'dialog'>>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  const handleDismiss = () => {
    router.back();
  }

  const handleDialogClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation()
  }

  return createPortal(
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30">
      <dialog ref={dialogRef} onClick={handleDismiss} onClose={handleDismiss} className="rounded-[12px]">
        <div className="py-4 px-6 overflow-hidden" onClick={handleDialogClick}>
          {children}
        </div>
      </dialog>
    </div>,
    document.getElementById('modal-root')!
  );
}