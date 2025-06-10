import { joiResolver } from "@hookform/resolvers/joi";
import { Button, FloatingLabel } from "flowbite-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { registerSchema } from "./Vali.joi";


import { useNavigate } from "react-router-dom";



type FormData = {
  name: { first: string, middle: string, last: string };
  email: string;
  password: string;
  phone: string;
  image: {
    url: string,
    alt: string
  };
  address: {
    state: string,
    country: string,
    city: string,
    street: string,
    houseNumber: number,
    zip: number
  };
  isBusiness: boolean
};

type SignUpProps = {
  onClose?: () => void;
}

export default function SignUp({ onClose }: SignUpProps) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,

    formState: { errors, isValid },
  } = useForm<FormData>({
    defaultValues: {
      name: { first: '', middle: '', last: '' },
      phone: '',
      email: "",
      password: "",
      image: { url: '', alt: '' },
      address: { state: '', country: '', city: '', street: '', houseNumber: 0, zip: 0, },
      isBusiness: false
    },
    mode: "onChange",
    resolver: joiResolver(registerSchema),
  });

  const submitForm = async (data: FormData) => {
    try {
      const response = await axios.post("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users", data);
      console.log("Success: אתה מחובר!");
      console.log("response:", response.data);
      localStorage.setItem('NewUser', JSON.stringify(response.data));
      navigate("/signin");
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      console.log("isValid:", isValid);
      console.log("errors:", errors);
    }

  };

  return (
    <div className='thebox'>
      <main className=" main1 flex w-3/5 mt-5">
        <form onSubmit={handleSubmit(submitForm)} className="w-full max-w-4xl mx-auto flex flex-col gap-4 bg-white p-6 rounded-xl shadow dark:bg-gray-900   ">
          <h1 className="text-3xl font-mono bg-slate-300 rounded-full text-gray-800  ">Register</h1>
          <>
            <div className="flex flex-row gap-3 first1 " >


              <FloatingLabel className=" "
                {...register("name.first")}
                variant="standard"
                label="First"
                type="text"
                color={errors.name?.first ? "error" : "success"}
              />

              {errors.name?.first && (
                <p className="text-sm text-red-500">{errors.name.first.message}</p>
              )}

              <FloatingLabel
                {...register("name.middle")}
                variant="standard"
                label="middle"
                type="text"
                color={errors.name?.middle ? "error" : "success"}
              />
              {errors.name?.middle && (
                <p className="text-sm text-red-500">{errors.name.middle.message}</p>
              )}

              <FloatingLabel
                {...register("name.last")}
                variant="standard"
                label="Last name"
                type="text"
                color={errors.name?.last ? "error" : "success"}
                className="w-full text-left"
              />
              {errors.name?.last && (
                <p className="text-sm text-red-500">{errors.name.last.message}</p>
              )}

              <FloatingLabel
                {...register("phone")}
                variant="standard"
                label="Phone"
                type="number"

                color={errors.phone ? "error" : "success"}
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>
          </>

          <div className="flex flex-row gap-3 pl-40 first2 " >
            <FloatingLabel
              {...register("image.url")}
              variant="standard"
              label="Image"
              type=''
              color={errors.image?.url ? "error" : "success"}
            />
            {errors.image?.url && (
              <p className="text-sm text-red-500">{errors.image.url.message}</p>
            )}

            <FloatingLabel
              {...register("image.alt")}
              variant="standard"
              label="Describe"
              type=''
              color={errors.image?.alt ? "error" : "success"}
            />
            {errors.image?.alt && (
              <p className="text-sm text-red-500">{errors.image.alt.message}</p>
            )}
          </div>
          <div className="flex flex-row gap-3 first3 " >
            <FloatingLabel
              {...register("address.state")}
              variant="standard"
              label="State"
              type='text'
              color={errors.address?.state ? "error" : "success"}
            />
            {errors.address?.state && (
              <p className="text-sm text-red-500">{errors.address.state.message}</p>
            )}
            <FloatingLabel
              {...register("address.country")}
              variant="standard"
              label="Country"
              type='text'
              color={errors.address?.country ? "error" : "success"}
            />
            {errors.address?.country && (
              <p className="text-sm text-red-500">{errors.address.country.message}</p>
            )}
            <FloatingLabel
              {...register("address.city")}
              variant="standard"
              label="City"
              type='text'
              color={errors.address?.city ? "error" : "success"}
            />
            {errors.address?.city && (
              <p className="text-sm text-red-500">{errors.address.city.message}</p>
            )}
            <FloatingLabel
              {...register("address.street")}
              variant="standard"
              label="Street"
              type='text'
              color={errors.address?.street ? "error" : "success"}
            />
            {errors.address?.street && (
              <p className="text-sm text-red-500">{errors.address.street.message}</p>
            )}
          </div>

          <div className="flex flex-row gap-3 pl-40  first4" >
            <FloatingLabel
              {...register("address.houseNumber")}
              variant="standard"
              label="House Number"
              type='text'
              color={errors.address?.houseNumber ? "error" : "success"}
            />
            {errors.address?.houseNumber && (
              <p className="text-sm text-red-500">{errors.address.houseNumber.message}</p>
            )}
            <FloatingLabel
              {...register("address.zip")}
              variant="standard"
              label="zip"
              type='number'
              color={errors.address?.zip ? "error" : "success"}
            />
            {errors.address?.zip && (
              <p className="text-sm text-red-500">{errors.address.zip.message}</p>
            )}
          </div>

          <FloatingLabel
            {...register("email")}
            variant="standard"
            label="Email address"
            type="email"
            color={errors.email ? "error" : "success"}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}

          <FloatingLabel
            {...register("password")}
            variant="standard"
            label="Password"
            type="password"
            color={errors.password ? "error" : "success"}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}

          <div>
            <label className=" ">
              <input
                {...register("isBusiness")}
                type="checkbox"
                className="  h-4 w-4 rounded m-auto border-gray-300 bg-gray-100 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                defaultChecked={false}
              />
              <span className=" dark:text-slate-300  text-black m-auto ml-2" >Is Business</span>
            </label>
          </div>

          <Button type="submit" className="w-full" style={{ cursor: 'pointer' }}
          >Submit</Button>

          <Button onClick={() => { reset() }} className="w-full" style={{ cursor: 'pointer' }} >
            Reset
          </Button>



        </form>


      </main>
    </div>
  );
}