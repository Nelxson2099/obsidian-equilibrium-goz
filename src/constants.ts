export const ZONES = [
  { id: 1, name: "Confort", color: "#6366F1", icon: "🏠", bg: "rgba(99, 102, 241, 0.15)" },
  { id: 2, name: "Miedo", color: "#EF4444", icon: "⚡", bg: "rgba(239, 68, 68, 0.15)" },
  { id: 3, name: "Aprendizaje", color: "#F59E0B", icon: "🧠", bg: "rgba(245, 158, 11, 0.15)" },
  { id: 4, name: "Crecimiento", color: "#10B981", icon: "🚀", bg: "rgba(16, 185, 129, 0.15)" }
];

export const LEVELS = [
  { level: 1, minXP: 0, maxXP: 500, name: "Novicio", icon: "🌱", color: "#8892A4" },
  { level: 2, minXP: 500, maxXP: 1200, name: "Iniciado", icon: "🌿", color: "#3B82F6" },
  { level: 3, minXP: 1200, maxXP: 2500, name: "Explorador", icon: "🧭", color: "#6366F1" },
  { level: 4, minXP: 2500, maxXP: 4500, name: "Desafiante", icon: "⚔️", color: "#8B5CF6" },
  { level: 5, minXP: 4500, maxXP: 7500, name: "Estratega", icon: "🛡️", color: "#EC4899" },
  { level: 6, minXP: 7500, maxXP: 12000, name: "Conquistador", icon: "🔥", color: "#F59E0B" },
  { level: 7, minXP: 12000, maxXP: 18000, name: "Campeón", icon: "🏆", color: "#10B981" },
  { level: 8, minXP: 18000, maxXP: 25000, name: "Titán", icon: "👑", color: "#06B6D4" },
  { level: 9, minXP: 25000, maxXP: 35000, name: "Leyenda", icon: "⚡", color: "#A855F7" },
  { level: 10, minXP: 35000, maxXP: 50000, name: "Trascendente", icon: "🌟", color: "#F43F5E" }
];

export const SENTIMENTS = [
  { id: 1, label: "Cumplido", emoji: "✅" },
  { id: 2, label: "Superado", emoji: "🚀" },
  { id: 3, label: "Resistencia Vencida", emoji: "💪" },
  { id: 4, label: "Inspirado", emoji: "💡" }
];

export const CONTEXTS = [
  { tag: "@ordenador", label: "Ordenador", color: "#10B981" },
  { tag: "@llamadas", label: "Llamadas", color: "#EF4444" },
  { tag: "@en_calle", label: "En Calle", color: "#F97316" },
  { tag: "@focus_modo", label: "Focus Modo", color: "#6366F1" },
  { tag: "@casa", label: "Casa", color: "#8B5CF6" }
];
