import { API_URL } from "@/constants";
import { Accordion, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMemo } from "react";
import dayjs from "dayjs";

const fetchInvites = async () => {
  const { data } = await axios.get(`${API_URL}/interview-invites`);
  return data;
};

export default () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["invites"],
    queryFn: fetchInvites,
  });

  console.log(data);

  const items = useMemo(() => {
    if (data) {
      return data.map((item: any) => {
        return (
          <Accordion.Item key={item.id} value={item.id.toString()}>
            <Accordion.Control>
              <Text>
                <strong>{`${item.program.name} at ${item.program.institution.name}`}</strong>{" "}
                - {dayjs(item.inviteDateTime).format("MMMM D, YYYY")}
              </Text>
              <Text size="sm" color="gray">
                Posted By: {item.user.alias}
              </Text>
            </Accordion.Control>
            <Accordion.Panel>
              <div className="grid grid-cols-2 gap-4 mt-2 text-gray-600">
                <div>
                  <strong>Graduate Type:</strong> {item.graduateType || "N/A"}
                </div>
                <div>
                  <strong>IMG:</strong> {item.img || "N/A"}
                </div>
                <div>
                  <strong>Medical Degree:</strong> {item.medicalDegree}
                </div>
                <div>
                  <strong>Step 1 Score:</strong>{" "}
                  {item.step1Score || (item.step1ScorePass ? "Pass" : "N/A")}
                </div>
                <div>
                  <strong>Step 2 Score:</strong> {item.step2Score || "N/A"}
                </div>
                <div>
                  <strong>COMLEX 1 Score Pass:</strong>{" "}
                  {item.comlex1ScorePass ? "Yes" : "No"}
                </div>
                <div>
                  <strong>COMLEX 2 Score:</strong> {item.comlex2Score || "N/A"}
                </div>
                <div>
                  <strong>Geographic Preference:</strong>{" "}
                  {item.geographicPreference ? "Yes" : "No"}
                </div>
                <div>
                  <strong>Signal Sent:</strong> {item.signal ? "Yes" : "No"}
                </div>
                <div>
                  <strong>Visa Required:</strong>{" "}
                  {item.visaRequired ? "Yes" : "No"}
                </div>
                <div>
                  <strong>SubI:</strong> {item.subI ? "Yes" : "No"}
                </div>
                <div>
                  <strong>Home Program:</strong> {item.home ? "Yes" : "No"}
                </div>
                <div>
                  <strong>Away Rotation:</strong> {item.away ? "Yes" : "No"}
                </div>
                <div>
                  <strong>Year of Graduation:</strong>{" "}
                  {item.yearOfGraduation || "N/A"}
                </div>
                <div>
                  <strong>Green Card:</strong> {item.greenCard ? "Yes" : "No"}
                </div>
              </div>
            </Accordion.Panel>
          </Accordion.Item>
        );
      });
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{<Accordion>{items}</Accordion>}</div>;
};
