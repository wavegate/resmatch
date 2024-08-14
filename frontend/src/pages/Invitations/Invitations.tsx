import {
  Accordion,
  Avatar,
  Button,
  Indicator,
  Modal,
  Pagination,
  Tabs,
} from "@mantine/core";
import { FaRegCalendarAlt, FaRegPlusSquare } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { MdChecklist } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import { IoMdAdd } from "react-icons/io";
import Entry from "./Entry";
import { useDisclosure } from "@mantine/hooks";
import AddModal from "./AddModal";
import DateModal from "./DateModal";

const entries = [
  "green",
  "red",
  "yellow",
  "green",
  "green",
  "green",
  "red",
  "yellow",
  "green",
  "green",
];

const Invitations = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [dateOpened, { open: openDate, close: closeDate }] =
    useDisclosure(false);

  return (
    <>
      <div className={`flex flex-col gap-8`}>
        <div className={`flex flex-col gap-2`}>
          <div className={`flex justify-between items-center`}>
            <div className={`font-medium text-3xl text-black`}>
              Interview Invitations
            </div>
            <Button
              size="sm"
              leftSection={<IoMdAdd size={18} />}
              onClick={open}
            >
              New Invitation
            </Button>
          </div>
          <div className={`text-gray-950`}>
            Discover interview invites shared by fellow medical residency
            applicants.
          </div>
        </div>
        <Tabs defaultValue="all">
          <Tabs.List>
            <Tabs.Tab value="all">View All (100)</Tabs.Tab>
            <Tabs.Tab value="offers" leftSection={<Indicator color="green" />}>
              IV Offers (33)
            </Tabs.Tab>
            <Tabs.Tab value="rejected" leftSection={<Indicator color="red" />}>
              Rejected
            </Tabs.Tab>
            <Tabs.Tab
              value="dropped"
              leftSection={<Indicator color="yellow" />}
            >
              Dropped
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="all" className={`mt-8 flex flex-col gap-8`}>
            <div className={`flex flex-col gap-4`}>
              <div className={`flex gap-4 flex-wrap`}>
                <Button
                  leftSection={<FaRegCalendarAlt />}
                  variant="default"
                  className={`font-normal`}
                  onClick={openDate}
                >
                  Date Added
                </Button>
                <Button
                  leftSection={<FaRegPlusSquare />}
                  variant="default"
                  className={`font-normal`}
                >
                  Find Programs
                </Button>
                <Button
                  leftSection={<LuGraduationCap />}
                  variant="default"
                  className={`font-normal`}
                >
                  Qualification
                </Button>
                <Button
                  leftSection={<CgProfile />}
                  variant="default"
                  className={`font-normal`}
                >
                  Applicant Type
                </Button>
                <Button
                  leftSection={<MdChecklist />}
                  variant="default"
                  className={`font-normal`}
                >
                  Preferences
                </Button>
              </div>
              {entries.map((color, index) => {
                return (
                  <>
                    <Entry color={color} />
                    {index !== 4 && <hr />}
                  </>
                );
              })}
            </div>
            <Pagination withEdges total={100} className={`self-center`} />
          </Tabs.Panel>

          <Tabs.Panel value="offers">Messages tab content</Tabs.Panel>

          <Tabs.Panel value="rejected">Settings tab content</Tabs.Panel>
          <Tabs.Panel value="dropped">Settings tab content</Tabs.Panel>
        </Tabs>
      </div>
      <Modal opened={opened} onClose={close} title="New Invitation" centered>
        <AddModal />
      </Modal>
      <Modal
        opened={dateOpened}
        onClose={closeDate}
        title="Search Invitation by Date Added"
        centered
      >
        <DateModal closeDate={closeDate} />
      </Modal>
    </>
  );
};

export default Invitations;
