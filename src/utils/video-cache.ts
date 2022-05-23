import axios from 'axios';

export class VideoCache {
  private static readonly maxSize = 25;

  private static readonly cache: { [src: string]: Blob } = {};

  static async store(src: string): Promise<Blob> {
    const response = await axios.get(src, { responseType: 'blob' });
    const blob = response.data;
    this.cache[src] = blob;
    return blob;
  }

  static get(url: string): Blob | undefined {
    return this.cache[url];
  }

  static garbageCollect(): Promise<void> {
    return new Promise<void>((resolve) => {
      const cacheKeys = Object.keys(this.cache);
      if (cacheKeys.length > VideoCache.maxSize) {
        delete VideoCache.cache[cacheKeys[0]];
      }
      resolve();
    });
  }
}
