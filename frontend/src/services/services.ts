import createService from "@/services/genericService";

interface ModelServiceMap {
  [key: string]: any;
}

export const modelNames = [
  "dropped",
  "interviewLogistics",
  "question",
  "interviewImpression",
  "lOIResponse",
  "lOIntentResponse",
  "postIVCommunication",
  "secondLook",
  "fameShame",
  "m4InternImpression",
  "malignant",
  "scheduleDetails",
  "fellowshipMatch",
  "interviewInvite",
  "interviewRejection",
  "cityUserInput",
  // "xorY",
];

const generateServices = (models: string[]): ModelServiceMap => {
  const services: ModelServiceMap = {};

  models.forEach((modelName) => {
    services[modelName] = createService<any, any>(`/${modelName}`);
  });

  return services;
};

const services = generateServices(modelNames);

export default services;
