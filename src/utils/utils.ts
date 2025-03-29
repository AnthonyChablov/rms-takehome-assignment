export const formatDate = (value: any) => {
  try {
    const date = new Date(value);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  } catch (error) {
    return value?.toString() || '';
  }
};
