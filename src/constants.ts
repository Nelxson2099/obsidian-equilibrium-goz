import { t } from "./i18n";

export const ZONES = [
  { id: 1, get name() { return t("zoneConfort"); }, color: "#6366F1", icon: "🏠", bg: "rgba(99, 102, 241, 0.15)" },
  { id: 2, get name() { return t("zoneMiedo"); }, color: "#EF4444", icon: "⚡", bg: "rgba(239, 68, 68, 0.15)" },
  { id: 3, get name() { return t("zoneAprendizaje"); }, color: "#F59E0B", icon: "🧠", bg: "rgba(245, 158, 11, 0.15)" },
  { id: 4, get name() { return t("zoneCrecimiento"); }, color: "#10B981", icon: "🚀", bg: "rgba(16, 185, 129, 0.15)" }
];

export const LEVELS = [
  { level: 1, minXP: 0, maxXP: 500, get name() { return t("lvlNovicio"); }, icon: "🌱", color: "#8892A4" },
  { level: 2, minXP: 500, maxXP: 1200, get name() { return t("lvlIniciado"); }, icon: "🌿", color: "#3B82F6" },
  { level: 3, minXP: 1200, maxXP: 2500, get name() { return t("lvlExplorador"); }, icon: "🧭", color: "#6366F1" },
  { level: 4, minXP: 2500, maxXP: 4500, get name() { return t("lvlDesafiante"); }, icon: "⚔️", color: "#8B5CF6" },
  { level: 5, minXP: 4500, maxXP: 7500, get name() { return t("lvlEstratega"); }, icon: "🛡️", color: "#EC4899" },
  { level: 6, minXP: 7500, maxXP: 12000, get name() { return t("lvlConquistador"); }, icon: "🔥", color: "#F59E0B" },
  { level: 7, minXP: 12000, maxXP: 18000, get name() { return t("lvlCampeon"); }, icon: "🏆", color: "#10B981" },
  { level: 8, minXP: 18000, maxXP: 25000, get name() { return t("lvlTitan"); }, icon: "👑", color: "#06B6D4" },
  { level: 9, minXP: 25000, maxXP: 35000, get name() { return t("lvlLeyenda"); }, icon: "⚡", color: "#A855F7" },
  { level: 10, minXP: 35000, maxXP: 50000, get name() { return t("lvlTrascendente"); }, icon: "🌟", color: "#F43F5E" }
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
