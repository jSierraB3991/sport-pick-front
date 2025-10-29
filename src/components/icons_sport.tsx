const sportIcons: Record<string, string> = {
    football: "⚽",
    basketball: "🏀",
    tennis: "🎾",
    table_tennis: "🏓",
    ice_hockey: "🏒",
    baseball: "⚾",
    volleyball: "🏐",
    handball: "🤾",
    bandy: "🤾" /* XDXDXD */,
    betplay_specials: "🎰",
    boxing: "🥊",
    cycling: "🚴",
    cricket: "🦗",
    darts: "🎯",
    motorsports: "🏍️",
    default: "",
};

function GetSportIcon(name: string) {
    const normalized = name.trim().toLowerCase();
    return sportIcons[normalized] || sportIcons.default;
}

export default GetSportIcon;
