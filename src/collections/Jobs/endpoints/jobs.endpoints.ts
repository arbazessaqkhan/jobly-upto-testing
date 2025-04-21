import { NextResponse } from "next/server";
import { Endpoint, PayloadRequest } from "payload";

export const JobsEndpoint: Endpoint = {
    path: '/hello',
    method: 'get',
    handler: async (req: PayloadRequest) => {
        //loged in user else null
        if(req.user){

        return NextResponse.json(
            {
             message: 'Hello, world!' 
            ,
                user: req.user
            }
        );
    }
     return new Response("Unauthorized", {
        status: 401
     }) 
        // return new Response(JSON.stringify({ message: 'Hello, worldnm!' }));
    }

}