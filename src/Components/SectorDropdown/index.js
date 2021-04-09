import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import RightBoxInputs from './Style';
import { Label } from '../UserDropdown/Style';

const SectorDropdown = ({ setSector, sectorID }) => {
  const [id, setId] = useState('');
  const options = [
    { value: 'DPSS', label: 'DPSS' },
    { value: 'Clinica', label: 'Clinica' },
    { value: 'Especial', label: 'Especial' },
  ];
  const [index, setIndex] = useState();

  useEffect(() => {
    let l = 0;
    options.map((x) => {
      if (x.value === sectorID) {
        l = x;
      }
      return 0;
    });
    setIndex(l);
  }, [sectorID]);

  useEffect(() => {
    setSector(id.label);
  }, [id]);

  const customStyles = {
    option: (provided) => ({
      ...provided,
      borderBottom: '1px dotted pink',
      color: 'black',
      padding: '5%',
    }),
    control: () => ({
      color: 'white',
      display: 'flex',
      borderRadius: '10px',
      border: '1px solid #FFFFFF',
      width: '25vw',
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
      const color = 'white';
      return {
        ...provided, opacity, transition, color,
      };
    },
  };
  return (
    <RightBoxInputs>
      <Label>
        Setor:
      </Label>
      <Select
        defaultValue={options[index]}
        placeholder="Setor"
        styles={customStyles}
        options={options}
        onChange={(value) => setId(value)}
      />
    </RightBoxInputs>
  );
};

export default SectorDropdown;
