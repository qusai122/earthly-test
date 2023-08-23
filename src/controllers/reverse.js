import { reverseMessage } from "../services/reverse.js";

const reverse = async (req, res) => {
  try {
    const reversedMessage = reverseMessage(req.body.message);
    res.json({ reversedMessage });
  } catch (error) {}
};
export default reverse;
