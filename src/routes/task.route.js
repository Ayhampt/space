import { Router } from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  createSubTask,
  updateSubTask,
  deleteSubTask,
} from "../controllers/task.controller.js";
import {
  verifyJWT,
  validateProjectPermission,
} from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { AvailableUserRole, UserRolesEnum } from "../utils/constants.js";

const router = Router({ mergeParams: true });

// All routes require authentication and project membership
router.use(verifyJWT);
router.use(validateProjectPermission(AvailableUserRole));

// Task routes
router
  .route("/")
  .get(getTasks)
  .post(upload.array("attachments", 5), createTask);

router
  .route("/:taskId")
  .get(getTaskById)
  .put(upload.array("attachments", 5), updateTask)
  .delete(deleteTask);

// Subtask routes
router.route("/:taskId/subtasks").post(createSubTask);

router
  .route("/:taskId/subtasks/:subtaskId")
  .put(updateSubTask)
  .delete(deleteSubTask);

export default router;
