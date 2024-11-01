'use client'

import { lockBodyScroll, unlockBodyScroll } from "@/utils";
import { useRouter } from "next/navigation";
import { ElementRef, MouseEvent, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<'dialog'>>(null);
  const wrapperRef = useRef<ElementRef<'div'>>(null);

  useEffect(() => {
    if (dialogRef.current && wrapperRef.current) {
      dialogRef.current.style.opacity = '0';
      dialogRef.current.style.transition = 'transform .3s, opacity .3s';
      wrapperRef.current.style.opacity = '0';
      wrapperRef.current.style.transition = 'transform .3s, opacity .3s';
    }

    if (dialogRef.current && !dialogRef.current?.open) {
      dialogRef.current?.showModal();
      lockBodyScroll();

      setTimeout(() => {
        if (dialogRef.current && wrapperRef.current) {
          dialogRef.current.style.opacity = '1';
          wrapperRef.current.style.opacity = '1';
        }
        if (wrapperRef.current) {
          wrapperRef.current.style.opacity = '1';
        }
      })
    }
  }, []);

  const handleDismiss = () => {
    if (dialogRef.current && wrapperRef.current) {
      dialogRef.current.style.opacity = '0';
      wrapperRef.current.style.opacity = '0';
    }
    setTimeout(() => {
      unlockBodyScroll();
      router.back();
    }, 260)
  }

  const handleDialogClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation()
  }

  return createPortal(
    <div ref={wrapperRef} className={"fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 " + className}>
      <dialog ref={dialogRef} onClick={handleDismiss} onClose={handleDismiss} className="rounded-[12px]">
        <div className="py-4 px-6 overflow-hidden" onClick={handleDialogClick}>
          {children}
        </div>
      </dialog>
    </div>,
    document.getElementById('modal-root')!
  );
}