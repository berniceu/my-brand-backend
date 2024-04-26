import { Request, Response } from "express";
import nodemailer from "nodemailer";
import SubscribeModel from "../models/subscribeModel";
import dotenv from 'dotenv';

dotenv.config();
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.user,
      pass: process.env.password,
    },

    tls: {
        rejectUnauthorized: false,
    }
  });

  export const Subscribe = async(req: Request, res: Response) =>{
    try{
        const { email } = req.body;

        await transporter.sendMail({
            from: "berniceuwituze@gmail.com",
            to: email,
            subject: "Welcome to my Blog newsletter",
            html:`<p>Thank you for subscribing to my newsletter, you will be alerted when new blogs are posted!!
            <p>Kind Regards,</p>
            <p>Bernice Uwituze</p>`
        });

        res.status(200).json({message: "Mail sent successfully"});
        SubscribeModel.create({ email });
    } catch(err){
        console.log(err);
        res.status(500).json( {message: "Failed to send email"})
    }
  }




