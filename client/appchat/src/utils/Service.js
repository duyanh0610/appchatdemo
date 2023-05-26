export const baseUrl = "http://localhost:3001";
export const postRequest = async (url, body) => {
    console.log(body)
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
  const data = await response.json();
  if (!response.ok) {
    let message;
    if (data?.message) {
      message = data.message;
    } else message = data;
    return { error: message };
  }
  return data;
};
export const getRequest = async(url,body)=>{
  const response = await fetch(url,{
    method:"GET",
    headers: {
      "Content-Type":"application/json"
    },
    body
  })
  const data = await response.json();
  if (!response.ok) {
    let message;
    if (data?.message) {
      message = data.message;
    } else message = data;
    return { error: message };
  }
  return data;
}