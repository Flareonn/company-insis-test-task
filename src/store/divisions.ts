import { defineStore } from "pinia";
import type DivisionService from "@/services/divisions.service";
import { injectStrict, DivisionKey } from "@/utils/keys";

interface DivisionsState {
  divisions: Record<DivisionType, DivisionUnit[]>;
  service: DivisionService;
}

const store = defineStore({
  id: "divisions",
  state: (): DivisionsState => ({
    divisions: {},
    service: injectStrict(DivisionKey),
  }),
  actions: {
    add(divisions: DivisionUnit[]) {
      divisions.forEach((division) => {
        this.addByType([division], division.type);
      });
    },
    addByType(divisions: DivisionUnit[], type: DivisionType) {
      if (type in this.divisions) {
        this.divisions[type].push(...divisions);
      } else {
        this.divisions[type] = divisions;
      }
    },
    async fetchType(type: DivisionType) {
      const divisions = await this.service.getDivisionsByType(type);
      this.addByType(divisions, type);
      return divisions;
    },
    async fetchQuery(query: string, type: DivisionType) {
      const divisions = await this.service.getDivisionsByQuery(query, type);
      this.addByType(divisions, type);
      return divisions;
    },
    async fetchAll() {
      const divisions = await this.service.getAllDivisions();
      this.add(divisions);
      return divisions;
    },
  },
  getters: {
    getDivisionsCount(): number[] {
      return Object.values(this.divisions).map((division) => division.length);
    },
  },
});

export default store;
