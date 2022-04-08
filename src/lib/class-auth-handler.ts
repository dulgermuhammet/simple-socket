/* eslint-disable consistent-return */

import { WebAuthHandler } from "./class-web-auth-handler";

type AuthHandlerType = "web"

export class AuthHandler {

    constructor(type: AuthHandlerType) {

        switch (type) {

            case "web":

                return new WebAuthHandler();

            default:
                break;

        }

    }

}
