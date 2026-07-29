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
    formula_1: "🏁",
    american_football: "🏈",
    golf: "⛳",
    winter_olympic_games: "⛷",
    winter_sports: "🎿",
    rugby_league: "🏉",
    rugby_union: "🏉",
    lacrosse: "🥍",
    default: "",
};

function GetSportIcon(name: string) {
    const normalized = name.trim().toLowerCase();
    return sportIcons[normalized] || sportIcons.default;
}

export default GetSportIcon;
