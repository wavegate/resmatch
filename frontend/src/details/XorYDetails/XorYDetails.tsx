import { Accordion } from "@mantine/core";
import Comment from "@/components/Comment/Comment";
import AddCommentField from "@/components/AddCommentField";

interface XorYDetailsProps {
  item: any; // Replace with the correct type if available
}

export default function XorYDetails({
  item: data,
  queryKey,
}: XorYDetailsProps) {
  return (
    <Accordion.Panel>
      <div className={`flex flex-col gap-4 py-4`}>
        {/* Display fields in a responsive grid */}
        <div
          className={`grid grid-cols-[auto_1fr_auto_1fr] max-sm:grid-cols-1 gap-4 border border-solid rounded-sm p-4`}
        >
          <div
            className={`grid col-span-2 grid-cols-subgrid max-sm:col-span-1`}
          >
            <div className={`font-medium`}>Question:</div>
            <div className={`text-gray-600`}>{data.question}</div>
          </div>
        </div>

        {/* Display comments field */}

        {data.comments?.length > 0 && (
          <div className={`flex flex-col gap-4`}>
            {data.comments.map((item: any) => (
              <Comment id={item.id} key={item.id} queryKey={queryKey} />
            ))}
          </div>
        )}
        <AddCommentField queryKey={queryKey} modelName={"xorY"} id={data.id} />
      </div>
    </Accordion.Panel>
  );
}
