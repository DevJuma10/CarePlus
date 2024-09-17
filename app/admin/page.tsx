import Image from 'next/image'
import Link from 'next/link'
import logo from '../../public/assets/icons/logo-full.svg'
import React from 'react'
import StatCard from '@/components/ui/statCard'
import appointmentsIcon from '../../public/assets/icons/appointments.svg'
import pendingIcon from '../../public/assets/icons/pending.svg'
import cancelledIcon from '../../public/assets/icons/cancelled.svg'
import { getRecentAppointmentList } from '@/lib/actions/appointment.actions'
import {DataTable} from '@/components/table/dataTable'
import {columns, Payment} from '@/components/table/columns'





const Admin = async () => {


    const appointments = await getRecentAppointmentList()

  return (
    <div className='mx-auto flex max-w-7xl flex-col space-y-14'>
        <header className="admin-header">

            <Link href='/'>

                <Image 
                    src={logo}
                    height={32}
                    width={162}
                    alt='logo'
                    className='h-8 w-fit'
                />
            </Link>
            
            <p className="text-16-semibold">Admin Dashboard</p>
        </header>

        <main className="admin-main">
            <section className="w-full space-y-4">
                <h1 className="header">Welcome</h1>
                <p className="text-dark-700">Start the day with managing new appointments</p>
            </section>

            <section className="admin-stat">
                <StatCard 
                    type='appointments'
                    count={appointments.scheduledCount}
                    label='Scheduled Appointments'
                    icon={appointmentsIcon}
                />

                <StatCard 
                    type='pending'
                    count={appointments.pendingCount}
                    label='pending Appointments'
                    icon={pendingIcon}
                />

                <StatCard 
                    type='cancelled'
                    count={appointments.cancelledCount}
                    label='cancelled Appointments'
                    icon={cancelledIcon}
                />
            </section>


            <DataTable  columns={columns} data={appointments.documents} />
        </main>
    </div>
  )
}

export default Admin