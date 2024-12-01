import {useForm} from "react-hook-form";
import Form from "../components/Form.js";
import FormRow from "../components/StyledFormRow.js";
import Input from "../components/Input.js";
import Button from "../components/Button.js";
import styled from "styled-components";
import {useState} from "react";
import Spinner from "../components/Spinner.js";
import Container from "../components/Container.js";

const Heading = styled.h1`
    padding-bottom: 30px;
`

function PaymentPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [isShowSpinner, setIsShowSpinner] = useState(false);
    const {register, handleSubmit, formState: {errors}} = useForm();

const onSubmit = async () => {
    try {
        const response = await fetch('http://localhost:8081/api/paypal/create', {
            method: 'POST',
            // headers: {
            //     'Content-Type': 'application/json',
            // },
            // body: JSON.stringify(data),
          
        });
        console.log(response);

        if (response.ok) {
            // const result = await response.json();
            let linkHref = response;
            // result?.data?.links.map((link) => {
                // if (link.rel === 'approval_url') 
                linkHref = "https://api.sandbox.paypal.com/v1/payments/payment/PAYID-M5DUF2I6TX34267DH676553W";
                setIsLoading(true);
            // });
            // window.open(linkHref, '_self', 'noopener,noreferrer');
        } else {
            console.error('Error:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

    const handleClick = () => {
        setIsShowSpinner(true);
    }

    return (
        <Container>
            {
                isLoading && isShowSpinner ? <Spinner/> : <> <Heading>David Store</Heading>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <FormRow
                            label={"Payment method"}
                            isRequired={true}
                            error={errors?.method?.message}
                        >
                            <Input
                                type="text"
                                id="method"
                                defaultValue={"Paypal"}
                                {...register('method', {required: 'Payment method is required'})}
                            />
                        </FormRow>

                        <FormRow
                            label={"Total amount"}
                            isRequired={true}
                            error={errors?.amount?.message}
                        >
                            <Input
                                type="text"
                                id="total"
                                defaultValue={"10.0"}
                                {...register('total', {required: 'Total amount is required'})}
                            />
                        </FormRow>

                        <FormRow
                            label={"Currency"}
                            isRequired={true}
                            error={errors?.currency?.message}
                        >
                            <Input
                                type="text"
                                id="currency"
                                defaultValue={"USD"}
                                {...register('currency', {required: 'Currency is required'})}
                            />
                        </FormRow>

                        <FormRow
                            label={"Description"}
                            isRequired={true}
                            error={errors?.description?.message}
                        >
                            <Input
                                type="text"
                                id="description"
                                defaultValue={"Ip15 promax from David"}
                                {...register('description', {required: 'Description is required'})}
                            />
                        </FormRow>
                        <FormRow>
                            <Button disabled={isLoading} onClick={handleClick} type={"submit"}>Pay with PayPal</Button>
                        </FormRow>
                    </Form> </>
            }
        </Container>
    )
}

export default PaymentPage;