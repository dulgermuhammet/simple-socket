import { Request, Response } from "express";
import { IUser, User } from "../../../models/User";

export default async (req: Request, res: Response) => {


    const errors = [];
    const { user } = req.body.data;
    //console.log(user);
    const passwordRepeat = user.passwordRepeat;
    const password = user.password;
    const name = user.username;
    const lastName=  user.lastname;

    const userData = {  
        name,
        lastName,
        password,
        email: user.email,
        language: user.language,
        country: user.country,
        online:true,
    };
   

    const emailStatus = await new Promise((resolve, reject) => {

        return User.findOne({email:user.email}, (e: string, response: IUser) => {

            if (e) {

                reject(e);

            }

            resolve(response);

        });

    });

    if (emailStatus != null) {

        errors.push("Mail Adresi kayıtlı");
    }

    if (passwordRepeat !== password ) {

        errors.push("Şifreler uyumlu değil");
    }

    if (password.length < 8 ) {

        errors.push("Şifre en az 8 hane olmalıdır.");
    }

    if (name.length < 2) {

        errors.push("Lütfen bir isim giriniz.");
    }

    if (lastName.length < 2) {

        errors.push("Lütfen bir soyisim giriniz.");
    }

    if(errors.length > 0 ){

        const error = JSON.stringify(errors);
    
        return res.status(500).send({ text: error, status: "failed" });

    }

  

    try {

       const user = await new Promise<IUser>((resolve, reject) => {

            User.create(userData, (e, response: IUser) => {

                if (e) {

                    reject(e);

                }

                resolve(response);

            });

        });

        req.session.loggedIn = true;
        // @ts-ignore
        req.session.user = user;

        res.status(200).send({username:user.name,status:'online',text:"Kayıt Oldu." });

    } catch (e) {

        const message = e.message;

        res.status(500).send({ text: message, status: "failed" });

    }

};
