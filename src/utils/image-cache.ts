export class ImageCache {
  private static readonly maxSize = 250;

  private static readonly cache: { [src: string]: HTMLImageElement } =
    {};

  static store(src: string): Promise<HTMLImageElement> {
    // It doesn't need to wait garbage collect result
    this.garbageCollect();

    return new Promise((resolve, reject) => {
      const image = new Image();

      image.addEventListener(
        'load',
        () => {
          this.cache[src] = image;
          resolve(image);
        },
        /* the listener is removed automatically after invoked */
        {
          once: true,
        },
      );

      image.addEventListener('error', reject);

      image.src = src;
    });
  }

  static get(url: string): HTMLImageElement | undefined {
    return this.cache[url];
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
