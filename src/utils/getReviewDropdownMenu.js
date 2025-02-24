import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const getReviewDropdownMenu = () => {
  return [
    {
      icon: <EditIcon />,
      label: "Edit",
    },
    { icon: <DeleteIcon />, label: "Delete" },
  ];
};

export default getReviewDropdownMenu;
