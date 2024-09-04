"use client"

import React from 'react'
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Control } from 'react-hook-form'
import { FormFieldType } from '../forms/PatientForm'
import Image from 'next/image'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import calenderSvg from '../../public/assets/icons/calendar.svg'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { Select, SelectContent, SelectTrigger, SelectValue } from './select'
 
interface CustomProps {
    control:Control<any>,
    fieldType:FormFieldType,
    name:string,
    label?:string,
    placeHolder?:string,
    iconSrc?:string,
    iconAlt?:string,
    disabled?:boolean,
    dateFormat?:string,
    showTimeSelect?:boolean,
    children?:React.ReactNode,
    renderSkeleton?:(field:any) => React.ReactNode
   
}

const RenderField = ({field, props}: {field: any; props:CustomProps}) => {
    const { fieldType, iconSrc, iconAlt, placeHolder, showTimeSelect, dateFormat, renderSkeleton } = props


        switch (fieldType) {
            case FormFieldType.INPUT:
                return(
                    <div className="flex rounded-md-border border-dark-500 bg-dark-400">
                        {iconSrc && (
                            <Image 
                                src={iconSrc}
                                height={24}
                                width={24}
                                alt={iconAlt || 'icon'}
                                className='ml-2'
                            />
                        )}
                        <FormControl>
                            <Input 
                                placeholder={placeHolder}
                                {...field}
                                className='shad-input border-0'
                            />
                        </FormControl>
                    </div>
                )

            case FormFieldType.PHONE_INPUT:
                return (
                    <PhoneInput
                        defaultCountry='KE'
                        international
                        // withCounryCallingCode
                        placeholder={placeHolder}
                        value={field.value as E164Number | undefined}
                        onChange={field.onChange}
                        className='input-phone'
                    />
                )




            case FormFieldType.DATE_PICKER:
                return (
                    <div className="flex rounded-md border-dark-500 bg-dark-400">
                        <Image 
                            src={calenderSvg}
                            height={24}
                            width={24}
                            alt='calender'
                            className='ml-2'

                        />

                        <FormControl>
                            <DatePicker 
                                selected={field.value} 
                                onChange={(date) => field.onChange(date)} 
                                dateFormat={dateFormat ?? 'MM/dd/yy'}
                                showTimeSelect={showTimeSelect ?? false}
                                timeInputLabel = "Time:"
                                wrapperClassName="date-picker"
                                />
                                
                        </FormControl>
                    </div>

                )


            case   FormFieldType.SKELETON:
                return(
                    renderSkeleton ?  renderSkeleton
                    (field)   : null
                )
            

            case FormFieldType.SELECT:
                return(
                    <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger className='shad-select-trigger'>
                                    <SelectValue placeholder={props.placeHolder}/>
                                </SelectTrigger>
                            </FormControl>

                            <SelectContent className='shad-select-content'>
                                {props.children}
                            </SelectContent>
                        </Select>
                    </FormControl>
                )

            default:
                break;

        }

}

const CustomFormField = ( props: CustomProps) => {

    const {control, fieldType,name, label} = props

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (

                <FormItem className='flex-1'>
                    {fieldType != FormFieldType.CHECKBOX && label &&  (
                        <FormLabel>{label}</FormLabel>
                    )}

                    <RenderField 
                        field={field}
                        props={props}
                    />

                    <FormMessage
                        className='shad-error'
                    />
                </FormItem>
            )}
        />
    )
}
export default CustomFormField

