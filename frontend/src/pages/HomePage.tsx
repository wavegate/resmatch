import { API_URL } from "@/constants";
import { Accordion } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMemo } from "react";

const fetchSpecialties = async () => {
  const { data } = await axios.get(`${API_URL}/specialties`);
  return data;
};

export default () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["specialties"],
    queryFn: fetchSpecialties,
  });

  const items = useMemo(() => {
    if (data) {
      return data.map((item: any) => (
        <Accordion.Item key={item.specialtyCode} value={item.specialtyCode}>
          <Accordion.Control>{item.name}</Accordion.Control>
          <Accordion.Panel>{item.specialtyCode}</Accordion.Panel>
        </Accordion.Item>
      ));
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div>{API_URL}</div>
      <Accordion>{items}</Accordion>
    </div>
  );
};
