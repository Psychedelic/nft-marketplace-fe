import axios from 'axios';

export class VideoCache {
  private static readonly maxSize = 25;

  private static readonly cache: { [src: string]: HTMLVideoElement } =
    {};

  private static readonly listeners: {
    [src: string]: { video: HTMLVideoElement; listener: () => void };
  } = {};

  static async store(
    src: string,
    cb: () => void,
  ): Promise<HTMLVideoElement> {
    const hasCachedVideo = this.get(src);

    const response = await axios.get(src);
    const video = response.data;
    this.cache[src] = video;

    return new Promise((resolve, reject) => {
      if (hasCachedVideo && typeof cb === 'function') {
        cb();
        resolve(hasCachedVideo);

        return;
      }

      const video = document.createElement('video');

      const listener = () => {
        this.cache[src] = video;
        resolve(video);

        if (typeof cb !== 'function') return;

        cb();
      };

      this.listeners[src] = {
        video,
        listener,
      };

      video.addEventListener('load', listener, {
        once: true,
      });

      video.addEventListener('error', reject);

      video.src = src;
    });
  }

  static get(url: string): HTMLVideoElement | undefined {
    return this.cache[url];
  }

  static removeListener(src: string) {
    if (!this.listeners[src]) return;

    const { video, listener } = this.listeners[src];

    console.log('works', video, this.listeners[src]);

    video.removeEventListener('load', listener);

    delete this.listeners[src];
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
