import queryModel from "../models/queryModel";
import { Request, Response } from "express";

export const createQuery = async(req: Request, res: Response) => {
    try{
        const {name, email, query} = req.body;

        await queryModel.create({name, email, query});
        res.status(200).json({message: "message sent"})

    }catch(err){
        console.log(err);
        res.status(500).json({message: "failed to send message"});
    }
}

export const getQuery = async(req: Request, res: Response) => {
    try{
        const query = await queryModel.find({});
        res.status(200).json(query);

    } catch(err){
        console.log(err);
        res.status(500).json({message: "failed to get message"});
    }
}

