export const formatInputsData = (data = {}) => {
  const formatted = {};

  for (const [key, value] of Object.entries(data)) {
    if (Array.isArray(value)) {
      formatted[key] = value.map((item) => item?._id ?? item?.value ?? item);
    } else {
      if (value !== null) formatted[key] = value?._id ?? value?.value ?? value;
    }
  }

  return formatted;
};
