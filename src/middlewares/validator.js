module.exports = {
  validateBody: (schema) => async (req, res, next) => {
    try {
      const { error, value } = await schema.validate(req.body);
      if (error) throw new Error(error);
      req.body = value;
      next();
    } catch (error) {
      next(error);
    }
  },
};
