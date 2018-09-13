import React from "react";
import { connect } from "react-redux";
import SessionForm from "./session_form";
import { login } from "../../actions/session_actions";
import { Link } from "react-router-dom";

const mapStateToProps = (state) => {
  const currentUser = state.entities.users[state.session.id];
  const errors = state.errors;
  const formType = "Login";
  const navLink = <Link to="/signup">Go to sign up page</Link>;

  return { errors, formType, navLink, currentUser };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processForm: (user) => dispatch(login(user)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm);