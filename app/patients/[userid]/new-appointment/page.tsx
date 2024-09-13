import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../../public/assets/icons/logo-full.svg'
import appointmentImage from '../../../../public/assets/images/appointment-img.png'
import { AppointmentFrom } from '@/components/forms/Appointment';
import { getPatient } from '@/lib/actions/patient.actions';

export default async function NewAppointment({ params : { userId}} : SearchParamProps) {

    const patient = await getPatient(userId);


    return (
      <div className="flex h-screen max-h-screen">  
        <section className="remove-scrollbar container my-auto">
          <div className="sub-container max-w-[860px] flex-1 justify-between">
            <Image
              src={logo}
              height={1000}
              width={1000}
              alt="logo"
              className="mb-12 h-10 w-fit"
            />
  

                <AppointmentFrom  
                    type='create'
                    userId={userId}
                    patientId={patient.$id}
                />

              <p className="copywright mt-10 py-12">
                &copy; 2024 CarePlus
              </p>

  
          </div>
        </section>
  
        <Image
            src={appointmentImage}
            height={1000}
            width={1000}
            priority={true}
            alt="appointment"
            className="side-img max-w-[390px] bg-bottom"
  
        />
      </div>
      
    );
  }