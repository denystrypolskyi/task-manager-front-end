import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reducers/userReducer";

const Navbar = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();

  const linkStyle =
    "block py-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700";

  return (
    <nav className="border-gray-200 sm:p-2 md:p-2 sm:h-auto md:h-14">
      <div className="flex flex-wrap items-center mx-auto">
        <div className="mx-auto block w-auto">
          <ul className="font-medium flex p-0 rounded bg-gray-50 flex-row space-x-8 md:bg-gray-50">
            {!isAuth ? (
              <>
                <li>
                <NavLink to="/login">
                  <div className={linkStyle}>
                    Login
                  </div>
                  </NavLink>
                </li>
                <li>
                <NavLink to="/registration">
                  <div className={linkStyle}>
                    Register
                  </div>
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                <NavLink to="/myTasks">
                  <div className={linkStyle}>
                    Tasks
                  </div>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/login">
                    <div
                      className={linkStyle}
                      onClick={() => dispatch(logout())}
                    >
                      Log out
                    </div>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
