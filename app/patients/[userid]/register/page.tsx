import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import logo from '../../../../public/assets/icons/logo-full.svg'
import onboardingImage from '../../../../public/assets/images/register-img.png'
import { RegisterForm } from '@/components/forms/RegisterForm'
import { getPatient, getUser } from '@/lib/actions/patient.actions'

const Register = async ({params : { userId }} : SearchParamProps) => {


    
  const user = await getUser( userId )

  console.log(user)
  

  return (
    <div className="flex h-screen max-h-screen">
      


    <section className="remove-scrollbar container">
      <div className="sub-container max-w-[860px] flex-1 flex-col">
        <Image
          src={logo}
          height={1000}
          width={1000}
          alt="logo"
          className="mb-12 h-10 w-fit"
        />

        <RegisterForm  user={user}/>


        <div className="text-14-regular mt-20 flex justify-between">
          <p className="justify-items-end text-dark-600 xl:text-left">
          &copy; 2024 CarePlus
          </p>

        </div>

      </div>
    </section>

    <Image
        src={onboardingImage}
        height={1000}
        width={1000}
        priority={true}
        alt="doctor-onboading-image"
        className="side-img max-w-[390px]"

    />
  </div>
  )
}

export default Register