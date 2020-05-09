module.exports = {
    root: true,
    parser: 'babel-eslint',
    // https://github.com/hhru/eslint-config-hh
    extends: [
        'prettier',
        'prettier/standard',
        'plugin:jest/recommended',
        'plugin:react/recommended',
        '@hh.ru/eslint-config',
    ],
    plugins: ['prettier', 'babel'],
    rules: {
        'react/prop-types': 'off',
        'prettier/prettier': ['error'],
        'import/extensions': ['error', 'never', { svg: 'always', less: 'always', css: 'always' }],
        'no-unused-expressions': 'off',
        'babel/no-unused-expressions': ['error', { allowShortCircuit: true }],
    },
    settings: {
        'import/resolver': {
            webpack: {
                config: 'config/webpack.config.js',
            },
        },
    },
    ignorePatterns: ['!.*.js', '/config/', '/scripts'],
};
