import { joiResolver } from "@hookform/resolvers/joi";
import { Button, FloatingLabel } from "flowbite-react";
import { useForm } from "react-hook-form";
import { SignInJoiSchema } from "../../validations/SigninSchema.joi";
import useAuth from "../../Hooks/useAuth";



//type SigInProps = {
// setIsLoggedIn: (isLoggedIn: boolean) => void;
//};


function SignIn() {
  const { login } = useAuth();
  

    

  const initialFormData = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: initialFormData,
    mode: "onChange",
    resolver: joiResolver(SignInJoiSchema),
  });


  const newUser = localStorage.getItem("NewUser");
  const parsedUser = newUser ? JSON.parse(newUser) : null;

  localStorage.setItem('newUser', JSON.stringify(parsedUser));




  return (

    <>
      <div className="SignInMain">
        
        {parsedUser && (<h1 className="text-3xl font-bold text-gray-800 mt-10  "> {`Welcome ${parsedUser.name.first} ${parsedUser.name.last}`} </h1>)}

        <><form
          className="m-auto mt-20 flex w-2/5 flex-col gap-4 rounded-lg p-4 shadow-lg"
          onSubmit={handleSubmit(login)}
        >
          <h1 className="text-2xl font-bold text-gray-800">Sign In</h1>
          <FloatingLabel
            type="email"
            variant="outlined"
            label="Email"
            {...register("email")}
            color={errors["email"] ? "error" : "success"} />
          <span className="text-sm text-red-500">{errors["email"]?.message}</span>

          <FloatingLabel
            type="password"
            variant="outlined"
            label="Password"
            {...register("password")}
            color={errors["password"] ? "error" : "success"} />
          <span className="text-sm text-red-500">
            {errors["password"]?.message}
          </span>

          <Button  type="submit" disabled={!isValid} >
            Sign In
          </Button>
        </form>

          <div>

          </div></>
      </div>
    </>


  )
}





export default SignIn;

// Removed the custom useNavigate function as it conflicts with the react-router-dom hook.


