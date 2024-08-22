import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button"
import logo from '../public/assets/icons/logo-full.svg'
import onboardingImage from '../public/assets/images/onboarding-img.png'
import { PatientForm } from "@/components/forms/PatientForm";


export default function Home() {
  return (
    <div className="flex h-screen max-h-screen">
      
      {/* TODO: ADD VERIFACTION */}

      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src={logo}
            height={1000}
            width={1000}
            alt="logo"
            className="mb-12 h-10 w-fit"
          />

          <PatientForm  />

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
            &copy; 2024 CarePlus
            </p>

            <Link href='/?admin=true' className="text-green-500">Admin</Link>
          </div>

        </div>
      </section>

      <Image
          src={onboardingImage}
          height={1000}
          width={1000}
          priority={true}
          alt="doctor-onboading-image"
          className="side-img max-w-[50%]"

      />
    </div>
    
  );
}
