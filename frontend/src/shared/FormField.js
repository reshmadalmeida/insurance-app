
// <FormSelect
//   name="policyType"
//   label="Policy Type"
//   value={form.policyType}
//   onChange={update}
//   options={[
//     { value: "Health", label: "Health" },
//     { value: "Motor", label: "Motor" },
//     { value: "Life", label: "Life" },
//     { value: "Property", label: "Property" },
//   ]}
  


  
// import React from "react";
// import {
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   FormHelperText,
//   Checkbox,
//   ListItemText,
// } from "@mui/material";

// export default function FormSelect({
//   name,
//   label,
//   value,
//   onChange,
//   options = [],
//   multiple = false,
//   required,
//   error,
//   helperText,
//   disabled,
//   size = "small",
//   fullWidth = true,
//   placeholder,
//   renderCheckboxInMulti = true,
//   ...rest
// }) {
//   const handleChange = (e) => {
//     onChange?.(name, e.target.value);
//   };

//   const labelId = `${name}-label`;

//   return (
//     <FormControl size={size} fullWidth={fullWidth} error={!!error} required={required} disabled={disabled}>
//       {label && <InputLabel id={labelId}>{label}</InputLabel>}
//       <Select
//         labelId={labelId}
//         label={label}
//         multiple={multiple}
//         value={value ?? (multiple ? [] : "")}
//         onChange={handleChange}
//         displayEmpty={!!placeholder}
//         renderValue={(selected) => {
//           if (placeholder && (!selected || (Array.isArray(selected) && selected.length === 0))) {
//             return <span style={{ color: "#888" }}>{placeholder}</span>;
//           }
//         //   if (multiple) {
//         //     // selected is an array of values
//         //     const map = new Map(options.map((o) => [o.value, o.label]));
//         //     return (selected || []).map((v) => map.get(v) ?? v).join(", ");
//         //   }
//           const found = options.find((o) => o.value === selected);
//           return found ? found.label : "";
//         }}
//         {...rest}
//       >
//         {/* {placeholder && !multiple && (
//           <MenuItem value="">
//             <em>{placeholder}</em>
//           </MenuItem>
//         )} */}
//         {options.map((opt) => (
//           <MenuItem key={opt.value} value={opt.value} disabled={!!opt.disabled}>
//             {multiple && renderCheckboxInMulti ? (
//               <>
//                 <Checkbox checked={Array.isArray(value) && value.indexOf(opt.value) > -1} />
//                 <ListItemText primary={opt.label} />
//               </>
//             ) : (
//               opt.label
//             )}
//           </MenuItem>
//         ))}
//       </Select>
//       {(error || helperText) && (
//         <FormHelperText>{error || helperText}</FormHelperText>
//       )}
//     </FormControl>
//   );
// }