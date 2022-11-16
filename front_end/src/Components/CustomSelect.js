import React, { useState } from 'react';
import Select from 'react-select';

const defaultStyles = {
    width:'200px',
    borderRadius:'15px'

}
const selectTheme = (theme) =>({
    ...theme,
    borderRadius: 15,
    
})
    
const customStyles = {
option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? 'white' : 'blue',
    padding: 20,
    borderRadius: 15,
  }),
  control:(provided)=>({
      ...provided,
      padding : 5
  })
}

export default function CustomSelect({label,opts,onChange,defaultValue}) {
  return (
    <div style={defaultStyles}>
      <Select
        styles={customStyles}
        defaultValue={defaultValue}
        placeholder={label}
        options={opts}
        onChange={onChange}
        theme={selectTheme}
      />
    </div>
  );
}