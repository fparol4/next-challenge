const environments = {
    PRODUCTION: '.env.production',
    DEVELOPMENT: '.env.development',
}

const env = process.env.ENV
export const file = environments[env] || environments.DEVELOPMENT