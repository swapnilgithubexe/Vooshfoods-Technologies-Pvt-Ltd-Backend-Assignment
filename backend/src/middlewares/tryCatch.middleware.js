export const tryCatchFunction = (handler) => {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      res.status(400).json({
        status: 400,
        data: null,
        message: error.message,
        error: null
      });
    }
  };
};