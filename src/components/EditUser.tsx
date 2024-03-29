
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormModel } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../store/UserStore";


export const EditUser = () => {

    const dispatch = useDispatch();
    const initialFormValues: FormModel = useSelector((state: any) => state.UserState.initialFormValues);

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
            <Formik
                enableReinitialize
                onSubmit={(formData, { setSubmitting }) => {
                    setSubmitting(false);
                    dispatch(updateUser(formData));
                }}
                initialValues={initialFormValues}
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