import {NextRequest} from "next/server";
import {returnErrorResponse, returnSuccessResponse} from "@/app/api/utils";
import {db} from "../../../../knexfile";


export async function POST(
    request: NextRequest
) {
    try {
        const body = await request.json();

        const user = await db("users").where({ email: body.email, password: body.password }).first();
        if (!user) {
            return returnErrorResponse(401, "Invalid email or password");
        }

        return returnSuccessResponse(user);



    }catch  {

        return returnErrorResponse(401, "Validation Error");

    }

}