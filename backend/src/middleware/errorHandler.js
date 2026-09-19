// Turns predictable bad input into clear 4xx responses instead of a blanket 500,
// so a mistyped field tells the user what to fix rather than looking like an outage.
const errorHandler = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    const details = Object.values(err.errors || {})
      .map((e) => e.message)
      .join(", ");
    return res.status(400).json({ message: details || "Some of the details provided are not valid" });
  }

  if (err.name === "CastError") {
    return res.status(400).json({ message: `Invalid value for ${err.path}` });
  }

  if (err.code === 11000) {
    return res.status(400).json({ message: "That record already exists" });
  }

  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ message: "Request body was not valid JSON" });
  }

  console.error(err);
  res.status(500).json({ message: "Something went wrong on the server" });
};

module.exports = errorHandler;
