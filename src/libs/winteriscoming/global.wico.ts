export class WicoGlobal {
  private static instance: WicoGlobal;

  private GLOBAL_OPTIONS = {
    MAXIMUM_REQUEST_LIMIT: 3,
    MAXIMUM_SCOUT_LIMIT: 3,
    EXPIRE_HISTORIES_AFTER: 7,
  };

  private constructor() {}

  static getInstance() {
    if (!WicoGlobal.instance) {
      WicoGlobal.instance = new WicoGlobal();
    }
    return WicoGlobal.instance;
  }

  get maxRequestLimit(): number {
    return this.GLOBAL_OPTIONS.MAXIMUM_REQUEST_LIMIT;
  }
  get maxScoutLimit(): number {
    return this.GLOBAL_OPTIONS.MAXIMUM_SCOUT_LIMIT;
  }
  get expiredAfter(): number {
    return this.GLOBAL_OPTIONS.EXPIRE_HISTORIES_AFTER;
  }
}
