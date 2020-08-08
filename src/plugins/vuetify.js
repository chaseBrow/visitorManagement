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
                primary: '#FFFFFF', //
                secondary: '#000000', //
                accent: '#82004A',
                error: '#FF5252',
                info: colors.grey,
                success: colors.green,
                warning: colors.red,
                background: '#000000',
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
