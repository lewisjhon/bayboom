const withPlugins = require("next-compose-plugins");
const withPWA = require("next-pwa");

const nextConfig = [];

module.exports = withPlugins(
    [
        [
            withPWA,
            {
                pwa: {
                    dest: 'public',
                    register: true,
                    scope: '/',
                    sw: 'sw.js',
                },
            },
        ],
        // 추가 플러그인 작성
    ],
    nextConfig,
);