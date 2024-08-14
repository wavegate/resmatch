import createService from "@/services/genericService";

interface ModelServiceMap {
  [key: string]: any;
}

const modelNames = ["interviewLogistics"];

const generateServices = (models: string[]): ModelServiceMap => {
  const services: ModelServiceMap = {};

  models.forEach((modelName) => {
    services[modelName] = createService<any, any>(`/${modelName}`);
  });

  return services;
};

const services = generateServices(modelNames);

export default services;
