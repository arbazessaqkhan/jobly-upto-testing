//src/modules/jobs/jobs.service.ts

import {CrudApiService} from "@lib/crud";
import {Job, JobDto} from "./jobs.schema";

export class JobsService extends CrudApiService<JobDto, Job>{

}
