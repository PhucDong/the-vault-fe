import { Box, Checkbox } from "@mui/material";

function CustomStyledCheckbox(props) {
  const { id, name, storeOption, option, storeOptionList } = props;

  return (
    <Checkbox
      id={id}
      name={name}
      checked={
        storeOption
          ? storeOption === option
          : storeOptionList?.indexOf(option) > -1
      }
      icon={
        <Box
          sx={{
            width: 20,
            height: 20,
            borderRadius: "50%",
            border: "2px solid #70787a",
            backgroundColor: "transparent",
          }}
        />
      }
      checkedIcon={
        <Box
          sx={{
            width: 20,
            height: 20,
            borderRadius: "50%",
            border: "2px solid #70787a",
            backgroundColor: "info.main",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      }
    />
  );
}

export default CustomStyledCheckbox;
