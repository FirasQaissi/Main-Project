import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Header from "./Components/Layout/Header/Header";
import SignIn from "./Pages/SignIn/SignIn";
import Profile from "./Pages/Profile/Profile";
import RouteGuard from "./Components/RouteGuard";
import CreateCard from "./Pages/CreateCard/CreateCard";
import CardDetails from "./Components/Layout/Header/CardDetails";
import Favourites from "./Pages/Favourites/Favourites";
import SignUp from "./Pages/SignIn/Register"; // Uncomment if SignUp is needed later
import MyCards from "./Pages/MyCards/MyCard";
import Footer from "./Components/Layout/Footer/Footer";
import AboutWeb from "./Pages/About/AboutWeb";


function App() {
  return (
    <>

      {/* <Header isLoggedIn={isLoggedIn} setIsloggedIN={setIsLoggedIn} /> */}
      <Header />
      <Routes>
        <Route path="/*" element={<Home />} />
        {/* <Route
          path="/signin"
          element={<SignIn setIsloggedIN={setIsLoggedIn} />}
          /> */}
        <Route path="/signin" element={<SignIn />} />


        <Route path="/card/:id" element={<CardDetails />} />

        <Route
          path="/profile"
          element={
            <RouteGuard bizOnly={false} adminOnly={false}>
              <Profile />
            </RouteGuard>
          }
        />

        <Route
          path="/signup"
          element={

            <SignUp />

          }
        />
        <Route 
          path="/About"
          element={

            <AboutWeb />

          }
        />


        <Route
          path="/favourites"
          element={
            <RouteGuard bizOnly={false} adminOnly={false}>
              <Favourites />
            </RouteGuard>
          }
        />

        <Route
          path="/create-card"
          element={
            <RouteGuard bizOnly={true}>
              <CreateCard />
            </RouteGuard>
          }
        />

        <Route
          path="/MyCards"
          element={
            <RouteGuard bizOnly={true} >
              <MyCards />
            </RouteGuard>
          }
        />

      </Routes>

      <Footer />
    </>
  );
  ;
}

export default App;
