import express from "express";

import authentication from "./authentication";
import users from "./user";
import product from "./product";
import cart from "./cart";

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  users(router);
  product(router);
  cart(router);
  return router;
};
