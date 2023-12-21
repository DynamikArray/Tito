export default {
  install(Vue, options) {
    Vue.prototype.$featureFlags = options.featureFlags;
  },
};

export const featureFlags = {
  upcScanningIsEnabled: false,
};
