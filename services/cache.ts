import {AsyncStorage} from "expo-sqlite/kv-store";

type cacheEntry = {
    data: any,
    timestamp: number
}
// 5 minute expiry
const CACHE_EXPIRY = 60 * 5 * 1000

export async function setCache(key: string, value: any) {
    const entry: cacheEntry = {
        timestamp: Date.now(),
        data: value
    }
    await AsyncStorage.setItemAsync(key, JSON.stringify(entry));
}

export async function getCache(key: string) {
    const cached = await AsyncStorage.getItemAsync(key);
    if (!cached) return null;
    const entry: cacheEntry = JSON.parse(cached);

    if (Date.now() - entry.timestamp > CACHE_EXPIRY) {
        return null
    }
    return entry.data;
}

export async function wipeCache() {
    await AsyncStorage.clearAsync();
}