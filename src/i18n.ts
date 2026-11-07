const USER_LOCALE = (typeof window !== "undefined" && window.localStorage && window.localStorage.getItem("language") || "en").toLowerCase();
export const IS_ES = USER_LOCALE.startsWith("es");

export const I18N = {
  en: {
    level: "Level",
    streak: "🔥 Streak: {days} days (Active Multiplier)",
    tabDashboard: "📊 Dashboard",
    tabGTD: "📥 GTD Inbox ({count})",
    tabHabits: "🌿 Habits",
    tabExpansion: "🚀 Expansion",
    expRegistered: "Expansions logged in {zone}",
    recentExpTitle: "⚡ Recent Logged Expansions",
    noActivities: "No activities logged yet. Add one in the Expansion tab!",
    zoneConfort: "Comfort",
    zoneMiedo: "Fear",
    zoneAprendizaje: "Learning",
    zoneCrecimiento: "Growth",
    lvlNovicio: "Novice",
    lvlIniciado: "Initiate",
    lvlExplorador: "Explorer",
    lvlDesafiante: "Challenger",
    lvlEstratega: "Strategist",
    lvlConquistador: "Conqueror",
    lvlCampeon: "Champion",
    lvlTitan: "Titan",
    lvlLeyenda: "Legend",
    lvlTrascendente: "Transcendent"
  },
  es: {
    level: "Nivel",
    streak: "🔥 Racha: {days} días (Multiplicador Activo)",
    tabDashboard: "📊 Dashboard",
    tabGTD: "📥 GTD Inbox ({count})",
    tabHabits: "🌿 Hábitos",
    tabExpansion: "🚀 Expansión",
    expRegistered: "Expansiones registradas en {zone}",
    recentExpTitle: "⚡ Últimas Expansiones Registradas",
    noActivities: "Aún no has registrado actividades. ¡Haz un registro en la pestaña Expansión!",
    zoneConfort: "Confort",
    zoneMiedo: "Miedo",
    zoneAprendizaje: "Aprendizaje",
    zoneCrecimiento: "Crecimiento",
    lvlNovicio: "Novicio",
    lvlIniciado: "Iniciado",
    lvlExplorador: "Explorador",
    lvlDesafiante: "Desafiante",
    lvlEstratega: "Estratega",
    lvlConquistador: "Conquistador",
    lvlCampeon: "Campeón",
    lvlTitan: "Titán",
    lvlLeyenda: "Leyenda",
    lvlTrascendente: "Trascendente"
  }
};

export function t(key: keyof typeof I18N['en'], vars: Record<string, string | number> = {}): string {
  let str = (IS_ES ? I18N.es[key] : I18N.en[key]) || I18N.en[key] || key;
  for (const v in vars) {
    str = str.replace(new RegExp(`\\{${v}\\}`, "g"), String(vars[v]));
  }
  return str;
}
