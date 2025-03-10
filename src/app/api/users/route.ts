import {db} from "../../../../knexfile";
import {createOrUpdateUserSchema} from "@/modules/users/users.schema";
import {NextRequest} from "next/server";
import {returnErrorResponse, returnSuccessResponse} from "@/app/api/utils";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (id) {
    const job = await db("users").where({ id }).first();
    if (!job) {
      return returnErrorResponse(404, "User not found");
    }
    // If you want to return only that single job, do so here:
    return returnSuccessResponse(job);
  }
  const users = await db("users").select("*");
  return returnSuccessResponse(users);
}

export async function POST(request: NextRequest) {
  try {


    const body = await request.json();
    const validationResult = createOrUpdateUserSchema.safeParse(body);
    if (!validationResult.success) {
      return returnErrorResponse(400, "Validation Error", validationResult.error.errors);
    }
    const job = await db("users").insert(body).returning("*");

    return returnSuccessResponse(job[0]);
  }catch (error) {
    console.error(error)
    return returnErrorResponse(400, "Validation Error");

  }
}

export async function PUT(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return returnErrorResponse(400, "ID is required");
  }

  const exists = await db("users").where({ id }).first();
  if (!exists) {
    return returnErrorResponse(404, "User not found");
  }

  const body = await request.json();
  const validationResult = createOrUpdateUserSchema.safeParse(body);
  if (!validationResult.success) {
    return returnErrorResponse(400, "Validation Error", validationResult.error.errors);
  }

  const job = await db("users").where({ id }).update(body).returning("*");
  return returnSuccessResponse(job[0]);
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return returnErrorResponse(400, "ID is required");
  }

  const exists = await db("users").where({ id }).first();
  if (!exists) {
    return returnErrorResponse(404, "User not found");
  }

  await db("users").where({ id }).del();
  return returnSuccessResponse({ id }, "User deleted");
}
