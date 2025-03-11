// src/modules/jobs/components/JobFormModal.tsx
"use client";

import React from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {Job, createOrUpdateJobSchema} from "../jobs.schema";
import {ServerError} from "@lib/util";
import FormField from "@lib/form/FormField";
import {CommonButton} from "@lib/common/CommonButton";
import {CommonFieldTypes} from "@lib/crud";


type Props = {
    defaultValues: z.infer<typeof createOrUpdateJobSchema>;
    editJob: (Job & CommonFieldTypes) | null;
    onSubmit: (data: Job, closeButtonRef?: React.RefObject<HTMLButtonElement | null> ) => void;
    onServerError?: (error: ServerError) => void;
    loading: boolean;
};

export default function JobFormModal({ defaultValues, editJob, onSubmit, loading }: Props) {
    const form = useForm<z.infer<typeof createOrUpdateJobSchema>>({
        resolver: zodResolver(createOrUpdateJobSchema),
        defaultValues,
    });
    const closeButtonRef = React.useRef<HTMLButtonElement>(null);

    // Whenever editJob changes, reset the form
    React.useEffect(() => {
        if (editJob) {
            form.reset({
               ...editJob
            });
        } else {
            form.reset(defaultValues);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editJob]);

    const handleFormSubmit: SubmitHandler<z.infer<typeof createOrUpdateJobSchema>> = async (data) => {
      console.log("handleFormSubmit", data);
      onSubmit(data, closeButtonRef);
      form.reset(defaultValues)
    };

    return (
        <div
            className="modal fade"
            id="formModal"
            tabIndex={-1}
            aria-labelledby="jobModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            form.handleSubmit(handleFormSubmit)();
                        }}
                    >
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="jobModalLabel">
                                {editJob ? "Edit" : "Create"} Job
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                ref={closeButtonRef}
                            />
                        </div>
                        <div className="modal-body">
                            <FormField
                                label="Title"
                                type="text"
                                placeholder="Enter title"
                                name="title"
                                register={form.register}
                                error={form.formState.errors.title}
                                loading={loading}
                            />
                            <FormField
                                label="Description"
                                type="textarea"
                                placeholder="Enter description"
                                name="description"
                                register={form.register}
                                error={form.formState.errors.description}
                                loading={loading}
                            />
                            <FormField
                                label="Location"
                                type="select"
                                placeholder="Select location"
                                name="location"
                                register={form.register}
                                error={form.formState.errors.location}
                                  loading={loading}
                                options={[
                                    { value: "Remote", label: "Remote" },
                                    { value: "Onsite", label: "Onsite" },
                                    { value: "Hybrid", label: "Hybrid" },
                                ]}
                            />
                            <FormField
                                label="Salary"
                                type="number"
                                placeholder="Enter salary"
                                name="salary"
                                register={form.register}
                                error={form.formState.errors.salary}
                                loading={loading}
                                valueAsNumber
                            />
                            <FormField
                                label="Is Active"
                                type="checkbox"
                                name="is_active"
                                placeholder="Is Active"
                                error={form.formState.errors.is_active}
                                  loading={loading}
                                register={form.register}
                            />
                        </div>
                        <div className="modal-footer">
                            <CommonButton loading={loading} data-bs-dismiss="modal" variant={"secondary"}>
                                Cancel
                            </CommonButton>

                            <CommonButton loading={loading}>
                                {editJob ? "Update" : "Save"}
                            </CommonButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
