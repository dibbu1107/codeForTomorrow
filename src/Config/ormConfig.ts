require('dotenv').config();
import { ConnectionOptions } from 'typeorm';

const path = require('path');
var fs = require('fs');
const isCompiled = path.extname(__filename).includes('js');
let entitypath;
let node_env: any = process.env.NODE_ENV

entitypath = [`src/Entities/*.${isCompiled ? 'js' : 'ts'}`];

export default {
    type: "mysql",
    host: process.env.Host || "localhost",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    username: process.env.User || "root",
    password: process.env.Password || '',
    database: process.env.Database || "codeForTommorow",
    // ssl: ca,
    // synchronize: process.env.DB_NO_SYNC,
    // logging: process.env.DB_NO_LOGS,
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 2000,
    entities: entitypath,
    migrations: [`src/Migrations/**/*.${isCompiled ? "js" : "ts"}`],
    cli: {
        entitiesDir: "src/Entities",
        migrationsDir: "src/Migrations",
    },
} as ConnectionOptions;

