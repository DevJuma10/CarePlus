import Image from 'next/image'
import Link from 'next/link'
import logo from '../../../../../public/assets/icons/logo-full.svg'
import successGif from '../../../../../public/assets/gifs/success.gif'
import calenderIcon from '../../../../../public/assets/icons/calendar.svg'



import React from 'react'
import { getAppointment } from '@/lib/actions/appointment.actions'
import { Doctors } from '@/constants'
import { formatDateTime } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const Success = async ({params : { userId}, searchParams } : SearchParamProps) => {

    const appointmentId = (searchParams?.appointmentId as string) || '';

    const appointment = await getAppointment(appointmentId);

    const doctor = Doctors.find((doc) => doc.name === appointment.primaryPhysician)



  return (
<div className="flex h-screen max-h-screen px-[5%]" >
    <div className="success-img">
        <Link href='/'>
            <Image 
                src={logo}
                height={1000}
                width={1000}
                alt='logo'
                className='h-10 w-fit'

            />
        </Link>

        <section className="flex flex-col items-center">
            <Image 
                src={successGif}
                height={300}
                width={280}
                alt='success'
            />

            <h2 className="header mb-6 max-w-[600px] text-center">
                Your <span className="text-green-500">appointment request</span> has been successfully submitted!
            </h2>

            <p>We will be in touch shortly to confirm</p>

        </section>


        <section className="request-details">
            <p>Requested Appointment Details: </p>

            <div className="flex items-center gap-3">
                <Image 
                    src={doctor?.image}
                    alt='doctor'
                    height={100}
                    width={100}
                    className='size-6'
                />

                <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
            </div>

            <div className="flex gap-2">
                <Image 
                    src={calenderIcon}
                    height={24}
                    width={24}
                    alt='calender'
                />
                <p>{ formatDateTime(appointment.schedule).dateTime}</p>
            </div>
        </section>

        <Button variant='outline' className='shad-primary-btn' asChild>
            <Link href={`/patients/${userId}/new-appointment`} >
                New Appointment
            </Link>
        </Button>

        <p className="copywright">&copy; 2024 CarePlus</p>

    </div>s
</div>  )
}

export default Success