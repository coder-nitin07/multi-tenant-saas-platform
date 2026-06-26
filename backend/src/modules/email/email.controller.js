import sendTestEmail from "../../services/email.service.js";

const testEmail = async (req, res, next) => {
  try {
      const result = await sendTestEmail();

      res.status(200).json({
        result
      });
  } catch (err) {
      next(err);
  }
};

export { testEmail };