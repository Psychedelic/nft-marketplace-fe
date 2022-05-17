export const isEmptyObject = (obj: any) => {
  return (
    obj && Object.keys(obj).length === 0 && obj.constructor === Object
  );
};
