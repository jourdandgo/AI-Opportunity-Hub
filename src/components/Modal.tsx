import { ReactNode } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#05060B] border border-white/10 rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col relative"
            >
              <div className="flex items-center justify-between px-10 py-8 border-b border-white/5 bg-black/20">
                <div>
                  <h2 className="text-xl font-display font-bold text-white uppercase tracking-tight">{title}</h2>
                  <div className="h-1 w-12 bg-indigo-500 rounded-full mt-2" />
                </div>
                <button
                  onClick={onClose}
                  className="p-3 bg-[#0D1117] hover:bg-[#161B22] border border-white/5 rounded-2xl transition-all text-slate-500 hover:text-white shadow-xl"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-10 overflow-y-auto custom-scrollbar text-slate-300">
                {children}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
