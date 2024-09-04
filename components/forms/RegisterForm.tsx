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
import { GenderOptions } from "@/constants"
import { Label } from "../ui/label"


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

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal Information</h2>
          </div>
        </section>
        
        < CustomFormField 
          fieldType={FormFieldType.INPUT}
          control = {form.control}
          name=   "name"
          label="Full Name"
          placeHolder= 'John Doe'
          iconSrc= {userIcon}
          iconAlt='user'

        />

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

        < CustomFormField 
          fieldType= {FormFieldType.PHONE_INPUT}
          control = {form.control}
          name= "phone"
          label= 'Phone number'
          placeHolder= "+254710 182419"
  
        />
        </div>

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
            placeHolder= "+254710 182419"
    
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">

        < CustomFormField 
          fieldType={FormFieldType.INPUT}
          control = {form.control}
          name=   "address"
          label=  'Address'
          placeHolder='7 Floor, Chiromo Lane'
          iconAlt='address'
  
        />

        < CustomFormField 
          fieldType= {FormFieldType.INPUT}
          control = {form.control}
          name= "occupation"
          label= 'Occupation'
          placeHolder= "Nurse"
  
        />
          
        </div>


        <div className="flex flex-col gap-6 xl:flex-row">

        < CustomFormField 
          fieldType={FormFieldType.INPUT}
          control = {form.control}
          name=   "emergency contact"
          label=  'Emergency contact name'
          placeHolder="Guardian's name"
  
        />

        < CustomFormField 
          fieldType= {FormFieldType.PHONE_INPUT}
          control = {form.control}
          name= "emergency contact number"
          label= 'Emergenct contact number'
          placeHolder= "710182419"
  
        />
          
        </div>


        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Medical Information</h2>
          </div>
        </section>

        <div className="flex flex-col gap-6 xl:flex:row">
          
        </div>

        <div className="flex flex-col gap-6 xl:flex:row">
          
        </div>

        <div className="flex flex-col gap-6 xl:flex:row">
          
        </div>

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  )
}
