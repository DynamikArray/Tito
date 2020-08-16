import "@fortawesome/fontawesome-free/css/all.css";
import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);
//import colors from "vuetify/es5/util/colors";
import colors from "vuetify/lib/util/colors";
export default new Vuetify({
  icons: {
    iconfont: "fa"
  },
  theme: {
    themes: {
      light: {
        primary: colors.cyan.base,
        secondary: colors.teal.base,
        accent: colors.purple.base,
        error: colors.red.base,
        warning: colors.amber.base,
        info: colors.blue.base,
        success: colors.green.base
      },
      dark: {
        primary: colors.cyan.base,
        secondary: colors.teal.base,
        accent: colors.purple.base,
        error: colors.red.base,
        warning: colors.amber.base,
        info: colors.blue.base,
        success: colors.green.base
      }
    }
  }
});
