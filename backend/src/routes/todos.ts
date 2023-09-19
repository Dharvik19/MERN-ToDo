import express from 'express';
import * as TododsController from "../controllers/todos";

const router = express.Router();

router.get("/", TododsController.getTodos);

router.get("/:todoId", TododsController.getTodo);

router.post("/", TododsController.createTodos);

export default router;