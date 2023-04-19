const ipValidator = (ipv4Address) => {
  const validate = /^((25[0-5]|(2[0-4]|1[0-9]|[1-9]|)[0-9])(\.(?!$)|$)){4}$/;
  if (validate.test(ipv4Address)) return true;
  return false;
};

export default ipValidator;
