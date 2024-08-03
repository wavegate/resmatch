import { API_URL } from "@/constants";
import { Accordion } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMemo } from "react";

const fetchPrograms = async () => {
  const { data } = await axios.get(`${API_URL}/programs`);
  return data;
};

export default () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["programs"],
    queryFn: fetchPrograms,
  });

  const items = useMemo(() => {
    if (data) {
      return data.map((item: any) => {
        return (
          <Accordion.Item key={item.id} value={String(item.id)}>
            <Accordion.Control>
              {item.name} at {item.institution.name}
            </Accordion.Control>
            <Accordion.Panel>{item.specialty.specialtyCode}</Accordion.Panel>
          </Accordion.Item>
        );
      });
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{<Accordion>{items}</Accordion>}</div>;
};
