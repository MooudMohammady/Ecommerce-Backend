export default function exclude<T, Key extends keyof T>(user: T, keys: Key[]): Omit<T, Key> {
  const result: any = {};
  for (const [key, value] of Object.entries(user!)) {
    if (!keys.includes(key as Key)) {
      result[key] = value;
    }
  }
  return result;
}