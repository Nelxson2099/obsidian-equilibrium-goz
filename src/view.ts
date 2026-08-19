import { ItemView, WorkspaceLeaf, Notice } from "obsidian";
import { GOZData, Activity, GTDTask, Habit } from "./types";
import { ZONES, LEVELS, CONTEXTS } from "./constants";
import EquilibriumGOZPlugin from "./main";

export const VIEW_TYPE_EQUILIBRIUM = "equilibrium-goz-view";

export class EquilibriumGOZView extends ItemView {
  plugin: EquilibriumGOZPlugin;
  currentTab: string = "dashboard";

  constructor(leaf: WorkspaceLeaf, plugin: EquilibriumGOZPlugin) {
    super(leaf);
    this.plugin = plugin;
  }

  getViewType(): string {
    return VIEW_TYPE_EQUILIBRIUM;
  }

  getDisplayText(): string {
    return "Equilibrium GOZ";
  }

  getIcon(): string {
    return "target";
  }

  async onOpen(): Promise<void> {
    this.render();
  }

  render(): void {
    const container = this.containerEl.children[1];
    container.empty();
    container.addClass("goz-container");

    const data = this.plugin.data;
    const currentLevel = this.getLevelInfo(data.totalXP);

    // 1. HEADER RPG BANNER
    const header = container.createEl("div", { cls: "goz-header-banner" });
    const levelInfo = header.createEl("div", { cls: "goz-level-info" });
    
    const badge = levelInfo.createEl("div", { cls: "goz-level-badge" });
    badge.createEl("span", { cls: "goz-level-icon", text: currentLevel.icon });
    const titleBox = badge.createEl("div");
    titleBox.createEl("div", { cls: "goz-level-title", text: `Nivel ${currentLevel.level} — ${currentLevel.name}` });
    titleBox.createEl("div", { cls: "goz-level-rank", text: `🔥 Racha: ${data.streakDays} días (Multiplicador Activo)` });

    levelInfo.createEl("div", { cls: "goz-xp-badge", text: `${data.totalXP.toLocaleString()} XP` });

    const progressBg = header.createEl("div", { cls: "goz-progress-bar-bg" });
    const progressFill = progressBg.createEl("div", { cls: "goz-progress-bar-fill" });
    const progressPct = Math.min(100, Math.max(5, (data.totalXP / currentLevel.maxXP) * 100));
    progressFill.style.width = `${progressPct}%`;

    // 2. NAV TABS
    const tabs = container.createEl("div", { cls: "goz-tabs" });
    const tabList = [
      { id: "dashboard", label: "📊 Dashboard" },
      { id: "gtd", label: `📥 GTD Inbox (${data.gtdTasks.filter(t => t.status !== 'completed').length})` },
      { id: "habitos", label: "🌿 Hábitos" },
      { id: "expansion", label: "🚀 Expansión" }
    ];

    tabList.forEach(t => {
      const btn = tabs.createEl("button", { 
        cls: `goz-tab-btn ${this.currentTab === t.id ? 'active' : ''}`,
        text: t.label
      });
      btn.onclick = () => {
        this.currentTab = t.id;
        this.render();
      };
    });

    // 3. TAB CONTENT
    const content = container.createEl("div");

    if (this.currentTab === "dashboard") {
      this.renderDashboard(content, data);
    } else if (this.currentTab === "gtd") {
      this.renderGTD(content, data);
    } else if (this.currentTab === "habitos") {
      this.renderHabits(content, data);
    } else if (this.currentTab === "expansion") {
      this.renderExpansionLog(content, data);
    }
  }

  private getLevelInfo(xp: number) {
    for (let i = LEVELS.length - 1; i >= 0; i--) {
      if (xp >= LEVELS[i].minXP) return LEVELS[i];
    }
    return LEVELS[0];
  }

