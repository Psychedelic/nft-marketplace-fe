declare interface Window {
  ic?: any;
}

declare interface DefaultCallbacks {
  onSuccess?: (...args: any[]) => void;
  onFailure?: (...args: any[]) => void;
}
