module.exports = {
    env: {
        node: true,
        es2021: true,
        jest: true,
    },
    extends: ["airbnb-base", "prettier"],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: "module",
    },
    rules: {
        "import/prefer-default-export": "off",
        "no-underscore-dangle": "off",
        "no-throw-literal": "off"
    },
};
