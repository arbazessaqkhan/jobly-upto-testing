import {db} from "../../../../knexfile";
import {createOrUpdateJobSchema} from "@/modules/jobs/schema";
import {NextRequest} from "next/server";
import {returnErrorResponse, returnSuccessResponse} from "@/app/api/utils";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (id) {
    const job = await db("jobs").where({ id }).first();
    if (!job) {
      return returnErrorResponse(404, "Job not found");
    }
    // If you want to return only that single job, do so here:
    return returnSuccessResponse(job);
  }
  const jobs = await db("jobs").select("*");
  return returnSuccessResponse(jobs);
}

export async function POST(request: NextRequest) {
  try {


    const body = await request.json();
    const validationResult = createOrUpdateJobSchema.safeParse(body);
    if (!validationResult.success) {
      return returnErrorResponse(400, "Validation Error", validationResult.error.errors);
    }
    const job = await db("jobs").insert(body).returning("*");

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

  const exists = await db("jobs").where({ id }).first();
  if (!exists) {
    return returnErrorResponse(404, "Job not found");
  }

  const body = await request.json();
  const validationResult = createOrUpdateJobSchema.safeParse(body);
  if (!validationResult.success) {
    return returnErrorResponse(400, "Validation Error", validationResult.error.errors);
  }

  const job = await db("jobs").where({ id }).update(body).returning("*");
  return returnSuccessResponse(job[0]);
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return returnErrorResponse(400, "ID is required");
  }

  const exists = await db("jobs").where({ id }).first();
  if (!exists) {
    return returnErrorResponse(404, "Job not found");
  }

  await db("jobs").where({ id }).del();
  return returnSuccessResponse({ id }, "Job deleted");
}
