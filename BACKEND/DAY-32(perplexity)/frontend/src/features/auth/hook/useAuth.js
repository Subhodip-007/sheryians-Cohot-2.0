
import { useDispatch } from "react-redux";
import { getUser, login, register } from "../services/auth.api";
import { setUser, setLoading, setError } from "../auth.slice";

export function useAuth() {
    const dispatch = useDispatch();

    async function handleRegister({ email, username, password }) {
        try {
            dispatch(setLoading(true));

            const data = await register({ email, username, password });

            dispatch(setUser(data.user));
            return data;

        } catch (err) {
            dispatch(setError(
                err.response?.data?.message || "Registration failed"
            ));
            throw err;

        } finally {
            dispatch(setLoading(false));
        }
    }

    // FIXED
    async function handleLogin({ email, password }) {
        try {
            dispatch(setLoading(true));

            const data = await login({ email, password });

            dispatch(setUser(data.user));

            return data;

        } catch (err) {
            dispatch(setError(
                err.response?.data?.message || "Login failed"
            ));
            throw err;

        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleGetMe() {
        try {
            dispatch(setLoading(true));

            const data = await getUser();

            dispatch(setUser(data.user));

            return data;

        } catch (err) {
            dispatch(setError(
                err.response?.data?.message || "Failed to fetch user"
            ));
            throw err;

        } finally {
            dispatch(setLoading(false));
        }
    }

    return {
        handleRegister,
        handleLogin,
        handleGetMe
    };
}
