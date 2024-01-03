
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import { FormModel } from "../App";

export const EditUser = ({ initialValuesProp, onUpdateUser }: { initialValuesProp: FormModel, onUpdateUser: (arg0: FormModel) => any }) => {
    const [initialValues, setInitial] = useState({ name: "", username: "", email: "" })

    useEffect(() => {
        setInitial(initialValuesProp)
    }, [initialValuesProp])

    const validateForm = (values: FormModel) => {
        const errors: any = {};
        if (!values.name) {
            errors.name = "Required";
        }

        if (!values.email) {
            errors.email = "Required";
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
            errors.email = "Invalid email address";
        }
        if (!values.username) {
            errors.username = "Required";
        }
        return errors;
    }

    return (
        <div>
            <h1>Edit user</h1>
            <Formik enableReinitialize
                onSubmit={(formData, { setSubmitting }) => {
                    onUpdateUser(formData)
                    setSubmitting(false);
                }}
                initialValues={initialValues}
                validate={validateForm}>
                {({ isSubmitting }) => (
                    <Form>
                        <Field
                            className="input"
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                        />
                        <ErrorMessage name="name" component="div" />

                        <Field
                            className="input"
                            type="email"
                            name="email"
                            placeholder="Enter email address"
                        />
                        <ErrorMessage name="email" component="div" />

                        <Field
                            className="input"
                            type="text" name="username"
                        />
                        <ErrorMessage name="username" component="div" />
                        {/* disabled={isSubmitting} */}
                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}