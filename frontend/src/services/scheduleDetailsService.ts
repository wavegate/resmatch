import apiClient from "@/apiClient";

const route = "/schedule-details";

interface ScheduleDetails {
  id: string | number;
  // Add other schedule details-related properties here
}

interface FormData {
  // Define the structure of the form data used for creating/updating the schedule details
  longOvernightCall?: string;
  scheduleContinuity?: string;
  locations?: string;
  emr?: string;
  startDateOrientation?: string; // Date string
  visaInfo?: string;
  union?: string;
  midlevel?: string;
  ancillary?: string;
  teamRatios?: string;
  internCap?: string;
  admittingSystem?: string;
  icuHours?: string;
  nightFloat?: string;
  sickCallSystem?: string;
  moonlighting?: string;
  stayUntilSignout?: string;
  didactics?: string;
  vacationHolidays?: string;
  gym?: string;
  food?: string;
  salary?: string;
  // Add additional fields as necessary
}

interface SearchParams {
  pageNum: number;
}

interface SearchResponse {
  totalCount: number;
  scheduleDetails: ScheduleDetails[];
}

const createScheduleDetails = async (
  formData: FormData
): Promise<ScheduleDetails> => {
  const { data } = await apiClient.post(route, formData);
  return data;
};

const readScheduleDetails = async (
  id: string | number
): Promise<ScheduleDetails> => {
  const { data } = await apiClient.get(`${route}/${id}`);
  return data;
};

const updateScheduleDetails = async (
  id: string | number,
  formData: FormData
): Promise<ScheduleDetails> => {
  const { data } = await apiClient.put(`${route}/${id}`, formData);
  return data;
};

const deleteScheduleDetails = async (id: string | number): Promise<void> => {
  await apiClient.delete(`${route}/${id}`);
};

const searchScheduleDetails = async ({
  pageNum,
}: SearchParams): Promise<SearchResponse> => {
  const { data } = await apiClient.post(`${route}/search`, {
    pageNum,
  });
  return data;
};

export default {
  createScheduleDetails,
  readScheduleDetails,
  updateScheduleDetails,
  deleteScheduleDetails,
  searchScheduleDetails,
};
