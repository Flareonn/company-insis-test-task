import axios from "@/plugins/axios";
import { CacheFacadeService } from "@/services/cache.service";

type DivisionFilter = { region_code?: string; type?: string };

export default class DivisionService {
  regionCode: string;
  cacheService: CacheFacadeService<DivisionUnit[]>;
  constructor(regionCode: string) {
    this.regionCode = regionCode;
    this.cacheService = new CacheFacadeService<DivisionUnit[]>();
  }
  async getDivisionsByType(type: DivisionType) {
    return await this.cacheService.request(`type:${type}`, () =>
      this.request("", [{ type }])
    );
  }
  async getDivisionsByQuery(query: string, type?: DivisionType) {
    return await this.cacheService.request(`query:${query}`, () =>
      this.request(query, [{ type }])
    );
  }
  async getAllDivisions() {
    return await this.cacheService.request("all", async () => {
      const types = ["0", "1", "2", "3"];
      return (
        await Promise.all(types.map((type) => this.request("", [{ type }])))
      ).reduce((acc, arr) => acc.concat(arr), []);
    });
  }
  async request(query: string, filters?: DivisionFilter[]) {
    const filterByRegion = { region_code: this.regionCode };
    const response = (
      await axios.post("", {
        query: query || this.regionCode,
        filters: filters
          ? filters.map((filter) => Object.assign(filter, filterByRegion))
          : [filterByRegion],
        count: 20,
      })
    ).data;
    return response;
  }
}
