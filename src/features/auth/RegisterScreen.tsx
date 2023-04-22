import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AppDispatch } from "../../app/store";
import Error from "../../components/Error";
import { Spinner } from "../../components/Spinner";
import { registerUser } from "./authActions";
import { RootState } from "../../app/store";

interface RegisterData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const RegisterScreen = () => {
    const { loading, userInfo, error, success } = useSelector(
        (state: RootState) => state.auth
    );
    const dispatch: AppDispatch = useDispatch();
    const { register, handleSubmit } = useForm<RegisterData>();
    const navigate = useNavigate();

    useEffect(() => {
        // redirect user to login page if registration was successful
        if (success) navigate("/login");
        // redirect authenticated user to profile screen
        if (userInfo) navigate("/users/" + userInfo.userId);
    }, [navigate, userInfo, success]);

    const submitForm = (data: RegisterData) => {
        // check if passwords match
        if (data.password !== data.confirmPassword) {
            alert("Password mismatch");
        }
        // transform email string to lowercase to avoid case sensitivity issues in login
        data.email = data.email.toLowerCase();
        console.log("data", data);
        dispatch(registerUser(data));
    };
    return (
        <form onSubmit={handleSubmit(submitForm)}>
            {error && <Error>{error}</Error>}
            <div className="form-group">
                <label htmlFor="name">First Name</label>
                <input
                    type="text"
                    className="form-input"
                    {...register("name", { required: true })}
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
