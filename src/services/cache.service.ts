// Примитивный кеширующий сервис
export default class CacheService<T> {
  maxAge: number;
  container: Record<string | number | symbol, { value: T; date: number }> = {};
  constructor(minutes = 5) {
    this.maxAge = 1000 * 60 * minutes;
  }
  set(key: string, value: T) {
    this.container[key] = {
      value,
      date: Date.now(),
    };
    // Проверка на переполнение контейнера и удаление самого старого ответа
    const entries = Object.entries(this.container);
    if (entries.length >= 10) {
      const olderestDateInCache = entries.reduce(
        (a, b) => Math.min(a, b[1].date),
        Infinity
      );
      const olderestKey = entries.find(
        (item) => item[1].date === olderestDateInCache
      );
      if (olderestKey) {
        this.delete(olderestKey[0]);
      }
    }
  }
  delete(key: string) {
    delete this.container[key];
  }
  get(key: string) {
    if (this.has(key)) {
      return this.container[key].value;
    }
    return undefined;
  }
  has(key: string) {
    if (key in this.container) {
      return Date.now() - this.container[key].date < this.maxAge;
    }
    return false;
  }
}

export class CacheFacadeService<T> extends CacheService<T> {
  async request(key: string, req: () => Promise<T>) {
    const cached = this.get(key);
    if (cached) {
      return Promise.resolve(cached);
    } else {
      const value = await req();
      this.set(key, value);
      return value;
    }
  }
}
