import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ConfigContext } from "../../../../contexts/ConfigContext";
import * as actionType from "../../../../store/actionTypes";
import FirebaseContext from "../../../../contexts/FirebaseContext";

const NavLogo = () => {
  const configContext = useContext(ConfigContext);
  const { collapseMenu } = configContext.state;
  const { dispatch } = configContext;
  const user = useContext(FirebaseContext);
  let displayName = "";

  if (user.isLoggedIn) {
    if(user.user.displayName){

      displayName = user.user.displayName.split(" ")[0];
    }
  }
  let toggleClass = ["mobile-menu"];
  if (collapseMenu) {
    toggleClass = [...toggleClass, "on"];
  }

  return (
    <React.Fragment>
      <div className='navbar-brand header-logo'>
        <Link to='#' className='b-brand'>
          <div className='b-bg'>
            <i className='feather icon-trending-up' />
          </div>
          <span className='b-title'>
            Hi, {user.isLoggedIn && displayName}
          </span>
        </Link>
        <Link
          to='#'
          className={toggleClass.join(" ")}
          id='mobile-collapse'
          onClick={() => dispatch({ type: actionType.COLLAPSE_MENU })}
        >
          <span />
        </Link>
      </div>
    </React.Fragment>
  );
};

export default NavLogo;
