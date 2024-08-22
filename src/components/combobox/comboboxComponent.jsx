import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function ComboboxComponent({options, label, name, value, required = false,onChange }){
    return(
        <FormControl margin="normal" sx={{ width: 200, mt: 4 }}>
            <InputLabel>
                {label}
            </InputLabel>
            
            <Select
            name={name}
            value={value}
            label={label}   
            onChange={onChange}
            required={required}
            >
                <MenuItem value="">Vẫn giữ nguyên</MenuItem>
            {
                    options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    )
}