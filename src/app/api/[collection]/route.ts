// src/app/api/[collection]/route.ts

import {db} from "../../../../knexfile";
import {NextRequest} from "next/server";

import {buildZodSchemaFromConfig} from "@lib/crud";
import {collections} from "@/app/sparkcms.config";
import {returnErrorResponse, returnSuccessResponse} from "@/app/api/utils";

// GET: fetch one item (if id provided) or all items
export async function GET(
    request: NextRequest,
    { params }: { params: { collection: string } }
) {
    const { collection } = await params;
    const collectionConfig = collections.find((c) => c.config.slug === collection);
    if (!collectionConfig) {
        return returnErrorResponse(404, "Collection not found");
    }

    const id = request.nextUrl.searchParams.get("id");
    if (id) {
        const item = await db(collectionConfig.config.slug).where({ id }).first();
        if (!item) {
            return returnErrorResponse(
                404,
                `${collectionConfig.config.label.singular} not found`
            );
        }
        return returnSuccessResponse(item);
    }
    const items = await db(collectionConfig.config.slug).select("*");
    return returnSuccessResponse(items);
}

// POST: create a new item
export async function POST(
    request: NextRequest,
    { params }: { params: { collection: string } }
) {
    const { collection } = await params;
    const collectionConfig = collections.find((c) => c.config.slug === collection);
    if (!collectionConfig) {
        return returnErrorResponse(404, "Collection not found");
    }

    // Build a dynamic schema from the collection's configuration
    const createOrUpdateSchema = buildZodSchemaFromConfig(collectionConfig.columns);
    try {
        const body = await request.json();
        const validationResult = createOrUpdateSchema.safeParse(body);
        if (!validationResult.success) {
            return returnErrorResponse(
                400,
                "Validation Error",
                validationResult.error.errors
            );
        }
        const items = await db(collectionConfig.config.slug)
            .insert(body)
            .returning("*");
        return returnSuccessResponse(items[0]);
    } catch (error) {
        console.error(error);
        return returnErrorResponse(400, "Validation Error");
    }
}

// PUT: update an existing item by id
export async function PUT(
    request: NextRequest,
    { params }: { params: { collection: string } }
) {
    const { collection } = params;
    const collectionConfig = collections.find((c) => c.config.slug === collection);
    if (!collectionConfig) {
        return returnErrorResponse(404, "Collection not found");
    }

    const id = request.nextUrl.searchParams.get("id");
    if (!id) {
        return returnErrorResponse(400, "ID is required");
    }

    const exists = await db(collectionConfig.config.slug).where({ id }).first();
    if (!exists) {
        return returnErrorResponse(
            404,
            `${collectionConfig.config.label.singular} not found`
        );
    }

    const createOrUpdateSchema = buildZodSchemaFromConfig(collectionConfig.columns);
    const body = await request.json();
    const validationResult = createOrUpdateSchema.safeParse(body);
    if (!validationResult.success) {
        return returnErrorResponse(
            400,
            "Validation Error",
            validationResult.error.errors
        );
    }

    const items = await db(collectionConfig.config.slug)
        .where({ id })
        .update(body)
        .returning("*");
    return returnSuccessResponse(items[0]);
}

// DELETE: delete an item by id
export async function DELETE(
    request: NextRequest,
    { params }: { params: { collection: string } }
) {
    const { collection } = params;
    const collectionConfig = collections.find((c) => c.config.slug === collection);
    if (!collectionConfig) {
        return returnErrorResponse(404, "Collection not found");
    }

    const id = request.nextUrl.searchParams.get("id");
    if (!id) {
        return returnErrorResponse(400, "ID is required");
    }

    const exists = await db(collectionConfig.config.slug).where({ id }).first();
    if (!exists) {
        return returnErrorResponse(
            404,
            `${collectionConfig.config.label.singular} not found`
        );
    }

    await db(collectionConfig.config.slug).where({ id }).del();
    return returnSuccessResponse({ id }, `${collectionConfig.config.slug} deleted`);
}
