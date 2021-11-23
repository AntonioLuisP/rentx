import { Router } from "express";

import { SpecificationRepository } from "../modules/carros/repositories/SpecificationRepository";
import { CreateSpecificationService } from "../modules/carros/services/CreateSpecificationService";

const specificationsRoutes = Router();

const specificationRepository = new SpecificationRepository();

specificationsRoutes.post("/", (request, response) => {
  const { name, description } = request.body;
  const createSpecificationService = new CreateSpecificationService(
    specificationRepository
  );

  createSpecificationService.execute({ name, description });

  return response.status(201).send();
});

export { specificationsRoutes };