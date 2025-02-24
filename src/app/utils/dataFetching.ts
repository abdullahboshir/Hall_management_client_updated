const dataFetching = async (endPoint: string) => {
  const res = await fetch(endPoint, {
    next: {
      revalidate: 30,
    },
  });

  const students = await res.json();
  return students;
};

export default dataFetching;
