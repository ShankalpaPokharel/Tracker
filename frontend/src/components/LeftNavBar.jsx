import React from "react";
import { NavLink } from "react-router-dom";

function LeftNavBar() {
    return (
        <>
            <div className=" bg-slate-200 h-screen w-60 flex flex-col">
                <div className="pl-3 mt-5">
                    <h2 className="bg-gradient-to-r from-cyan-500 to-blue-500  text-transparent inline-block bg-clip-text text-3xl font-bold w-21 cursor-pointer">
                        <NavLink to="">Tracker</NavLink>
                    </h2>
                </div>
                <div className="mt-10 ">
                    <ul className="space-y-2 ">
                        {/* <li className="py-1 left-navbar-hover "> */}
                            
                            <NavLink
                                to="/todo"
                                className={({ isActive }) =>
                                    ` ${
                                        isActive
                                            ? "text-blue-500"
                                            : "text-black"
                                    } `
                                }
                            >
                                 <li className="py-1 left-navbar-hover ">Todo</li>
                            </NavLink>
                            
                         


                        <li className=" py-1 left-navbar-hover">
                            Shopping List
                        </li>
                        <li className="py-1 left-navbar-hover">
                            Budget Tracker
                        </li>
                        <li className="py-1 left-navbar-hover  ">
                            Hour Tracker
                        </li>
                    </ul>
                </div>
                <div className="mt-auto pl-3 mb-5 left-navbar-hover">
                    Logout
                </div>
            </div>
        </>
    );
}

export default LeftNavBar;
