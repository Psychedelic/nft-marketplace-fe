export class ImageCache {
  private static readonly maxSize = 250;

  private static readonly cache: { [src: string]: HTMLImageElement } =
    {};

  private static readonly listeners: {
    [src: string]: { image: HTMLImageElement; listener: () => void };
  } = {};

  static store(
    src: string,
    cb: () => void,
  ): Promise<HTMLImageElement> {
    // It doesn't need to wait garbage collect result
    this.garbageCollect();

    return new Promise((resolve, reject) => {
      const image = new Image();
      const listener = () => {
        this.cache[src] = image;
        resolve(image);

        if (typeof cb !== 'function') return;

        cb();
      };

      image.addEventListener(
        'load',
        listener,
        /* the listener is removed automatically after invoked */
        {
          once: true,
        },
      );

      image.addEventListener('error', reject);

      image.src = src;
      this.listeners[src] = {
        image,
        listener,
      };
    });
  }

  static get(url: string): HTMLImageElement | undefined {
    return this.cache[url];
  }

  static removeListener(src: string) {
    if (!this.listeners[src]) return;

    const { image, listener } = this.listeners[src];

    image.removeEventListener('load', listener);
  }

  static garbageCollect(): Promise<void> {
    return new Promise<void>((resolve) => {
      const cacheKeys = Object.keys(this.cache);
      if (cacheKeys.length > ImageCache.maxSize) {
        delete ImageCache.cache[cacheKeys[0]];
      }
      resolve();
    });
  }
}
