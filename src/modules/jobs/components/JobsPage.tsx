// src/modules/jobs/components/JobsPage.tsx
"use client";
import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {Job} from "../jobs.schema";
import JobFormModal from "./JobFormModal";
import {ZodIssueBase} from "zod";
import {ServerError} from "@lib/util";
import {CommonFieldTypes, CrudApiService} from "@lib/crud";
import {CommonButton} from "@lib/common/CommonButton";
type JobDto = Job & CommonFieldTypes
export default function JobsPage() {
    const [jobs, setJobs] = useState<JobDto[]>([]);
    const [editJob, setEditJob] = useState<JobDto | null>(null);

    const jobsService = new CrudApiService<Job>('jobs');

    const [loading, setLoading] = useState(false);

    // Default values for creation
    const defaultValues: Job = {
        title: "",
        description: "",
        salary: 0,
        is_active: true,
        location: "Remote",
    };

    const fetchJobs = async () => {
        try {
            const response = await jobsService.getItems();
            const jobs = response.data as unknown as JobDto[];
            if (response.success) {
                setJobs(jobs);
            }
        } catch (err) {
            console.error("Failed to fetch jobs:", err);
            toast.error("Failed to fetch jobs");
        }
    };

    useEffect(() => {
        fetchJobs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleServerValidation = (serverError: ServerError) => {
        if (serverError.message) {
            toast.error(serverError.message);
        }
        // In a real form scenario, you can integrate serverError.validationErrors
        // with react-hook-form. For now, we just show a toast or handle otherwise.
        serverError?.validationErrors?.forEach((error: ZodIssueBase) => {
            toast.error(error.message);
        });
    };

    const onDelete = async (id: number) => {
        try {
            const response = await jobsService.deleteItem(id);
            if (response.success) {
                setJobs((prev) => prev.filter((job) => job.id !== id));
            }
        } catch (error: unknown) {
            console.error("Failed to delete job:", error);
            toast.error(error?.["message"] || "Failed to delete job");
        }
    };

    const onEdit = (job: JobDto) => {
        setEditJob(job);
    };

    const onSubmit = async (data: Job , closeButtonRef?: React.RefObject<HTMLButtonElement | null>) => {
        // If there's an editJob, we’re updating; otherwise, we’re creating.
        if (!editJob) {
            try {
                setLoading(true);
                const createResponse = await jobsService.createItem(data as Job);
                const job = createResponse.data as unknown as JobDto;
                setJobs((prev) => [...prev, job]);
                toast.success("Job created successfully");
                hideModal(closeButtonRef);

            } catch (error) {
                handleServerValidation(error as ServerError);
            } finally {
                setLoading(false);
            }
        } else {
            try {
                setLoading(true);
                const updateResponse = await jobsService.updateItem(editJob.id, data as Job);
                const job = updateResponse.data as unknown as JobDto;
                setJobs((prev) =>
                    prev.map((j) => (j.id === job.id ? job : j))
                );
                setEditJob(null);
                toast.success("Job updated successfully");
            } catch (error) {
                handleServerValidation(error as ServerError);
            } finally {
                setLoading(false);
            }
        }
    };


    function hideModal(closeButtonRef?: React.RefObject<HTMLButtonElement | null>) {
        if (closeButtonRef?.current) {
            closeButtonRef.current.click();
        }
    }

    return (
        <section className="container my-4">
            <div className="d-flex gap-4 align-items-center mb-4">
                <h1 className="m-0">
                    Jobs <span className="text-muted">({jobs.length})</span>
                </h1>
                {/*<button*/}
                {/*    className="btn btn-primary"*/}
                {/*    data-bs-toggle="modal"*/}
                {/*    data-bs-target="#formModal"*/}
                {/*    onClick={() => setEditJob(null)} // to clear the form in the modal*/}
                {/*>*/}
                {/*    Create*/}
                {/*</button>*/}

                <CommonButton
                    loading={loading}
                    data-bs-toggle="modal"
                    data-bs-target="#formModal"
                    onClick={() => setEditJob(null)}
                    prefixIcon={'la-plus'}
                    suffixIcon={'la-home'}
                >
                    Create
                </CommonButton>
            </div>

            <JobFormModal
                defaultValues={defaultValues}
                editJob={editJob}
                loading={loading}
                onSubmit={onSubmit}
            />

            <JobsTable jobs={jobs} onEdit={onEdit} onDelete={onDelete} />
        </section>
    );
}



type JobsTableProps = {
    jobs: JobDto[];
    onEdit: (job: JobDto) => void;
    onDelete: (id: number) => void;
};

function JobsTable({ jobs, onEdit, onDelete }: JobsTableProps) {
    return (
        <table className="table table-striped table-bordered">
            <thead>
            <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Location</th>
                <th>Salary</th>
                <th>Activated</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {jobs.map((job) => (
                <tr key={job.id} data-testid={`job-row-${job.id}`}>
                    <td data-testid={`job-title-${job.id}`}>{job.title}</td>
                    <td data-testid={`job-description-${job.id}`}>{job.description}</td>
                    <td data-testid={`job-location-${job.id}`}>{job.location}</td>
                    <td data-testid={`job-salary-${job.id}`}>{job.salary}</td>
                    <td data-testid={`job-active-${job.id}`}>
                        {job.is_active ? "Yes" : "No"}
                    </td>
                    <td data-testid={`job-created-${job.id}`}>
                        {new Date(job.created_at).toLocaleDateString()}
                    </td>
                    <td data-testid={`job-updated-${job.id}`}>
                        {new Date(job.updated_at).toLocaleDateString()}
                    </td>
                    <td>
                        <button
                            className="btn btn-primary me-2"
                            data-testid={`edit-button-${job.id}`}
                            data-bs-toggle="modal"
                            data-bs-target="#formModal"
                            onClick={() => onEdit(job)}

                        >
                            Edit
                        </button>
                        <button
                            className="btn btn-danger"
                            data-testid={`delete-button-${job.id}`}
                            onClick={() => {
                                if (
                                    window.confirm("Are you sure you want to delete this job?")
                                ) {
                                    onDelete(job.id);
                                }
                            }}


                        >
                            Delete
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}
