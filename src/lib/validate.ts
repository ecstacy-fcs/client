const validate = {
  fullName: (value: string) => {
    let error;
    if (!value) {
      error = "Required";
    } else if (value.length > 50) {
      error = "Must be 50 characters or less.";
    }
    return error;
  },
  email: (value: string) => {
    let error;
    if (!value) {
      error = "Required";
    } else if (
      !/^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/.test(
        value
      )
    ) {
      error = "Invalid email address";
    } else if (value.length > 320) {
      error = "Must be 320 characters or less";
    }
    return error;
  },
  password: (value: string) => {
    let error;
    if (!value) {
      error = "Required";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,22}$/.test(
        value
      )
    ) {
      error =
        "Invalid password. Password must have between 8-22 characters, at least one uppercase letter, one lowercase letter, one number and one special character.";
    }
    return error;
  },
  confirmPassword: (value: string, password: string) => {
    let error;
    if (!value) {
      error = "Required";
    } else if (password !== value) {
      error = "Passwords don't match.";
    }
    return error;
  },
};

export default validate;