  private renderDashboard(el: HTMLElement, data: GOZData): void {
    // 4 ZONES GRID
    const grid = el.createEl("div", { cls: "goz-zones-grid" });
    ZONES.forEach(zone => {
      const count = data.activities.filter(a => a.zona_id === zone.id).length;
      const card = grid.createEl("div", { cls: "goz-zone-card" });
      card.style.borderColor = `${zone.color}40`;
      
      const cardHeader = card.createEl("div", { cls: "goz-zone-header" });
      cardHeader.createEl("span", { text: `${zone.icon} ${zone.name}`, attr: { style: `color: ${zone.color}; font-weight: 700;` } });
      cardHeader.createEl("span", { cls: "goz-zone-count", text: `${count}`, attr: { style: `color: ${zone.color};` } });
      
      card.createEl("p", { text: `Expansiones registradas en ${zone.name}`, attr: { style: "font-size: 11px; opacity: 0.7;" } });
    });

    // RECENT EXPANSION LOG
    el.createEl("h3", { text: "⚡ Últimas Expansiones Registradas" });
    if (data.activities.length === 0) {
      el.createEl("p", { text: "Aún no has registrado actividades. ¡Haz un registro en la pestaña Expansión!", attr: { style: "opacity: 0.6;" } });
    } else {
      data.activities.slice(-5).reverse().forEach(act => {
        const zone = ZONES.find(z => z.id === act.zona_id) || ZONES[0];
        const item = el.createEl("div", { cls: "goz-task-item" });
        item.style.borderLeft = `4px solid ${zone.color}`;
        item.createEl("span", { text: `${zone.icon} ${act.descripcion}` });
        item.createEl("span", { text: new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), attr: { style: "font-size: 11px; opacity: 0.6;" } });
      });
    }

