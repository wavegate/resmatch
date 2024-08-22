const ProfileRow = ({ label, description, value, gray }) => {
  return (
    <div
      className={`grid grid-cols-subgrid col-span-2 px-4 py-3 ${
        gray && "bg-gray-50"
      } max-sm:px-3 max-sm:py-2`}
    >
      <div>
        <div className={`text-gray-600 max-sm:text-sm`}>{label}</div>
        <div className={`text-xs text-gray-500`}>{description}</div>
      </div>
      <div>{value}</div>
    </div>
  );
};

export default ProfileRow;
