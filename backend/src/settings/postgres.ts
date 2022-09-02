import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default (): TypeOrmModuleOptions => {
    return {
        type: 'postgres',
        synchronize: true,
        host: process.env.PG_HOST as string,
        port: Number(process.env.PG_PORT),
        database: process.env.PG_DATABASE as string,
        username: process.env.PG_USERNAME as string,
        password: process.env.PG_PASSWORD as string,
    }
}
