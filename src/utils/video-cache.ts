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
    this.garbageCollect();

    const hasCachedVideo = this.get(src);

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

      video.addEventListener('loadeddata', listener, {
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

    video.removeEventListener('loadeddata', listener);

    video.removeEventListener('error', listener);

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
