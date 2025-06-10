import { useSelector } from "react-redux";
import { TRootState } from "../../Store/store";
import { Card } from "flowbite-react";






const Profile = () => {
  const user = useSelector((state: TRootState) => state.userSlice.user);

  return (
    <Card

      className="1875rem  mb-3 200px justify-content-center fontfamily: 'Poppins', sans-serif mx-auto mt-10 flex max-w-sm rounded-lg border border-gray-200 bg-white text-center shadow dark:border-gray-700 dark:bg-gray-800"
      imgAlt="Profile Image"

    >
      <img className="h-25 w-25 m-auto" src={user?.image.url} alt="Profile Image" style={{ width: "200", height: "200" }}
      />
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {"Name: "}{user?.name.first}{" "}{user?.name.last}
      </h5>
      <h5 className="text-1xl font-bold tracking-tight text-gray-900 dark:text-white">
        {"Email: "}{user?.email}
      </h5>
      <h5 className="text-1xl font-bold tracking-tight text-gray-900 dark:text-white">
        {"Phone: "}{user?.phone}
      </h5>
      <h5 className="text-1xl font-bold tracking-tight text-gray-900 dark:text-white">
        {"ID: "}{user?._id}
      </h5>
      <h5 className="text-1xl font-bold tracking-tight text-gray-900 dark:text-white">
        AuthLevel: {user?.isBusiness}</h5>


    </Card>
  );
}
  ;

export default Profile;