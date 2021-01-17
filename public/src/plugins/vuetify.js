import Vue from "vue";
import Vuetify from "vuetify/lib";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
	theme: {
		light: true,
		dark: false,

		themes: {
			light: {
				primary: "#FFFFFF", //
				secondary: "#000000", //
				accent: "#2A6EBB",
				error: "#FF5252",
				info: colors.grey,
				success: colors.green,
				warning: colors.red,
				background: "#000000",
				lightAccent: "#A0CFEB"
			},
			dark: {
				primary: "#000000",
				secondary: "#FFFFFF",
				accent: "#9e1f63",
				error: "#FF5252",
				info: colors.grey,
				success: colors.green,
				warning: colors.red,
				background: "#FFFFFF"
			}
		},
		iconfont: "md",
		icons: {
			iconfont: "md"
		}
	}
});
