import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, LogOut, Settings, FileText } from "lucide-react";
import { useToast } from "../contexts/tast_contexts";
import { logOutUser } from "../libs/token_data";

interface UserMenuProps {
    userName: string;
    userEmail: string;
}

const UserMenuComponent: React.FC<UserMenuProps> = ({ userName, userEmail }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const { showToast } = useToast();

    const getInitials = (name: string) => {
        const parts = name.split(" ");
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const handleLogout = () => {
        logOutUser();

        showToast({
            type: "info",
            title: "Sesión cerrada",
            message: "Has cerrado sesión correctamente",
        });

        navigate("/login");
        setIsOpen(false);
    };

    const menuItems = [
        {
            icon: User,
            label: "Tu Home",
            action: () => navigate("/user/home"),
            divider: false,
        },
        {
            icon: LogOut,
            label: "Salir",
            action: handleLogout,
            divider: true,
        },
        {
            icon: Settings,
            label: "Configuración",
            action: () => navigate("/user/configuration"),
            divider: false,
        },
        {
            icon: FileText,
            label: "Datos Personales",
            action: () => navigate("/user/personal-data"),
            divider: false,
        },
    ];

    return (
        <div className="relative" ref={menuRef}>
            {/* Avatar Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-white font-bold text-sm hover:from-teal-600 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
                {getInitials(userName)}
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden z-50 animate-slideDown">
                    {/* User Info Header */}
                    <div className="p-4 border-b border-slate-700">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                {getInitials(userName)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-white font-semibold text-sm truncate">{userName}</h3>
                                <p className="text-slate-400 text-xs truncate">{userEmail}</p>
                            </div>
                        </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                        {menuItems.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <React.Fragment key={index}>
                                    <button
                                        onClick={() => {
                                            item.action();
                                        }}
                                        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-slate-700/50 transition-colors group">
                                        <Icon size={20} className="text-slate-400 group-hover:text-white transition-colors flex-shrink-0" />
                                        <span className="text-slate-200 text-sm group-hover:text-white transition-colors flex-1 text-left">{item.label}</span>
                                    </button>
                                    {item.divider && <div className="my-2 border-t border-slate-700"></div>}
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* CSS Animation */}
            <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
      `}</style>
        </div>
    );
};

export default UserMenuComponent;
