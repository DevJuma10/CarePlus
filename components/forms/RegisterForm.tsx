"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl } from "@/components/ui/form"
import CustomFormField from '../ui/CustomFormField'
import { useState } from "react"
import SubmitButton from "../ui/SubmitButton"
// ASSETS IMPORTS
import userIcon from '../../public/assets/icons/user.svg'
import emailIcon from '../../public/assets/icons/email.svg'
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"
import { FormFieldType } from "./PatientForm"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Doctors, GenderOptions, IdentificationTypes } from "@/constants"
import { Label } from "../ui/label"
import { SelectItem } from "../ui/select"
import Image from "next/image"
import { FileUploader } from "../ui/fileUploader"


export function RegisterForm( { user } : { user: User}) {

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false)

  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email:"",
      phone:"",
    },
  })

  const onSubmit = async ({email, name, phone}: z.infer<typeof UserFormValidation>) => {


    setIsLoading(true);


    try {
      const userData = { name, email, phone };

      console.log(userData)

      const newUser = await createUser(userData);

      if (newUser) {
        router.push(`/patients/${newUser.$id}/register`);
      }

    } catch (error) {
      console.log(error);
    }

    
    setIsLoading(false);
  };


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
        
        <section className="space-y-4">
          <h1 className="header">Welcome</h1>
          <p className="text-dark-700">Let us know more about yourself.</p>
        </section>

        {/* PERSONAL INFORMATION */}

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal Information</h2>
          </div>
        </section>

          {/* Name */}
        < CustomFormField 
          fieldType={FormFieldType.INPUT}
          control = {form.control}
          name=   "name"
          label="Full Name"
          placeHolder= 'John Doe'
          iconSrc= {userIcon}
          iconAlt='user'

        />


        {/* Email */}
        <div className="flex flex-col gap-6 xl:flex-row">

        < CustomFormField 
          fieldType={FormFieldType.INPUT}
          control = {form.control}
          name=   "email"
          label=  'Email'
          placeHolder='johndoe@gmail.com'
          iconSrc= {emailIcon}
          iconAlt='email'
  
        />

          {/* Phone Number */}
        < CustomFormField 
          fieldType= {FormFieldType.PHONE_INPUT}
          control = {form.control}
          name= "phone"
          label= 'Phone number'
          placeHolder= "+254710 182419"
  
        />
        </div>

        {/* Date of Birth */}
        <div className="flex flex-col gap-6 xl:flex-row">
          < CustomFormField 
            fieldType={FormFieldType.DATE_PICKER}
            control = {form.control}
            name=   "birthDate"
            label=  'Date of birth'
            placeHolder='johndoe@gmail.com'
            iconSrc= {emailIcon}
            iconAlt='email'
    
          />


        {/* Gender */}
          < CustomFormField 
            fieldType= {FormFieldType.SKELETON}
            control = {form.control}
            name= "gender"
            label= 'Gender'
            renderSkeleton= {(field) => (
              <FormControl>
                <RadioGroup  className="flex h-11 gap-6 xl:justify-between" onValueChange={field.onChange} defaultValue={field.value}>
                  {GenderOptions.map((option) => (
                    <div key={option} className="radio-group">
                      <RadioGroupItem   
                          value={option}
                          id={option}
                      />

                      <Label htmlFor={option}  className="cursor-pointer">
                        {option}
                      </Label>

                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
           
    
          />
        </div>

          {/* Address */}
        <div className="flex flex-col gap-6 xl:flex-row">

        < CustomFormField 
          fieldType={FormFieldType.INPUT}
          control = {form.control}
          name=   "address"
          label=  'Address'
          placeHolder='7 Floor, Chiromo Lane'
          iconAlt='address'
  
        />
          {/* Occupation */}
        < CustomFormField 
          fieldType= {FormFieldType.INPUT}
          control = {form.control}
          name= "occupation"
          label= 'Occupation'
          placeHolder= "Nurse"
  
        />
          
        </div>

            {/* Emergency Contact Name */}
        <div className="flex flex-col gap-6 xl:flex-row">

        < CustomFormField 
          fieldType={FormFieldType.INPUT}
          control = {form.control}
          name=   "emergencyContactName"
          label=  'Emergency contact name'
          placeHolder="Guardian's name"
  
        />
          {/* Emergency Contact Number */}
        < CustomFormField 
          fieldType= {FormFieldType.PHONE_INPUT}
          control = {form.control}
          name= "emergencyContactNumber"
          label= 'Emergenct contact number'
          placeHolder= "710182419"
  
        />
          
        </div>


        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Medical Information</h2>
          </div>
        </section>
        

            {/* Primary Physician */}
        < CustomFormField 
          fieldType= {FormFieldType.SELECT}
          control = {form.control}
          name= "priaryPhysician"
          label= 'Primary Physician'
          placeHolder= "Select a physician"
  
        >
          {Doctors.map((doctor,i) => (
            <SelectItem key={doctor.name +1 } value={doctor.name}>
              <div className="flex cursor-pointer items-center gap-2">
                <Image 
                  src={doctor.image}
                  width={32}
                  height={32}
                  alt={doctor.name}
                  className="rounded-full border border-dark-500"
                />
                <p>{doctor.name}</p>
              </div>
            </SelectItem>
          ))}

        </CustomFormField>


          {/* Isurance Provider */}
        <div className="flex flex-col gap-6 xl:flex-row">
        < CustomFormField 
          fieldType={FormFieldType.INPUT}
          control = {form.control}
          name=   "isuranceProvider"
          label=  'Insurance Provider'
          placeHolder="ex: Madison"
  
        />

        {/* Insurance Policy Number */}
        < CustomFormField 
          fieldType= {FormFieldType.INPUT}
          control = {form.control}
          name= "insurancePolicyNumber"
          label= 'Policy Number'
          placeHolder= "ex: Md-12345"
  
        />
        </div>

          {/* Allergies */}
        <div className="flex flex-col gap-6 xl:flex-row">

          < CustomFormField 
            fieldType={FormFieldType.TEXTAREA}
            control = {form.control}
            name=   "allergies"
            label=  'Allergies (if any)'
            placeHolder="ex: Peanut, Penicillin, Pollen"
    
          />

          {/* Current Medication */}
          < CustomFormField 
            fieldType= {FormFieldType.TEXTAREA}
            control = {form.control}
            name= "currentMdication"
            label= 'Current Medication'
            placeHolder= "ex: ibuprofen 200mg, Levothyroxide 50mcg"
    
          />
        </div>
          {/* Family Medical History */}
        <div className="flex flex-col gap-6 xl:flex-row">

        < CustomFormField 
            fieldType={FormFieldType.TEXTAREA}
            control = {form.control}
            name=   "familyMedicalHistory"
            label=  'Family medical history (if any)'
            placeHolder="ex: Alopecia"
    
          />

          {/* Past Medical History */}
          < CustomFormField 
            fieldType= {FormFieldType.TEXTAREA}
            control = {form.control}
            name= "pastMedicalHistory"
            label= 'Past Medical History'
            placeHolder= "ex: Ashma diagnosis in childhood"
          />
          
        </div>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Identification and Verification</h2>
          </div>
        </section>

          {/* Identification Type */}
        
        < CustomFormField 
          fieldType= {FormFieldType.SELECT}
          control = {form.control}
          name= "identificationType"
          label= 'Identification Type'
          placeHolder= "ex:Drivers Licence"
  
        >
          {IdentificationTypes.map((identification) => (
            <SelectItem key={identification} value={identification}>
              <div className="cursor-pointer">
              <p>{identification}</p>
              </div>
            </SelectItem>
          ))}

        </CustomFormField>

          {/* Identification Number */}

        < CustomFormField 
          fieldType= {FormFieldType.INPUT}
          control = {form.control}
          name= "identificationNumber"
          label= 'Identification Number'
          placeHolder= "ex: 123456789"
  
        />
       
          {/* FILE UPLOAD */}
          < CustomFormField 
            fieldType= {FormFieldType.SKELETON}
            control = {form.control}
            name= "identificationDocument"
            label= 'Scanned copy of identification document'
            renderSkeleton= {(field) => (
              <FormControl>
                <FileUploader files={field.value} onChange={field.onChange}/>
              </FormControl>
            )}
          
    
          />
          

          <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Privacy and Consent</h2>
          </div>
        </section>
        
        < CustomFormField 
          fieldType= {FormFieldType.CHECKBOX}
          control = {form.control}
          name= "treatmentConsent"
          label= 'I consent to treatment'
          
        />

        < CustomFormField 
          fieldType= {FormFieldType.CHECKBOX}
          control = {form.control}
          name= "disclosureConsent"
          label= 'I consent to disclosure of information'
          
        />

        < CustomFormField 
          fieldType= {FormFieldType.CHECKBOX}
          control = {form.control}
          name= "privacyConsent"
          label= 'I consent to privacy polcy'
          
        />

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  )
}
