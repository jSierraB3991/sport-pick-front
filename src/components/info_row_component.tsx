type InfoRowProps = {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    last?: boolean;
    type?: React.HTMLInputTypeAttribute;
    placeholder?: string;
    disabled?: boolean;
};

const InfoRowComponent = ({ label, value, onChange, last = false, type = "text", placeholder, disabled = false }: InfoRowProps) => (
    <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-6 py-4 ${!last ? "border-b border-slate-700" : ""}`}>
        <span className="text-slate-400 text-sm sm:w-40">{label}</span>

        <input
            type={type}
            value={value}
            disabled={disabled}
            onChange={onChange}
            placeholder={placeholder}
            className="flex-1 bg-slate-700 border border-slate-600 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
    </div>
);

export default InfoRowComponent;
