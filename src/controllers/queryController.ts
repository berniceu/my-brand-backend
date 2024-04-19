import queryModel from "../models/queryModel";
import { Request, Response } from "express";

const userQuery = async(req: Request, res: Response) => {
    try{
        const {name, email, query} = req.body;

        await queryModel.create({name, email, query});
        res.status(200).json({message: "message sent"})

    }catch(err){
        console.log(err);
        res.status(500).json({message: err});
    }
}

export default userQuery;