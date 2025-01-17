module.exports = (regex, msg) =>
  function(req, res, next) {
    if (regex.test(req.params.uuid)) {
      next();
    } else {
      res.status(404).json({
        status: "error",
        message: msg || "Wrong format uuid"
      });
    }
  };
module.exports.uuidv4RegExp = /[a-f0-9]{8}-?[a-f0-9]{4}-?4[a-f0-9]{3}-?[89ab][a-f0-9]{3}-?[a-f0-9]{12}/i;
// module.exports.urlImgRegExp = /(https:)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/;