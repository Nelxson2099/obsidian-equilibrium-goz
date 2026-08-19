import { Plugin, WorkspaceLeaf } from "obsidian";
import { EquilibriumGOZView, VIEW_TYPE_EQUILIBRIUM } from "./view";
import { GOZData } from "./types";

const DEFAULT_DATA: GOZData = {
  activities: [],
  gtdTasks: [],
  habits: [],
  totalXP: 8725,
  streakDays: 7,
  lastActiveDate: new Date().toISOString(),
  leisurePoints: 16
};

export default class EquilibriumGOZPlugin extends Plugin {
  data: GOZData = DEFAULT_DATA;

  async onload() {
    await this.loadPluginData();

    // Register View
    this.registerView(
      VIEW_TYPE_EQUILIBRIUM,
      (leaf) => new EquilibriumGOZView(leaf, this)
    );

    // Ribbon Icon
    this.addRibbonIcon("target", "Equilibrium GOZ", () => {
      this.activateView();
    });

    // Commands
    this.addCommand({
      id: "open-equilibrium-goz-view",
      name: "Abrir Panel Equilibrium GOZ",
      callback: () => {
        this.activateView();
      }
    });

    console.log("Equilibrium GOZ Engine Plugin cargado exitosamente.");
  }

  async onunload() {
    console.log("Equilibrium GOZ Engine Plugin descargado.");
  }

  async loadPluginData() {
    this.data = Object.assign({}, DEFAULT_DATA, await this.loadData());
  }

  async savePluginData() {
    await this.saveData(this.data);
  }

  async activateView() {
    const { workspace } = this.app;
    let leaf: WorkspaceLeaf | null = null;
    const leaves = workspace.getLeavesOfType(VIEW_TYPE_EQUILIBRIUM);

    if (leaves.length > 0) {
      leaf = leaves[0];
    } else {
      leaf = workspace.getRightLeaf(false);
      await leaf?.setViewState({
        type: VIEW_TYPE_EQUILIBRIUM,
        active: true,
      });
    }

    if (leaf) {
      workspace.revealLeaf(leaf);
    }
  }
}
