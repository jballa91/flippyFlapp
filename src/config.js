module.exports = {
  api:
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "https://flippyflapp-api.herokuapp.com",
};
