// ItemCrudFormModal.test.tsx
import {render, screen} from "@testing-library/react";
import ItemCrudFormModal from "./ItemCrudFormModal";
import {Job, jobCollection} from "@/app/jobs.schema";
import {CommonFieldTypes} from "@lib/crud";
import userEvent from "@testing-library/user-event";


const defaultValues: Job = {
    title: "",
    description: "",
    salary: 0,
    location: "Remote",
    is_active: false,
}
describe('Item CurudFormModal', () => {

    it('Should render correctly', () => {
        render(<ItemCrudFormModal defaultValues={defaultValues} editItem={null} onSubmit={jest.fn}  collectionConfig={jobCollection}/>)

        const element = screen.getByText(/create Job/i);
        expect(element).toBeInTheDocument()

        const titleElement = screen.getByPlaceholderText(/Enter Title/i);
        expect(titleElement).toBeInTheDocument();
        const descriptionElement = screen.getByPlaceholderText(/Enter Description/i);
        expect(descriptionElement).toBeInTheDocument();
        const salaryElement = screen.getByPlaceholderText(/Enter Salary/i);
        expect(salaryElement).toBeInTheDocument();
        const checkBoxElement: HTMLInputElement = screen.getByRole("checkbox", { name: /is active/i, hidden: true });
        expect(checkBoxElement).toBeInTheDocument();
        const submitButton = screen.getByRole("button", { name: /save/i , hidden: true });
        expect(submitButton).toBeInTheDocument()
    });

    it('should populate the form fields in edit mode',async () => {
        const editJob: Job & CommonFieldTypes = {
            id: 1,
            title: "React Developer",
            description: "Unique opportunity to work on a cutting-edge project",
            salary: 2000,
            location: "Remote",
            is_active: true,
            created_at: '2021-09-01T00:00:00.000Z',
            updated_at: '2021-09-01T00:00:00.000Z',
        };

        const onSubmit = jest.fn();
        render(
            <ItemCrudFormModal
                defaultValues={defaultValues}
                editItem={editJob}
                onSubmit={onSubmit}
                loading={false}
                collectionConfig={jobCollection}
            />);

        expect(screen.getByDisplayValue(editJob.title)).toBeInTheDocument();
        expect(screen.getByDisplayValue(editJob.description)).toBeInTheDocument();
        expect(screen.getByDisplayValue(editJob.salary)).toBeInTheDocument();
        expect(screen.getByDisplayValue(editJob.location)).toBeInTheDocument();

        const checkBoxElement = screen.getByRole("checkbox", { name: /is active/i, hidden: true });
        expect(checkBoxElement).toBeInTheDocument()
        expect(checkBoxElement).toBeChecked()

        const submitButton = screen.getByRole("button", { name: /update/i , hidden: true });
        expect(submitButton).toBeInTheDocument()
        await userEvent.click(submitButton);
        // fireEvent.click(submitButton);
        expect(onSubmit).toHaveBeenCalled()
    });


    it('should populate the form fields in create mode',async () => {
        const createJob: Job  = {
            title: "React Developer",
            description: "Unique opportunity to work on a cutting-edge project",
            salary: 2000,
            location: "Remote",
            is_active: true
        };

        const onSubmit = jest.fn();
        render(
            <ItemCrudFormModal
                defaultValues={defaultValues}
                editItem={null}
                onSubmit={onSubmit}
                loading={false}
                collectionConfig={jobCollection}
            />);


        const titleElement = screen.getByPlaceholderText(/Enter Title/i);
        expect(titleElement).toBeInTheDocument();
        await userEvent.clear(titleElement);
        await userEvent.type(titleElement, createJob.title);



        const descriptionElement = screen.getByPlaceholderText(/Enter Description/i);
        expect(descriptionElement).toBeInTheDocument();
        await userEvent.clear(descriptionElement);
        await userEvent.type(descriptionElement, createJob.description);


        const salaryElement = screen.getByPlaceholderText(/Enter Salary/i);
        expect(salaryElement).toBeInTheDocument();
        await userEvent.clear(salaryElement);
        await userEvent.type(salaryElement, createJob.salary.toString());


        const checkBoxElement: HTMLInputElement = screen.getByRole("checkbox", { name: /is active/i, hidden: true });

        if (createJob.is_active && !checkBoxElement.checked) {
            await userEvent.click(checkBoxElement);
        }


        const submitButton = screen.getByRole("button", { name: /save/i , hidden: true });
        expect(submitButton).toBeInTheDocument()
        await userEvent.click(submitButton);
        expect(onSubmit).toHaveBeenCalled()
        expect(onSubmit).toHaveBeenCalledWith(createJob, expect.any(Object));
    });


})