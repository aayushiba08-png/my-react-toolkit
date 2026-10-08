// JavaScript Tasks 8-14: pure functions + demo outputs

// 8. Reverse a string without using reverse()
export function reverseString(str: string): string {
  let result = "";
  for (let i = str.length - 1; i >= 0; i--) {
    result += str[i];
  }
  return result;
}

// 9. Find duplicate values from an array
export function findDuplicates<T>(arr: T[]): T[] {
  const seen = new Set<T>();
  const dupes = new Set<T>();
  for (const item of arr) {
    if (seen.has(item)) dupes.add(item);
    else seen.add(item);
  }
  return [...dupes];
}

// 10. Find the second-largest number from an array
export function secondLargest(arr: number[]): number | null {
  let first = -Infinity;
  let second = -Infinity;
  for (const n of arr) {
    if (n > first) {
      second = first;
      first = n;
    } else if (n > second && n < first) {
      second = n;
    }
  }
  return second === -Infinity ? null : second;
}

// 11. Count the frequency of each character in a string
export function charFrequency(str: string): Record<string, number> {
  const freq: Record<string, number> = {};
  for (const ch of str) {
    freq[ch] = (freq[ch] ?? 0) + 1;
  }
  return freq;
}

// 12. Remove duplicate values while preserving the original order
export function uniquePreserveOrder<T>(arr: T[]): T[] {
  const seen = new Set<T>();
  const result: T[] = [];
  for (const item of arr) {
    if (!seen.has(item)) {
      seen.add(item);
      result.push(item);
    }
  }
  return result;
}

// 13. Implement your own map() function
export function myMap<T, U>(arr: T[], fn: (item: T, index: number) => U): U[] {
  const result: U[] = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(fn(arr[i] as T, i));
  }
  return result;
}

// 14. Implement your own filter() function
export function myFilter<T>(arr: T[], fn: (item: T, index: number) => boolean): T[] {
  const result: T[] = [];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i] as T;
    if (fn(item, i)) result.push(item);
  }
  return result;
}
