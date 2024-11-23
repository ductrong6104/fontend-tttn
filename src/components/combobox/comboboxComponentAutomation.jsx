import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { colors } from "../colors/colors";
export default function ComboboxComponentAutomation({
  options,
  label,
  name,
  value,
  required = false,
  onChange,
}) {
  return (
    <FormControl margin="normal" sx={{ width: 200, mt: 4 }}>
      <InputLabel>{label}</InputLabel>

      <Select
        name={name}
        value={value}
        label={label}
        onChange={onChange}
        required={required}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option.value}
            value={option.value}
            sx={{ background: colors[index % colors.length] }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
