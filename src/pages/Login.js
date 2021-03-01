import { connect } from 'react-redux';
import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as Actions from '../actions';
import Header from '../Components/Header';
import '../style/login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isDisabled: true,
      shouldRedirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.checkEmailAndPassword = this.checkEmailAndPassword.bind(this);
  }

  handleChange(event) {
    const {
      target: { name, value },
    } = event;
    this.setState(
      {
        [name]: value,
        isDisabled: true,
      },
      () => this.checkEmailAndPassword(),
    );
  }

  checkEmailAndPassword() {
    const minimumPasswordSize = 5;
    const { email, password } = this.state;
    const re = /.+@[A-z]+[.]com/;
    const isValidEmail = re.test(email);
    const isValidPassword = password.length > minimumPasswordSize;
    if (isValidPassword && isValidEmail) {
      this.setState({
        isDisabled: false,
      });
    }
  }

  handleClick() {
    const { email } = this.state;
    const { loggin } = this.props;
    loggin(email);
    this.setState({
      shouldRedirect: true,
    });
  }

  render() {
    const { isDisabled, shouldRedirect } = this.state;
    return (
      <>
        <Header />
        {shouldRedirect ? (
          <Redirect to="/carteira" />
        ) : (
          <form className="form-inline form-flex">
            <div className="form-group mb-2">
              <label htmlFor="email" className="sr-only">
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="alguem@alguem.com"
                  data-testid="email-input"
                  onChange={ this.handleChange }
                  className="form-control"
                />
              </label>
            </div>
            <div className="form-group mx-sm-3 mb-2">
              <label htmlFor="password" className="sr-only">
                Password
                <input
                  type="password"
                  name="password"
                  placeholder="Digite sua senha"
                  data-testid="password-input"
                  onChange={ this.handleChange }
                  className="form-control"
                />
              </label>
            </div>

            <button
              type="button"
              disabled={ isDisabled }
              onClick={ this.handleClick }
              className="btn btn-primary mb-2 button-loggin"
            >
              Entrar
            </button>
          </form>
        )}
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loggin: (email) => dispatch(Actions.logginAction(email)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  loggin: PropTypes.func.isRequired,
};
