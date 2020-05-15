import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        light:true,
        dark:false,

        themes:{
            light: {
                primary: colors.blue,
                secondary: colors.blueGrey.lighten1,
                accent: colors.deepOrange.lighten2,
                error: '#FF5252',
                info: '#2196F3',
                success: '#4CAF50',
                warning: '#FFC107',
                background: '#6E9AB0',
            },
            dark: {
                primary: colors.blue,
                secondary: colors.deepOrange,
                accent: colors.lightGreen,
                error: '#FF5252',
                info: '#2196F3',
                success: '#4CAF50',
                warning: '#FFC107',
                background: '#0A162C',
            }},
        iconfont: 'md',
        icons: {
            iconfont: 'md',
        }

    },


});
