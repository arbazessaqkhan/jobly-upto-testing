//src/modules/jobs/jobs.service.ts
"use client";

// src/modules/jobs/schema.ts
import {CreateJobDto, JobDto, ServerError, SuccessResponse, UpdateJobDto} from "@/modules/jobs/schema";


// Helper responses (unchanged)
export class JobsService {
    private endpoint = `${process.env.BASE_API_URL}/jobs`;

    /**
     * Handle JSON parsing & error standardization.
     */
    private async handleResponse<T>(response: Response): Promise<SuccessResponse<T>> {
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            const errorData = data as ServerError;
            throw new ServerError(
                response.status,
                errorData.message,
                false,
                errorData.validationErrors
            );
        }
    }

    public async createJob(job: CreateJobDto): Promise<SuccessResponse<JobDto>> {
        const response = await fetch(this.endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(job),
        });
        return this.handleResponse<JobDto>(response);
    }

    public async updateJob(id: number, job: UpdateJobDto): Promise<SuccessResponse<JobDto>> {
        const response = await fetch(`${this.endpoint}?id=${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(job),
        });
        return this.handleResponse<JobDto>(response);
    }

    public async deleteJob(id: number): Promise<SuccessResponse<{ id: number }>> {
        const response = await fetch(`${this.endpoint}?id=${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
        return this.handleResponse<{ id: number }>(response);
    }

    public async getJobs(): Promise<SuccessResponse<JobDto[]>> {
        const response = await fetch(this.endpoint);
        return this.handleResponse<JobDto[]>(response);
    }
}
