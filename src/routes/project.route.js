import { Router } from "express";
import {
  verifyJWT,
  validateProjectPermission,
} from "../middlewares/auth.middleware.js";
import {
  createProject,
  addMembersToProject,
  deleteMember,
  getProjectById,
  getProjects,
  getProjectMembers,
  updateMemberRole,
  deleteProject,
  updateProject,
} from "../controllers/project.controller.js";
import { validate } from "../middlewares/validator.middleware.js";
import {
  createProjectValidator,
  addMembertoProjectValidator,
} from "../validators/index.js";
import { AvailableUserRole, UserRolesEnum } from "../utils/constants.js";
import taskRouter from "./task.route.js";

const router = Router();

// All project routes require authentication
router.use(verifyJWT);

// Main project routes
router
  .route("/")
  .get(getProjects)
  .post(createProjectValidator(), validate, createProject);

router
  .route("/:projectId")
  .get(validateProjectPermission(AvailableUserRole), getProjectById)
  .put(
    validateProjectPermission([UserRolesEnum.ADMIN]),
    createProjectValidator(),
    validate,
    updateProject,
  )
  .delete(validateProjectPermission([UserRolesEnum.ADMIN]), deleteProject);

// Project members routes
router
  .route("/:projectId/members")
  .get(validateProjectPermission(AvailableUserRole), getProjectMembers)
  .post(
    validateProjectPermission([UserRolesEnum.ADMIN]),
    addMembertoProjectValidator(),
    validate,
    addMembersToProject,
  );

router
  .route("/:projectId/members/:userId")
  .put(validateProjectPermission([UserRolesEnum.ADMIN]), updateMemberRole)
  .delete(validateProjectPermission([UserRolesEnum.ADMIN]), deleteMember);

// Nest task routes under projects
router.use("/:projectId/tasks", taskRouter);

export default router;
