import { Request, Response } from "express";
import { IUser, User } from "../../../models/User";

export default async (req: Request, res: Response) => {

    try {

        const { user } = req.body.data;
        const password = user.password;
        const email= user.email;

        const query = {
            email,
            password
        };

        if (email && password) {

            await new Promise<void>((resolve) => {

                User.findOne(query, (error:string, response: IUser) => {

                    if (error) {

                        res.status(500).send({ text: "Database ile bağlantı kurulamadı", status: "failed" });
                        resolve();
                    }

                    if (response !== null) {

                        req.session.loggedIn = true;
                        // @ts-ignore
                        req.session.user = response;

                        res.status(200).send({ username:response.name,status:'online',text:"Giriş Yaptı."});
                        resolve();

                    } else {

                        res.status(403).send({ text: "Parola veya şifre hatalı", status: "failed" });
                        resolve();

                    }

                });

            });

        } else {

            res.status(403).send({ text: "Parola veya şifre hatalı", status: "failed" });

        }

    } catch (e) {

        const message = e.message;
        res.status(500).send({ text: message, status: "failed" });

    }

};
