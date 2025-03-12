import {jobCollection} from "@/app/jobs.schema";
import {userCollection} from "@/app/users.schema";
import {CollectionConfig} from "@lib/crud";
import {blogCollection} from "@/app/blogs.schema";
import {categoryCollection} from "@/app/categories.schema";

export const collections: CollectionConfig[] = [
    jobCollection,
    userCollection,
    blogCollection,
    categoryCollection
]