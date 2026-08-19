class TimeLimitedCache {
  constructor() {
    this.store = new Map();
  }

  set(key, value, duration) {
    const alreadyExist = this.store.has(key);
    if (alreadyExist) {
      clearTimeout(this.store.get(key).timeout);
    }

    const timeout = setTimeout(() => {
      this.store.delete(key);
    }, duration);

    this.store.set(key, { value, timeout });
    return alreadyExist;
  }

  get(key) {
    if (this.store.has(key)) {
      return this.store.get(key).value;
    }
    return -1;
  }

  count() {
    return this.store.size;
  }
}

