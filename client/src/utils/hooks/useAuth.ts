import { UserState } from "@/@types/user";
import { apiSignIn, apiSignUp } from "@/services/AuthService";
import { useAppDispatch } from "@/store";
import { setUser } from "@/store/slices/auth/authSlice";

const useAuth = () => {

    const dispatch = useAppDispatch();

    const signIn = async (data: { email: string, password: string }) => {
        const response = await apiSignIn<UserState, { email: string, password: string }>(data);
        if (response.data) {
            dispatch(setUser(response.data));
        };
    }

    const signUp = async (data: UserState) => {
        const response = await apiSignUp<UserState, UserState>(data);
        if (response.data) {
            dispatch(setUser(response.data));
        };
    }

    return { signIn, signUp };
};

export default useAuth;