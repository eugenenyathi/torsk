const passwordValidator = require("password-validator");

const validatePassword = (password) => {
  const schema = new passwordValidator();

  schema
    .is()
    .min(8, "Minimum length of 8 characters is required")
    .is()
    .max(20)
    .has()
    .uppercase(1, "Minimum of 1 uppercase letter is required")
    .has()
    .lowercase(1, "Minimum of 1 lowercase letter is required")
    .has()
    .digits(3, "Minimum of 3 numbers is required")
    .has()
    .symbols(1, "Minimum of 1 symbol is required")
    .has()
    .not()
    .spaces()
    .is()
    .not()
    .oneOf(["Password", "Passw0rd", "Password123"]);

  if (schema.validate(password)) {
    return "ok";
  } else {
    const error = schema.validate(password, { details: true });
    return error[0].message;
  }

  return false;
};

export default validatePassword;
