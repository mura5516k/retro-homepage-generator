export function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function pickOne<T>(items: T[]): T {
  return items[randomInt(0, items.length - 1)];
}

export function pickMany<T>(items: T[], count: number): T[] {
  const pool = [...items];
  const result: T[] = [];
  while (pool.length > 0 && result.length < count) {
    result.push(pool.splice(randomInt(0, pool.length - 1), 1)[0]);
  }
  return result;
}

export function weightedPick<T extends string>(weights: Record<T, number>): T {
  const total = (Object.values(weights) as number[]).reduce<number>((sum, weight) => sum + weight, 0);
  let roll = Math.random() * total;
  for (const [key, weight] of Object.entries(weights) as Array<[T, number]>) {
    roll -= weight;
    if (roll <= 0) {
      return key;
    }
  }
  return Object.keys(weights)[0] as T;
}

export function randomBool(rate: number) {
  return Math.random() < rate;
}
