const requiredEnv = ["MONGO_URI", "JWT_SECRET"];

const checkEnv = () => {
  const missing = requiredEnv.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    console.warn("Missing environment variables:", missing.join(", "));
  }
};

module.exports = { checkEnv };
