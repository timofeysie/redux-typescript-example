import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AppDispatch } from "../../app/store";
import Error from "../../components/Error";
import { Spinner } from "../../components/Spinner";
import { userLogin, LoginData } from "./authActions";
import { RootState } from "../../app/store";
const LoginScreen = () => {
    const { loading, userInfo, error, success } = useSelector(
        (state: RootState) => state.auth
    );
    const dispatch: AppDispatch = useDispatch();
    const { register, handleSubmit } = useForm<LoginData>();
    const navigate = useNavigate();

    // redirect authenticated user to profile screen
    useEffect(() => {
        if (userInfo) {
            navigate("/user-profile");
        }
    }, [navigate, userInfo]);

    const submitForm = (data: LoginData) => {
        dispatch(userLogin(data));
    };

    return (
        <form onSubmit={handleSubmit(submitForm)}>
            {error && <Error>{error}</Error>}
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
            <button type="submit" className="button" disabled={loading}>
                {loading ? <Spinner /> : "Login"}
            </button>
        </form>
    );
};
export default LoginScreen;
