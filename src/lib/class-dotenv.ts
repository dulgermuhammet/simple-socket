import dotenv from "dotenv";
import path from "path";
import settings from "../config/settings";
class DotEnv {

    static loader(){

        const env = settings.environment ;

        return dotenv.config({ path: path.join( __dirname, `../../.env.${env}` ) });

    }
}

export default DotEnv;