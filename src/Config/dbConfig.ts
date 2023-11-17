import { Connection, createConnection } from "typeorm";
import ormConfig from "./ormConfig";

export const DBConnect = async () => {
    let connection: Connection | undefined;

    try {
        if (connection) {
            if (!connection.isConnected) {
                await connection.connect();
            }
        } else {
            console.log(ormConfig)
            await createConnection(ormConfig);
        }
        console.log("👍 Mysql connection was successful!");

    } catch (e) {
        console.log(e,">>>>>>>>>>>>")
        console.error('👎 ERROR: Database connection failed!!', "\n\n", e);
    }
};

export const TryDBConnect = async (onError: Function, next?: Function) => {
    try {
        await DBConnect();
        if (next) {
            next();
        }
    } catch (e) {
        console.log(e,">>>>>>>>>>")
        onError();
    }
};
