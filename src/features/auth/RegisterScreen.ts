import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Error from "./Error";
import {Spinner } from "../../components/Spinner";
import { registerUser } from "../features/auth/authActions";
import { RootState } from "../store";

interface RegisterData {
    firstName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const RegisterScreen = () => {
    const { loading, userInfo, error, success } = useSelector(
        (state: RootState) => state.auth
    );
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm<RegisterData>();

    const submitForm = (data: RegisterData) => {
        // check if passwords match
        if (data.password !== data.confirmPassword) {
            alert("Password mismatch");
        }
        // transform email string to lowercase to avoid case sensitivity issues in login
        data.email = data.email.toLowerCase();
        dispatch(registerUser(data));
    };
    return (
        <form onSubmit={handleSubmit(submitForm)}>
            {error && <Error>{error}</Error>}
            <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                    type="text"
                    className="form-input"
                    {...register("firstName", { required: true })}
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    className="form-input"
                    {...register("email", { required: true })}
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    className="form-input"
                    {...register("password", { required: true })}
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Confirm Password</label>
                <input
                    type="password"
                    className="form-input"
                    {...register("confirmPassword", { required: true })}
                />
            </div>
            <button type="submit" className="button" disabled={loading}>
                {loading ? <Spinner /> : "Register"}
            </button>
        </form>
    );
};
export default RegisterScreen;
