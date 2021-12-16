import { Router } from "express";
import  indexController from '../controller/indexController'
import UploadDownloadHelper from "../middleware/UploadDownloadHelper";

const router = Router();

router.get("/", indexController.empCtrl.findAll);
router.get("/:id", indexController.empCtrl.findOne);
router.post("/", indexController.empCtrl.create);
router.post("/images", UploadDownloadHelper.uploadImages, indexController.empCtrl.createFull);
router.put("/:id", indexController.empCtrl.update);
router.delete("/:id", indexController.empCtrl.deleteRow);


export default router;