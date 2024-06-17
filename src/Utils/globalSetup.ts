import { FullConfig } from "@playwright/test";
import dotenv from "dotenv";

const globalSetup=async(config:FullConfig)=>{

    if(process.env.environment){
        dotenv.config({
            path:`helper/.env.${process.env.environment}`,
            override:true
        })
    }
    
    
}

export default globalSetup;