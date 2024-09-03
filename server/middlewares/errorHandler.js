module.exports = function errorHandler(err, req, res, next) {
  console.log("🚀 ~ errorHandler ~ err:", err);
  if (err.code == "ERR_BAD_REQUEST") {
    switch (err.response.statusText) {
      case "Bad Request":
        res
          .status(400)
          .json({ message: "No card matching was found in the database" });
        return;
      default:
        res.status(500).json({ message: "Internal Server Error" });
    }
  }

  switch (err.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      res.status(400).json({ message: err.errors[0].message });
      return;
    case "BadRequest":
      res.status(400).json({ message: err.message });
      return;
    case "Unauthorized":
      res.status(401).json({ message: err.message });
      return;
    case "Forbidden":
      res.status(403).json({ message: err.message });
      return;
    case "NotFound":
      res.status(404).json({ message: err.message });
      return;
    case "JsonWebTokenError":
      res.status(401).json({ message: "Invalid token" });
      return;
    case "AxiosError":
      return;
    default:
      res.status(500).json({ message: "Internal Server Error" });
  }
};
