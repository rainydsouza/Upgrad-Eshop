const PhoneValidator = (phone) => {
  const phonePattern = /^(\+91|0)?[6789]\d{9}$/;
  return phonePattern.test(phone);
};

export default PhoneValidator;
