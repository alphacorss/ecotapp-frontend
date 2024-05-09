'use client';
import React from 'react';

import useSettings, { SettingFormFieldsUser } from './setting.hook';
import { InputComponent } from '@/app/_components/inputs/InputComponent';
import { InputComponentWithSelector } from '@/app/_components/inputs/InputComponentWithSelector';
import BackendError from '@/app/_components/utils/FormError';
import Loader from '@/app/_components/utils/Loader';
import { ModalComponent } from '@/app/_components/utils/Modals';
import { SuccessModalContent } from '@/app/_components/utils/Modals';
import { countries } from '@/app/_constants/countryCodes';
import { passwordForm, userForm } from '@/app/_constants/forms';
import { Button } from '@/components/ui/button';

const Settings = () => {
  const {
    errors,
    reset,
    watch,
    handleSubmit,
    isDirty,
    onSubmit,
    register,
    setValue,
    updated,
    setUpdated,
    isLoading,
    updateProfile,
    updatePassword,
    userQuery,
  } = useSettings();

  return (
    <React.Fragment>
      <ModalComponent
        open={updated}
        setOpen={() => setUpdated(false)}
        content={
          <SuccessModalContent
            actionBtnText="Ok"
            title="Success!"
            message="Profile updated successfully!"
            onConfirm={async () => {
              setUpdated(false);
              await userQuery.refetch();
              reset();
              window.location.reload();
            }}
          />
        }
      />

      <form onSubmit={handleSubmit(onSubmit)} className="min-h-full card w-full p-[56px]">
        <div className="flex flex-col gap-5 w-[min(100%,1440px)] mx-auto">
          <div className="w-full mb-14">
            <div className="mb-4">
              <h3 className="text-xl font-[600] text-gray-60 mb-1">Profile Information</h3>
              <p className="text-xs text-gray-400">Personalize and Manage your contact details</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-5">
              {userForm.map((input) => (
                <InputComponent
                  key={input.id}
                  id={input.id}
                  name={input.name}
                  label={input.label}
                  placeholder={input.placeholder}
                  error={errors[input.name as keyof SettingFormFieldsUser]?.message}
                  register={register}
                  disabled={input.name === 'email'}
                />
              ))}

              <InputComponentWithSelector
                inputId="phone"
                inputType="number"
                inputName="phone"
                inputLabel="Phone Number"
                inputPlaceholder="12345678"
                selectorName="country"
                arry={countries}
                setValue={setValue}
                watch={watch}
                register={register}
                inputError={errors.phone?.message}
                selectorError={errors.country?.message}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-5"></div>
          </div>
          <div className="w-full">
            <div className="mb-4">
              <h3 className="text-xl font-[600] text-gray-60 mb-1">Password</h3>
              <p className="text-xs text-gray-400">Change your password to keep your account secure</p>
            </div>
            <div className="grid md:grid-cols-2 gap-5"></div>
          </div>
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-5">
            {passwordForm.map((input) => (
              <InputComponent
                autoComplete="off"
                autoCorrect="off"
                autoFocus={false}
                isPassword
                key={input.id}
                id={input.id}
                name={input.name}
                label={input.label}
                placeholder={input.placeholder}
                error={errors[input.name as keyof SettingFormFieldsUser]?.message}
                register={register}
              />
            ))}
          </div>
          <div className="mt-10 w-full flex gap-x-10 gap-y-5 items-center">
            <Button type="button" variant="outline" className="w-full">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!isDirty || updateProfile.isPending || updatePassword.isPending}
              className="w-full"
            >
              {isLoading ? <Loader /> : 'Save Changes'}
            </Button>
          </div>
          <BackendError errors={errors} />
        </div>
      </form>
    </React.Fragment>
  );
};

export default Settings;
