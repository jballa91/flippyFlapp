module.exports = {
  api:
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "postgres://dmkdlrszkbkhni:2b22ec3b6d7bebf63ed71cec8344f66dfa49d79a44a3f8a1c8dda2ac8b6a09d9@ec2-34-194-198-176.compute-1.amazonaws.com:5432/dgeq2e5a46s9l",
};
