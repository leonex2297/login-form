export const login = async ({ username, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === "rahul" && password === "pass") {
        resolve();
      } else {
        reject();
      }
    }, 2000);
  });
};
