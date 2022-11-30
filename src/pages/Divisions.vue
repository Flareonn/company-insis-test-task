<script setup lang="ts">
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";
import { FilterMatchMode } from "primevue/api";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import useStoreDivisions from "@/store/divisions";
import debounce from "@/utils/debounce";

const data = ref<DivisionUnit[]>([]);

const controlSearch = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const storeDivisions = useStoreDivisions();
const route = useRoute();

watch(
  () => route.params.type,
  async (type) => {
    data.value = await storeDivisions.fetchType(type.toString());
    controlSearch.value.global.value = null;
  },
  {
    immediate: true,
  }
);
watch(
  () => controlSearch.value.global.value,
  debounce(async (searchQuery: string) => {
    data.value = await storeDivisions.fetchQuery(
      searchQuery,
      route.params.type.toString()
    );
  }, 250)
);
</script>

<template>
  <div class="divisions-page">
    <span class="p-input-icon-left input-search">
      <i class="pi pi-search" />
      <input-text
        placeholder="По названию и коду подразделения"
        v-model="controlSearch.global.value"
      />
    </span>
    <data-table
      :value="data"
      v-model:filters="controlSearch"
      :global-filter-fields="['code', 'name']"
    >
      <column field="code" header="Код подразделения" />
      <column field="name" header="Название" />
      <column field="regionCode" header="Код региона" />
      <column field="type" header="Вид подразделения" />
    </data-table>
  </div>
</template>

<style lang="less" scoped>
.input-search {
  width: 100%;
  max-width: 845px;
  margin-bottom: 2em;
  input {
    width: inherit;
  }
}
</style>
