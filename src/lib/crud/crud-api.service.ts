import {CommonFields, ServerError, SuccessResponse} from "@lib/util";



export class CrudApiService<ITEM> {
    private endpoint = `/api/${this.resource}`;



    constructor(public resource: string) {
    }

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

    public async createItem(item: ITEM): Promise<SuccessResponse<ITEM & CommonFields>> {
        const response = await fetch(this.endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item),
        });
        return this.handleResponse<ITEM & CommonFields>(response);
    }

    public async updateItem(id: number, item: ITEM): Promise<SuccessResponse<ITEM & CommonFields>> {
        const response = await fetch(`${this.endpoint}?id=${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item),
        });
        return this.handleResponse<ITEM & CommonFields>(response);
    }

    public async deleteItem(id: number): Promise<SuccessResponse<{ id: number }>> {
        const response = await fetch(`${this.endpoint}?id=${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
        return this.handleResponse<{ id: number }>(response);
    }

    public async getItems(): Promise<SuccessResponse<(ITEM & CommonFields)[]>> {
        const response = await fetch(this.endpoint);
        return this.handleResponse<(ITEM & CommonFields)[]>(response);
    }
}