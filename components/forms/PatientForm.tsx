"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import CustomFormField from '../ui/CustomFormField'
import { useState } from "react"
import SubmitButton from "../ui/SubmitButton"
// ASSETS IMPORTS
import userIcon from '../../public/assets/icons/user.svg'
import emailIcon from '../../public/assets/icons/email.svg'
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"


export enum FormFieldType { 
  INPUT='input',
  TEXTAREA='textarea',
  PHONE_INPUT='phoneInput',
  CHECKBOX='checkbox',
  DATE_PICKER='datePicker',
  SELECT='select',
  SKELETON='skeleton'
}









export function PatientForm() {

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Welcome</h1>
          <p className="text-dark-700">Schedule Your First Appointment</p>
        </section>
        
        < CustomFormField 
          fieldType={FormFieldType.INPUT}
          control = {form.control}
          name=   "name"
          label=  'Full Name'
          placeHolder= 'John Doe'
          iconSrc= {userIcon}
          iconAlt='user'

        />

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

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  )
}
