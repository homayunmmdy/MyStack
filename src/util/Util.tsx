export const getData = ( cash: any, amount: number, loading: JSX.Element) => {
  const posts = cash;
  const data = posts?.slice(0, amount);

  if (!data) {
    return loading;
  }

  return data;
};
