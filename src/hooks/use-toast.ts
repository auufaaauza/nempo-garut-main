"use client"

import { useState, useEffect, type ReactNode } from "react"


export type ToastProps = {
  title?: string;
  description?: string;
  duration?: number;
  action?: ReactNode; 
};

export type Toast = ToastProps & {
  id: string;
  dismiss: () => void;
};

// Tipe untuk state global di dalam store
type ToastState = {
  toasts: Toast[];
};

// Tipe untuk fungsi listener
type Listener = (state: ToastState) => void;

// =================================================================
// Implementasi
// =================================================================

const TOAST_LIMIT = 1;

let count = 0;
function generateId() {
  count = (count + 1) % Number.MAX_VALUE;
  return count.toString();
}

// Store dengan tipe yang sudah ditentukan
const toastStore = {
  state: { toasts: [] } as ToastState,
  listeners: [] as Listener[],
  
  getState: (): ToastState => toastStore.state,
  
  setState: (nextState: Partial<ToastState> | ((state: ToastState) => ToastState)) => {
    if (typeof nextState === 'function') {
      toastStore.state = nextState(toastStore.state);
    } else {
      toastStore.state = { ...toastStore.state, ...nextState };
    }
    
    toastStore.listeners.forEach(listener => listener(toastStore.state));
  },
  
  subscribe: (listener: Listener) => {
    toastStore.listeners.push(listener);
    return () => {
      toastStore.listeners = toastStore.listeners.filter(l => l !== listener);
    };
  }
};

// Fungsi toast() dengan tipe untuk argumen & return value
type ToastReturn = {
  id: string;
  dismiss: () => void;
  update: (props: Partial<ToastProps>) => void;
};

export const toast = ({ ...props }: ToastProps): ToastReturn => {
  const id = generateId();

  const update = (props: Partial<ToastProps>) =>
    toastStore.setState((state) => ({
      ...state,
      toasts: state.toasts.map((t) =>
        t.id === id ? { ...t, ...props } : t
      ),
    }));

  const dismiss = () => toastStore.setState((state) => ({
    ...state,
    toasts: state.toasts.filter((t) => t.id !== id),
  }));

  toastStore.setState((state) => ({
    ...state,
    toasts: [
      { ...props, id, dismiss },
      ...state.toasts,
    ].slice(0, TOAST_LIMIT),
  }));

  return {
    id,
    dismiss,
    update,
  };
};

// Hook useToast() dengan tipe untuk state
export function useToast() {
  const [state, setState] = useState<ToastState>(toastStore.getState());
  
  useEffect(() => {
    const unsubscribe = toastStore.subscribe((state) => {
      setState(state);
    });
    return unsubscribe;
  }, []);
  
  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];

    state.toasts.forEach((t) => {
      if (t.duration === Infinity) {
        return;
      }

      const timeout = setTimeout(() => {
        t.dismiss();
      }, t.duration || 5000);

      timeouts.push(timeout);
    });

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [state.toasts]);

  return {
    toast,
    toasts: state.toasts,
  };
}