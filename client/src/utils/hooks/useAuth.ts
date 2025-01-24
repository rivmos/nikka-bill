import { UserState } from "@/@types/user";
import appConfig from "@/config/app.config";
import { apiSignIn, apiSignOut, apiSignUp, apiUserSignUp } from "@/services/AuthService";
import { useAppDispatch, useAppSelector } from "@/store";
import { signInSuccess, signOutSuccess } from "@/store/slices/auth";
import { setUser } from "@/store/slices/auth/userSlice";
import { useNavigate } from "react-router";
import { addNewUser } from "@/store";

type SignInResponse = {
    token: string;
    user: UserState;
}

const useAuth = () => {

    const navigate = useNavigate();

    const { token, signedIn } = useAppSelector(state => state.auth.session);

    const dispatch = useAppDispatch();

    const handleSignIn = (data: SignInResponse) => {
        dispatch(setUser(data.user));
        dispatch(signInSuccess(data.token));
        navigate(appConfig.authenticatedEntryPath);
    }

    const signIn = async (data: { email: string, password: string }) => {
        const response = await apiSignIn<SignInResponse, { email: string, password: string }>(data);
        if (response.data) {
            handleSignIn(response.data);
        };
    }

    const signUp = async (data: UserState) => {
        const response = await apiSignUp<SignInResponse, UserState>(data);
        if (response.data) {
            handleSignIn(response.data);
        };
    }

    const userSignup = async (data: UserState) => {
        const response = await apiUserSignUp<UserState, UserState>(data);
        if(response.data){
            dispatch(addNewUser(response.data));
        }
    }

    const handleSignOut = () => {
        dispatch(signOutSuccess());
        dispatch(
            setUser({
                id: null,
                name: '',
                email: '',
                permissions: [],
                role: 'guest',
            })
        );
        navigate(appConfig.unAuthenticatedEntryPath);
    }

    const signOut = async () => {
        await apiSignOut({ token });
        handleSignOut();
    }

    return { authenticated: signedIn && token, signIn, signUp, userSignup, signOut };
};

export default useAuth;