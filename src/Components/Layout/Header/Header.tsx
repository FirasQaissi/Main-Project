import { DarkThemeToggle, Navbar, TextInput, Tooltip } from "flowbite-react";
import { IoSearchSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userActions } from "../../../Store/UserSlice";
import { TRootState } from "../../../Store/store";
import { searchActions } from "../../../Store/SearchSlice";
import { GrDomain } from "react-icons/gr";
import { FaRegUser } from "react-icons/fa6";
import SignupModal from "../../../Pages/SignIn/SignUpEXTRA";
import { useState } from "react";



// type HeaderProps = {
//   isLoggedIn: boolean;
//   setIsloggedIN: (isLoggedIn: boolean) => void;
// };

function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state: TRootState) => state.userSlice.user);

  const [showModal, setShowModal] = useState(false);


  return (
    <Navbar fluid rounded className="bg-slate-200 dark:bg-slate-900 ">
      <Navbar.Brand as={Link} to="/home">
        <span className="self-center whitespace-nowrap text-2xl font-semibold text-black dark:text-white alumni-sans ">
          <GrDomain />

          Data Project
        </span>

      </Navbar.Brand>

      <Navbar.Brand>

      </Navbar.Brand>

      <Navbar.Toggle />
      <Navbar.Collapse>
        <TextInput
          placeholder="Search"
          rightIcon={IoSearchSharp}
          className="alumni-sans text-3xl  text-black dark:text-white bg-slate-500 dark:bg-gray-800  rounded-full"
          style={{ width: '450px' }}
          value={useSelector((state: TRootState) => state.searchSlice.searchWord)}
          autoComplete="off"
          autoCorrect="off"

          onChange={(e) => dispatch(searchActions.setSearchWord(e.target.value))} />
        <Navbar.Link as={Link} to={"/home"} href="/home" className="text-black  font-bold dark:text-white mt-3">
          Home
        </Navbar.Link>

        {user === null && (
          <Navbar.Link
            as={Link}
            to={"/signin"}
            href="/signin"
            className="text-green-700  font-bold dark:text-green-400 mt-3"
          >
            Sign In
          </Navbar.Link>
        )}

        {user === null && (
          <Navbar.Link
            onClick={() => setShowModal(true)}
            className="text-green-700 rounded-full  font-bold dark:text-green-400 cursor-pointer mt-3"
          >
            Register
          </Navbar.Link>
        )}



        <SignupModal open={showModal} onClose={() => setShowModal(false)} />
        {user && (
          <Navbar.Link
            as={Link}
            to={"/favourites"}
            href="/favourites"
            className="text-black font-bold dark:text-white mt-3"
          >
            Favourites
          </Navbar.Link>
        )}

        {user && user.isBusiness && (
          <Navbar.Link
            as={Link}
            to={"/create-card"}
            href="/create-card"
            className="text-black font-bold dark:text-white mt-3"
          >
            Create Card
          </Navbar.Link>
        )}


        {user && user.isBusiness && (
          <Navbar.Link
            as={Link}
            to={"/mycards"}
            href="/mycards"
            className="text-black font-bold dark:text-white mt-3"
          >
            My Cards
          </Navbar.Link>
        )}
        {(
          <Navbar.Link
            as={Link}
            to={"/About"}
            href="/About"
            className="text-black font-bold dark:text-white mt-3 "
          >
            About Us
          </Navbar.Link>
        )}
        <><DarkThemeToggle /></>
        {user && (
          <Tooltip content={user.name.first + ' ' + user.name.last} className='font-bold text-green-400 text-center'>
            <Navbar.Link
              as={Link}
              to={"/profile"}
              href="/profile"
              className="text-black font-bold dark:text-white mt-3"
            >
              <FaRegUser className='mr-5' style={{ width: '32px', height: '32px', color: 'green' }} />
            </Navbar.Link>
          </Tooltip>
        )}
        {user !== null && (
          <Navbar.Link
            className="cursor-pointer text-red-500 dark:text-red-400-bold font-bold ml-8 mt-3"
            onClick={() => dispatch(userActions.logout())}
          >
            Sign Out
          </Navbar.Link>
        )}

      </Navbar.Collapse>
    </Navbar>
  );
}
export default Header;



