import { useDispatch, useSelector } from "react-redux";
import { TRootState } from "../Store/store";
import axios from "axios";
import { toast } from "react-toastify";
import { userActions } from "../Store/UserSlice";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
    const user = useSelector((state: TRootState) => state.userSlice.user);
    const dispatch = useDispatch();

    const initialFormData = { email: "", password: "" }; // Define initialFormData
    const navigate = useNavigate();
    const login = async (form: typeof initialFormData) => {
        try {
            const token = await axios.post(
                "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login",
                form,
            );
            localStorage.setItem("token", token.data);
            console.log(token.data);
            toast.success("Sign In Successful", { position: "top-center" });
            const parsedToken = JSON.parse(atob(token.data.split(".")[1]));
            axios.defaults.headers.common["x-auth-token"] = token.data;
            navigate('/home')

            const res = await axios.get(
                "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/" + parsedToken._id,);

            dispatch(userActions.login(res.data));
            console.log(res.data);

        } catch (error) {
            console.log(error);
            toast.error("Sign In Failed");
        }
    };
    return { user, login }
}


export default useAuth

