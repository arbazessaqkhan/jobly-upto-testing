import {fireEvent, render, screen} from "@testing-library/react";
import {BUTTON_VARIANTS, ButtonVariantsType, CommonButton} from "@lib/common/CommonButton/CommonButton";
import {faker} from  "@faker-js/faker"
describe('CommonButton', () => {


    test('Should render correctly with default classes and attributes', () => {
       render(<CommonButton>Cyber Spark </CommonButton>);
       // expect(screen.getByText("Cyber Spark")).toBeInTheDocument();
            const buttonElement = screen.getByText("Cyber Spark");
            expect(buttonElement).toBeInTheDocument();
            expect(buttonElement).toHaveClass("btn-primary");
            expect(buttonElement).toHaveAttribute("type", "button");
            expect(buttonElement).not.toBeDisabled();
    })

    test("check if button variant changes by setting random variant", () => {
        const randomVariant = faker.helpers.arrayElement(BUTTON_VARIANTS);
        render(<CommonButton variant={randomVariant}>Cyber Spark </CommonButton>);
        const buttonElement = screen.getByText("Cyber Spark");
        expect(buttonElement).toHaveClass("btn-"+randomVariant);

    })

    // loop through all the variants and check if the button has the correct class
    for (const variant in BUTTON_VARIANTS) {
        test(`check if button variant changes by setting ${variant}`, () => {
            render(<CommonButton variant={variant as ButtonVariantsType}>Cyber Spark </CommonButton>);
            const buttonElement = screen.getByText("Cyber Spark");
            expect(buttonElement).toHaveClass("btn-"+variant);
        })
    }

    test("check if button renders a spinner and disables button when loading is true", () => {
        const onClick= jest.fn();
        render(<CommonButton loading={true} onClick={onClick}>Cyber Spark </CommonButton>);
        const buttonElement = screen.getByText("Cyber Spark");
        expect(buttonElement).toBeDisabled();
        // const  spinnerElement = screen.getByRole("spinner");
        const  spinnerElement = buttonElement.querySelector(".spinner-border");
        expect(spinnerElement).toBeInTheDocument();
        fireEvent.click(buttonElement);
        expect(onClick).not.toHaveBeenCalled();
    });

    test("check if button renders a spinner and disables button when disabled is true", () => {
        const onClick= jest.fn();
        render(<CommonButton disabled={true} onClick={onClick}>Cyber Spark </CommonButton>);
        const buttonElement = screen.getByText("Cyber Spark");
        expect(buttonElement).toBeDisabled();
        fireEvent.click(buttonElement);
        expect(onClick).not.toHaveBeenCalled();
    });


    test("renders suffix icon if provided", ()=>{
        render(<CommonButton prefixIcon={"la-home"} >Cyber Spark </CommonButton>);
        const buttonElement = screen.getByText("Cyber Spark");

        const iconElement = buttonElement.querySelector("i");
        expect(iconElement).toBeInTheDocument();
        expect(iconElement).toHaveClass("las");

    })


})