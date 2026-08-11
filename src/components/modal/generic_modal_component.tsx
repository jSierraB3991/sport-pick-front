import { X } from "lucide-react";
import { useEffect } from "react";

type ModalComponentProps = {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

const GenericModalComponent = ({ title, isOpen, onClose, children }: ModalComponentProps) => {
    if (!isOpen) return null;

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
            <div className="w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-800 shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-700 px-6 py-4">
                    <h2 className="text-xl font-semibold text-white">{title}</h2>

                    <button onClick={onClose} className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-700 hover:text-white">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6">{children}</div>
            </div>
        </div>
    );
};

export default GenericModalComponent;
