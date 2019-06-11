import { logger } from '../logger';

export abstract class SeedFactory<T> {
  abstract name: string;
  abstract create(): T;

  make() {
    const result = this.create();
    logger.debug(`seed:${this.name}`, result);
    return result;
  }

  many(count: number) {
    const result = [];
    while (count !== 0) {
      const part = this.create();
      logger.debug(`seed:${this.name}`, part);
      result.push(part);
      count--;
    }

    return result;
  }
}
