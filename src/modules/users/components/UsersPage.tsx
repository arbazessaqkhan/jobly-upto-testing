// src/modules/users/components/UsersPage.tsx
"use client";
import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {User, UserDto} from "../users.schema";
import UserFormModal from "./UserFormModal";
import {ZodIssueBase} from "zod";
import {UsersService} from "@/modules/users/users.service";
import {ServerError} from "@lib/util";

export default function UsersPage() {
    const [users, setUsers] = useState<UserDto[]>([]);
    const [editUser, setEditUser] = useState<UserDto | null>(null);

    const usersService = new UsersService('users');

    // Default values for creation
    const defaultValues: User = {
        name: "",
        email: "",
        password: ""
    };

    const fetchUsers = async () => {
        try {
            const response = await usersService.getItems();
            if (response.success) {
                setUsers(response.data);
            }
        } catch (err) {
            console.error("Failed to fetch users:", err);
            toast.error("Failed to fetch users");
        }
    };

    useEffect(() => {
        fetchUsers();
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
            const response = await usersService.deleteItem(id);
            if (response.success) {
                setUsers((prev) => prev.filter((job) => job.id !== id));
            }
        } catch (error: unknown) {
            console.error("Failed to delete job:", error);
            toast.error(error?.["message"] || "Failed to delete job");
        }
    };

    const onEdit = (job: UserDto) => {
        setEditUser(job);
    };

    const onSubmit = async (data: User , closeButtonRef?: React.RefObject<HTMLButtonElement | null>) => {
        // If there's an editUser, we’re updating; otherwise, we’re creating.
        if (!editUser) {
            try {
                const createResponse = await usersService.createItem(data as User);
                setUsers((prev) => [...prev, createResponse.data]);
                toast.success("User created successfully");
                hideModal(closeButtonRef);

            } catch (error) {
                handleServerValidation(error as ServerError);
            }
        } else {
            try {
                const updateResponse = await usersService.updateItem(editUser.id, data as User);
                setUsers((prev) =>
                    prev.map((j) => (j.id === updateResponse.data.id ? updateResponse.data : j))
                );
                setEditUser(null);
                toast.success("User updated successfully");
            } catch (error) {
                handleServerValidation(error as ServerError);
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
                    Users <span className="text-muted">({users.length})</span>
                </h1>
                <button
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#formModal"
                    onClick={() => setEditUser(null)} // to clear the form in the modal
                >
                    Create
                </button>
            </div>

            <UserFormModal
                defaultValues={defaultValues}
                editUser={editUser}
                onSubmit={onSubmit}
            />

            <UsersTable users={users} onEdit={onEdit} onDelete={onDelete} />
        </section>
    );
}



type UsersTableProps = {
    users: UserDto[];
    onEdit: (job: UserDto) => void;
    onDelete: (id: number) => void;
};

function UsersTable({ users, onEdit, onDelete }: UsersTableProps) {
    return (
        <table className="table table-striped table-bordered">
            <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user) => (
                <tr key={user.id} data-testid={`user-row-${user.id}`}>
                    <td data-testid={`user-name-${user.id}`}>{user.name}</td>
                    <td data-testid={`user-email-${user.id}`}>{user.email}</td>
                    <td data-testid={`user-password-${user.id}`}>{user.password}</td>
                    <td>
                        <button
                            className="btn btn-primary me-2"
                            data-testid={`edit-button-${user.id}`}
                            data-bs-toggle="modal"
                            data-bs-target="#formModal"
                            onClick={() => onEdit(user)}

                        >
                            Edit
                        </button>
                        <button
                            className="btn btn-danger"
                            data-testid={`delete-button-${user.id}`}
                            onClick={() => {
                                if (
                                    window.confirm("Are you sure you want to delete this user?")
                                ) {
                                    onDelete(user.id);
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
