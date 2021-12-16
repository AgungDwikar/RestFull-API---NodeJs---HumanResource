import { Router } from "express";
import  indexController from '../controller/indexController'

const router = Router();

router.get("/", indexController.empCtrl.findAll);
router.get("/:id", indexController.empCtrl.findOne);
router.post("/", indexController.empCtrl.create);
router.put("/:id", indexController.empCtrl.update);

export default router;