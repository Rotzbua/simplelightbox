import js from "@eslint/js";
import globals from "globals";
import {defineConfig} from "eslint/config";
import githubPlugin from 'eslint-plugin-github';
import cssPlugin from '@eslint/css';

export default defineConfig([
    {
        files: ["src/simple-lightbox.js"],
        extends: [
            js.configs.recommended,
            // js.configs.all,
            githubPlugin.getFlatConfigs().internal,
            githubPlugin.getFlatConfigs().browser,
        ],
        rules: {
            'no-var': 'warn',
            'prefer-const': 'warn',
        } ,
        languageOptions: {
            globals: {
                ...globals.builtin,
                ...globals.browser,
                ...globals.jquery,
            },
        }
    },
    // {
    //     files: ["src/simple-lightbox.scss"],
    //     extends: [
    //         cssPlugin.configs.recommended,
    //     ],
    //     plugins: {cssPlugin},
    //     language: 'css/css',
    //     languageOptions: {
    //         tolerant: true,
    //     },
    // },
]);
