import e from "express";
import { userRouter } from "./userRoutes.js";
import { restaurantRouter } from "./restaurantRoutes.js";
import { menuRouter } from "./menuRoutes.js";
import { cartRouter } from "./cartRoutes.js";
import { reviewRouter } from "./reviewRoutes.js";
import { orderRouter } from "./orderRoutes.js";
const router = e.Router();

router.use("/user", userRouter);
router.use("/restaurant", restaurantRouter);
router.use("/menu", menuRouter);
router.use("/cart",cartRouter);
router.use("/review",reviewRouter);
router.use("/order",orderRouter);





export { router as apiRouter };
