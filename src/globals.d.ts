type DivisionUnit = {
  code: string;
  name: string;
  regionCode: string;
  type: DivisionType;
};

type DivisionUnitRaw = Omit<DivisionUnit, "regionCode"> & {
  region_code: string;
};

type DivisionType = ("0" | "1" | "2" | "3") | string;
