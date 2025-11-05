import React from "react";
import { X, RefreshCw, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react";
import { useToast } from "../contexts/tast_contexts";

const ToastContainer: React.FC = () => {
    const { toasts, removeToast } = useToast();

    const getIcon = (type: string) => {
        switch (type) {
            case "success":
                return <CheckCircle className="w-5 h-5" />;
            case "error":
                return <AlertCircle className="w-5 h-5" />;
            case "warning":
                return <AlertTriangle className="w-5 h-5" />;
            case "info":
                return <Info className="w-5 h-5" />;
            default:
                return <Info className="w-5 h-5" />;
        }
    };

    const getColorClasses = (type: string) => {
        switch (type) {
            case "success":
                return "bg-gradient-to-r from-teal-500 to-cyan-600 text-white";
            case "error":
                return "bg-gradient-to-r from-red-500 to-red-600 text-white";
            case "warning":
                return "bg-gradient-to-r from-orange-500 to-orange-600 text-white";
            case "info":
                return "bg-gradient-to-r from-blue-500 to-blue-600 text-white";
            default:
                return "bg-slate-800 text-white";
        }
    };

    const handleReload = () => {
        window.location.reload();
    };

    return (
        <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-sm w-full">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={`${getColorClasses(toast.type)} rounded-lg shadow-2xl p-4 animate-slideIn border border-white/20 backdrop-blur-sm`}>
                    <div className="flex items-start gap-3">
                        {/* Icon */}
                        <div className="flex-shrink-0 mt-0.5">{getIcon(toast.type)}</div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            {toast.title && <h4 className="font-bold text-sm mb-1">{toast.title}</h4>}

                            <p className="text-sm opacity-90">{toast.message}</p>
                        </div>

                        {/* Actions */}
                        <div className="flex-shrink-0 flex gap-1">
                            {/* Reload Button */}
                            {toast.isShowRecharge && (
                                <button onClick={handleReload} className="p-1.5 hover:bg-white/20 rounded-lg transition-colors" title="Recargar página">
                                    <RefreshCw className="w-4 h-4" />
                                </button>
                            )}

                            {/* Close Button */}
                            <button onClick={() => removeToast(toast.id)} className="p-1.5 hover:bg-white/20 rounded-lg transition-colors" title="Cerrar">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            {/* CSS Animation */}
            <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
        </div>
    );
};

export default ToastContainer;
