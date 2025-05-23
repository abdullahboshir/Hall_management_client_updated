export const registerStudent = async (formData: FormData) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_API_URL}/user/create-student`,
    {
      method: "POST",
      body: formData,
      cache: "no-store",
    }
  );
  const studentInfo = await res.json();
  return studentInfo;
};
