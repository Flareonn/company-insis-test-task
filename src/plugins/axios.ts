import axios from "axios";

function DivisionUnitFactory(data: DivisionUnitRaw): DivisionUnit {
  return {
    name: data.name,
    regionCode: data.region_code,
    type: data.type,
    code: data.code,
  };
}

axios.defaults.baseURL =
  "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/fms_unit";

axios.interceptors.request.use((config) => {
  if (!config.headers) {
    config.headers = {};
  }
  config.headers.Authorization =
    "Token 5a5e1d8d7ab18d3b42989fb686d9c977d1c9be2c";
  return config;
});

axios.interceptors.response.use((response) => {
  const suggestions = response.data.suggestions as {
    value: string;
    unrestricted_value: string;
    data: DivisionUnitRaw;
  }[];
  response.data = suggestions.map((suggest) =>
    DivisionUnitFactory(suggest.data)
  );
  return response;
});

export default axios;
