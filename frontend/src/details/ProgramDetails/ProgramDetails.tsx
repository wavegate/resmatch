export default function ProgramDetails({ item }) {
  return (
    <div className={`flex flex-col gap-4 py-4 px-4 max-sm:px-3`}>
      {/* Display fields in a responsive grid */}
      <div
        className={`grid grid-cols-[auto_1fr_auto_1fr] max-sm:grid-cols-1 gap-4 max-sm:text-sm`}
      >
        <div className={`grid col-span-2 grid-cols-subgrid max-sm:col-span-1`}>
          <div className={`font-medium`}>Program Type:</div>

          <div className={`text-gray-600 break-words overflow-hidden`}>
            {item.nrmpProgramCode &&
              (() => {
                const secondLastChar = item.nrmpProgramCode.slice(-2, -1); // Get the second-to-last character
                if (secondLastChar === "C") {
                  return "Categorical";
                } else if (secondLastChar === "P") {
                  return "Preliminary";
                } else if (secondLastChar === "M") {
                  return "Primary";
                } else {
                  return ""; // Return an empty string if no match
                }
              })()}
          </div>
        </div>
        <div className={`grid col-span-2 grid-cols-subgrid max-sm:col-span-1`}>
          <div className={`font-medium`}>Location:</div>

          <div className={`text-gray-600 break-words overflow-hidden`}>
            {item.city?.name}, {item.city?.state}
          </div>
        </div>

        <div className={`grid col-span-2 grid-cols-subgrid max-sm:col-span-1`}>
          <div className={`font-medium`}>NRMP Program Code:</div>

          <div className={`text-gray-600 break-words overflow-hidden`}>
            {item.nrmpProgramCode}
          </div>
        </div>
        <div className={`grid col-span-2 grid-cols-subgrid max-sm:col-span-1`}>
          <div className={`font-medium`}>ACGME Code:</div>

          <div className={`text-gray-600 break-words overflow-hidden`}>
            {item.acgmeCode}
          </div>
        </div>
      </div>
    </div>
  );
}
