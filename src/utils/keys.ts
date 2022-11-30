import type { AxiosInstance } from "axios";
import type DivisionService from "@/services/divisions.service";
import { inject, InjectionKey } from "vue";

export const AxiosKey: InjectionKey<AxiosInstance> = Symbol("axios");
export const DivisionKey: InjectionKey<DivisionService> = Symbol("divisionAPI");

export function injectStrict<T>(key: InjectionKey<T>) {
  const resolved = inject(key);
  if (!resolved) {
    throw new Error(`Could now resolve ${key.description}`);
  }
  return resolved;
}
