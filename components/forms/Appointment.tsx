"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import CustomFormField from '../ui/CustomFormField'
import { useState } from "react"
import SubmitButton from "../ui/SubmitButton"
// ASSETS IMPORTS
import searchIcon from '../../public/assets/icons/appointments.svg'
import calenderIcon from '../../public/assets/icons/calendar.svg'
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"
import { FormFieldType } from "./PatientForm"
import Image from "next/image"
import { SelectItem } from "../ui/select"
import { Doctors } from "@/constants"



export function AppointmentFrom( { userId, patientId, type} : {
    userId: string,
    patientId: string,
    type: "create" | "cancel" | "schedule"

}) {

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


      const newUser = await createUser(userData);

      if (newUser) {
        router.push(`/patients/${newUser.$id}/register`);
      }

    } catch (error) {
      console.log(error);
    }

    
    setIsLoading(false);
  };


  let  buttonLabel;

  switch (type) {
    case 'cancel':
        buttonLabel = "Cancel Appointment";
        break;
    
    case 'create':
        buttonLabel = "Create Appointment";
        break;
    
    case 'schedule':
        buttonLabel = "Schedule Appointment";
        break;
  
    default:
        break;
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">New Appointment</h1>
          <p className="text-dark-700">Schedule Your First Appointment in 10 seconds</p>
        </section>

        {type !== 'cancel' && (
            <>
            
                < CustomFormField 
                    fieldType= {FormFieldType.SELECT}
                    control = {form.control}
                    name= "primaryPhysician"
                    label= 'Doctor'
                    placeHolder= "Select a doctor"
                    iconSrc={searchIcon}
                    iconAlt="search"
                    
                    >
                    {Doctors.map((doctor) => (
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


                <CustomFormField 
                    fieldType={FormFieldType.DATE_PICKER}
                    control={form.control}
                    name="schedule"
                    label="Expected appointment date"
                    placeHolder="Select appointment date & time"
                    showTimeSelect
                    dateFormat="MM/dd/yyyy - h:mm aa"
                />

                <div className="flex flex-col gap-6 xl:flex-row">

                < CustomFormField 
                    fieldType={FormFieldType.TEXTAREA}
                    control = {form.control}
                    name=   "reason"
                    label=  'Reason for appointment'
                    placeHolder="ex: Annual/monthly check-up"
                    
                    />

                < CustomFormField 
                    fieldType= {FormFieldType.TEXTAREA}
                    control = {form.control}
                    name= "notes"
                    label= 'Additional comments/notes'
                    placeHolder= "ex: Prefer morning appointments if possible"
                    />
                
                </div>
            </>
        )}

        {type === 'cancel' && (
            <>
               < CustomFormField 
                    fieldType= {FormFieldType.TEXTAREA}
                    control = {form.control}
                    name= "cancellationReason"
                    label= 'Reason for cancellation'
                    placeHolder= "Enter reason for cancellation"
                    /> 
            </>
        )}
        


        <SubmitButton isLoading={isLoading} className={`${type === 'cancel' ? 'shad-danger-btn' : 'shad-primary-btn'} w-full`}>
            {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  )
}