    // BACKUP JSON BUTTON
    const backupBtn = el.createEl("button", { cls: "goz-btn-primary", text: "💾 Exportar Respaldo JSON" });
    backupBtn.style.marginTop = "20px";
    backupBtn.onclick = () => {
      const jsonStr = JSON.stringify(data, null, 2);
      navigator.clipboard.writeText(jsonStr);
      new Notice("¡Respaldo JSON copiado al portapapeles con éxito!");
    };
  }

  private renderGTD(el: HTMLElement, data: GOZData): void {
    const box = el.createEl("div", { cls: "goz-gtd-box" });
    box.createEl("h4", { text: "⚡ Captura Rápida de Tarea (Inbox GTD)" });

    const inputGroup = box.createEl("div", { cls: "goz-input-group" });
    const input = inputGroup.createEl("input", { cls: "goz-input", attr: { placeholder: "Escribe tu tarea o idea..." } }) as HTMLInputElement;
    const addBtn = inputGroup.createEl("button", { cls: "goz-btn-primary", text: "+ Capturar" });

    let selectedContext = CONTEXTS[0].tag;

    const chips = box.createEl("div", { cls: "goz-context-chips" });
    CONTEXTS.forEach(c => {
      const chip = chips.createEl("span", { cls: "goz-chip", text: c.tag });
      chip.style.backgroundColor = `${c.color}20`;
      chip.style.color = c.color;
      chip.onclick = () => {
        selectedContext = c.tag;
        new Notice(`Contexto seleccionado: ${c.tag}`);
      };
    });

    const addGTD = () => {
      const val = input.value.trim();
      if (!val) return;
      const newTask: GTDTask = {
        id: Date.now().toString(),
        title: val,
        context: selectedContext,
        zona_id: 1,
        status: 'inbox',
        createdAt: new Date().toISOString()
      };
      data.gtdTasks.push(newTask);
      this.plugin.savePluginData();
      new Notice("¡Tarea capturada al Inbox!");
      input.value = "";
      this.render();
    };

    addBtn.onclick = addGTD;
    input.onkeydown = (e) => { if (e.key === "Enter") addGTD(); };

    // TASK LIST
    el.createEl("h3", { text: "📥 Bandeja de Entrada" });
    const pending = data.gtdTasks.filter(t => t.status !== 'completed');
    if (pending.length === 0) {
      el.createEl("p", { text: "¡Inbox totalmente despejado! 🚀", attr: { style: "opacity: 0.6;" } });
    } else {
      pending.forEach(t => {
        const item = el.createEl("div", { cls: "goz-task-item" });
        item.createEl("span", { text: `${t.title} (${t.context})` });

        const completeBtn = item.createEl("button", { cls: "goz-btn-primary", text: "✓ Completar" });
        completeBtn.style.padding = "4px 10px";
        completeBtn.style.fontSize = "11px";
        completeBtn.onclick = () => {
          t.status = 'completed';
          data.totalXP += 100;
          this.plugin.savePluginData();
          new Notice("¡Tarea completada! +100 XP");
          this.render();
        };
      });
    }
  }

  private renderHabits(el: HTMLElement, data: GOZData): void {
    el.createEl("h3", { text: "🌿 Hábitos & Rutinas" });

    if (data.habits.length === 0) {
      // Default habits
      data.habits = [
        { id: "h1", title: "Lectura Zettelkasten / Obsidian", frequency: "daily", zona_id: 3, streak: 3, completedPeriods: [] },
        { id: "h2", title: "Entrenamiento Físico", frequency: "daily", zona_id: 4, streak: 5, completedPeriods: [] },
        { id: "h3", title: "Revisión de Proyectos & Metas", frequency: "weekly", zona_id: 4, streak: 2, completedPeriods: [] }
      ];
      this.plugin.savePluginData();
    }

    data.habits.forEach(h => {
      const card = el.createEl("div", { cls: "goz-habit-card" });
      const info = card.createEl("div");
      info.createEl("div", { text: h.title, attr: { style: "font-weight: 700;" } });
      info.createEl("div", { text: `Frecuencia: ${h.frequency.toUpperCase()} | 🔥 Racha: ${h.streak} períodos`, attr: { style: "font-size: 11px; opacity: 0.7;" } });

      const btn = card.createEl("button", { cls: "goz-habit-btn", text: "Marcar Cumplido" });
      btn.onclick = () => {
        h.streak += 1;
        data.totalXP += 150;
        this.plugin.savePluginData();
        new Notice(`¡Hábito marcado! 🔥 Racha: ${h.streak} | +150 XP`);
        this.render();
      };
    });
  }

  private renderExpansionLog(el: HTMLElement, data: GOZData): void {
    const box = el.createEl("div", { cls: "goz-gtd-box" });
    box.createEl("h4", { text: "🚀 Registrar Nueva Expansión" });

    const inputDesc = box.createEl("input", { cls: "goz-input", attr: { placeholder: "¿Qué zona desafiaste hoy?" } }) as HTMLInputElement;
    inputDesc.style.marginBottom = "10px";

    const selectZone = box.createEl("select", { cls: "goz-input" }) as HTMLSelectElement;
    selectZone.style.marginBottom = "10px";
    ZONES.forEach(z => {
      const opt = selectZone.createEl("option", { text: `${z.icon} Zona de ${z.name}` });
      opt.value = z.id.toString();
    });

    const submitBtn = box.createEl("button", { cls: "goz-btn-primary", text: "Registrar Expansión" });
    submitBtn.onclick = () => {
      const desc = inputDesc.value.trim();
      if (!desc) return;

      const newAct: Activity = {
        id: Date.now().toString(),
        zona_id: parseInt(selectZone.value),
        descripcion: desc,
        resistencia: 3,
        habilidad: 4,
        meta_cumplida: true,
        timestamp: new Date().toISOString()
      };

      data.activities.push(newAct);
      data.totalXP += 250;
      data.streakDays += 1;
      this.plugin.savePluginData();
      new Notice("¡Expansión registrada con éxito! +250 XP 🚀");
      this.render();
    };
  }
}
