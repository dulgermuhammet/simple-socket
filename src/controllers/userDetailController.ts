import { Request, Response } from "express";

export default {

  "get": async function (req: Request, res: Response): Promise<void> {

    const { user } = req.session;

    res.render("./_templates/user-detail.html", {
      ...user
    });

  }
};
