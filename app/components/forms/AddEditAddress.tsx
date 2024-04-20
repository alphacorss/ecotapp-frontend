import React from 'react';
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { z } from 'zod';

import { InputComponent } from '../inputs/InputComponent';
import { ComboBoxFormCountryState } from '../utils/ComboBoxes';
import { countries } from '@/app/constants/countryCodes';
import { addressFormFields } from '@/app/constants/forms';
import { TComboBoxSelector } from '@/app/types';
import { zodInputValidators } from '@/lib/utils';

const CountryStateGetter = require('countrycitystatejson');

const apt = zodInputValidators.twoNumbers;
const street = zodInputValidators.longText;
const country = zodInputValidators.dropDown;
const province = zodInputValidators.dropDown;
const city = zodInputValidators.name;
const postalCode = zodInputValidators.postalCode;

export const addressSchema = z.object({
  apt,
  street,
  country,
  province,
  city,
  postalCode,
});

export type TAddressForm = z.infer<typeof addressSchema>;

const AddEditAddress = ({
  register,
  watch,
  setValue,
  errors,
}: {
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
  setValue: UseFormSetValue<any>;
  errors: FieldErrors<any>;
}) => {
  const [availableStates, setAvailableStates] = React.useState<TComboBoxSelector[]>([]);
  const [availiableCountries, setAvailiableCountries] = React.useState<TComboBoxSelector[]>([]);

  React.useEffect(() => {
    const c: TComboBoxSelector[] = countries.map((country) => ({
      value: country.code,
      label: country.name,
    }));
    setAvailiableCountries(c);
  }, []);

  const countryValue = watch('country');
  React.useEffect(() => {
    const selectedCountry = countries.find(
      (country) => country?.name?.toLowerCase() === countryValue?.toLowerCase(),
    )?.code;

    const states: TComboBoxSelector[] = CountryStateGetter.getStatesByShort(selectedCountry)?.map((state: string) => ({
      name: state,
      label: state,
    }));
    setAvailableStates(states);
  }, [countryValue]);

  return (
    <div className="grid md:grid-cols-2 gap-5 w-full">
      {addressFormFields.map((input) => {
        if (input.name === 'country' || input.name === 'province') {
          const array: TComboBoxSelector[] = input.name === 'country' ? availiableCountries : availableStates;
          return (
            <div key={input.name} className="w-full flex flex-col gap-1">
              <ComboBoxFormCountryState
                label={input.label}
                title={input.label}
                data={array}
                setValue={setValue}
                watch={watch}
                selectorName={input.name}
                register={register}
                error={errors[input.name as keyof TAddressForm]?.message as string}
              />
            </div>
          );
        }
        return (
          <InputComponent
            key={input.name}
            id={input.name}
            name={input.name}
            label={input.label}
            placeholder={input.placeholder}
            error={errors[input.name as keyof TAddressForm]?.message as string}
            register={register}
          />
        );
      })}
    </div>
  );
};

export default AddEditAddress;
