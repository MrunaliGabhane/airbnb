import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { PlacesPage } from "./PlacesPage";
import { AccountNav } from "./AccountNav";

export const ProfilePage = () => {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);

  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  async function logout() {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  }

  if (!ready) {
    return "Loading";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <AccountNav />
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logges in as {user.name} ({user.email}) <br />
          <button onClick={logout} className="primary max-w-sm mt-2">
            Logout
          </button>
        </div>
      )}
      {subpage === "places" && <PlacesPage />}
    </div>
  );
};

// function linkClasses(type=null){
//     let classes = "py-2 px-6";
//     if(type === subpage || (subpage === undefined && type === "profile")){
//         classes += 'bg-primary text-white rounded-full'
//     }
//     return classes;
// }
// return (
// <div>
//     <nav className='w-full flex justify-center mt-8 gap-2'>
//         <Link className={linkClasses('profile')} to={'/account'}>My Profile</Link>
//         <Link className={linkClasses('bookings')} to={'/account/bookings'}>My bookings</Link>
//         <Link className={linkClasses('places')} to={'/account/places'}>My accommodations</Link>
//     </nav>
// </div>
// )
// }
