import notificationService from "@/services/notificationService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import UserNoLink from "./UserNoLink";
import dayjs from "dayjs";
import { Badge, Button, Indicator, Popover } from "@mantine/core";
import { FaRegBell } from "react-icons/fa";
import { Link } from "react-router-dom";
import { TbMoodSad } from "react-icons/tb";

const colorMap = {
  unread: "bg-[#E7F2FF] hover:bg-[#D8E9FF]",
  read: "hover:bg-gray-100",
};

const StatusNotifications = () => {
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => notificationService.getNotifications(),
  });

  const updateMutation = useMutation({
    mutationFn: (id) => {
      return notificationService.updateRead(id, true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  return (
    <Popover shadow="xl">
      <Popover.Target>
        <Indicator
          color="red"
          disabled={!data || data?.filter((x) => !x.read)?.length === 0}
          size={10}
          offset={4}
        >
          <Button variant="default" className={`rounded-full px-[9px]`}>
            <FaRegBell size={18} />
          </Button>
        </Indicator>
      </Popover.Target>
      <Popover.Dropdown p={0}>
        <div className={`max-h-[400px] overflow-y-auto`}>
          {data?.map((datum) => {
            return (
              <Link
                className={`gap-1 flex flex-col text-sm w-[340px] py-2 px-4 ${
                  datum.read ? colorMap["read"] : colorMap["unread"]
                } hover:cursor-pointer`}
                to={`/comment/${datum.comment?.id}`}
                onClick={() => {
                  updateMutation.mutate(datum.id);
                }}
                key={datum.id}
              >
                <div className={`flex justify-between gap-2`}>
                  <UserNoLink data={datum.replyComment} />
                  <div className={`flex gap-2 flex-nowrap`}>
                    <div className={`text-gray-500 text-sm whitespace-nowrap`}>
                      {dayjs(datum.createdAt).format("h:mmA, MMM D")}
                    </div>
                    {!datum.read && (
                      <Badge variant={`outline`} className={`min-w-max`}>
                        New
                      </Badge>
                    )}
                  </div>
                </div>
                <div className={`text-gray-800`}>
                  {datum.notificationType === "COMMENT_REPLY" && (
                    <div>Replied to your comment.</div>
                  )}
                </div>
              </Link>
            );
          })}
          {data?.length === 0 && (
            <div
              className={`text-gray-400 flex flex-col gap-2 items-center py-2 px-4`}
            >
              <TbMoodSad size={36} />
              <div className={`text-sm`}>No notifications yet.</div>
            </div>
          )}
        </div>
      </Popover.Dropdown>
    </Popover>
  );
};

export default StatusNotifications;
