import { Request, Response } from "express";

export default {
    
    "get": async function (req: Request, res: Response): Promise<void> {

        res.render("./_templates/home.html");

    }
};
