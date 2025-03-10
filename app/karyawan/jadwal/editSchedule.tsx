"use client"

import { useRouter } from "next/navigation"
import { KeretaType, ScheduleType } from "../types"
import { FormEvent, useState } from "react"
import { getCookie } from "@/helper/client-cookie"
import { axiosInstance } from "@/helper/api"
import { toast, ToastContainer } from "react-toastify"
import Modal from "@/components/Modal"
import DatePicker from "react-datepicker"

type props = {
    jadwal: ScheduleType
}

const EditSchedule = (myProp: props) => {
    const router = useRouter()
    const [show, setShow] = useState<boolean>(false)

    const [departured_location, setDepatureLocation] =
        useState<string>("")
    const [arrived_location, setArrivedLocation] =
        useState<string>("")
    const [departured_time, setDepatureTime] =
        useState<Date>(new Date())
    const [arrived_time, setArrivedTime] =
        useState<Date>(new Date())
    const [price, setPrice] =
        useState<number>(0)

    const openModal = () => {
        setShow(true)
        setArrivedLocation(myProp.jadwal.arrived_location)
        setDepatureLocation(myProp.jadwal.departured_location)
        setDepatureTime(new Date(myProp.jadwal.departured_time))
        setArrivedTime(new Date(myProp.jadwal.arrived_time))
        setPrice(myProp.jadwal.price)
    }

    const closeModal = () => {
        setShow(false)
    }

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            const TOKEN = getCookie(`token`)
            const url = `/schedule/${myProp.jadwal.id}`
            const requestData = {
                departured_location, departured_time, arrived_location, arrived_time, price
            }

            // hit endpoint to add kereta
            const response: any = await axiosInstance
                .put(url, requestData, {
                    headers: {
                        authorization: `Bearer ${TOKEN}`
                    }
                })

            const message = response.data.message
            if (response.data.success == true) {
                toast(message, {
                    containerId: `toastEditSchedule-${myProp.jadwal.id}`,
                    type: "success"
                })
                setShow(false)
                // reaload page
                setTimeout(() => router.refresh(), 1000)
            } else {
                toast(message, {
                    containerId: `toastEditSchedule-${myProp.jadwal.id}`,
                    type: "warning"
                })
            }
        } catch (error) {
            console.log(error);
            toast(
                `something wrong`,
                {
                    containerId: `toastEditSchedule-${myProp.jadwal.id}`,
                    type: "error"
                }
            )
        }
    }

    return (
        <div>
            <ToastContainer containerId={`toastEditSchedule-${myProp.jadwal.id}`} />
            <button type="button" onClick={() => openModal()} className="px-2 py-1 bg-sky-500 rounded-md hover:bg-sky-600 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>

            </button>

            <Modal isShow={show}>
                <form onSubmit={handleSubmit}>
                    {/* modal header */}
                    <div className="w-full p-3 rounded-t-lg">
                        <h1 className="font-semibold text-lg ">
                            Edit Jadwal Kereta
                        </h1>
                        <span className="text-sm text-slate-500">
                            Pastikan data yang diisi sudah benar
                        </span>
                    </div>

                    {/* modal body */}
                    <div className="w-full p-3">
                        <div className="my-2 border rounded-md">
                            <small className="text-xs font-semibold text-sky-500 p-2">
                                Berangkat Dari
                            </small>
                            <input type="text" id={`departured_location-${myProp.jadwal.id}`}
                                value={departured_location}
                                onChange={e => setDepatureLocation(e.target.value)}
                                className="w-full p-1 outline-none hover:border-b hover:border-b-sky-500"
                                required={true} />
                        </div>

                        <div className="my-2 border rounded-md">
                            <small className="text-xs font-semibold text-sky-500 p-2">
                                Waktu Keberangkatan
                            </small> <br />
                            <DatePicker
                                showTimeInput = {true}
                                className="w-full p-1 outline-none hover:border-b hover:border-b-sky-500"
                                id={`departured_time-${myProp.jadwal.id}`}
                                selected={new Date(departured_time)}
                                dateFormat={`dd MMMM yyyy HH:mm`}
                                onChange={date => setDepatureTime(date || new Date())} />
                        </div>

                        <div className="my-2 border rounded-md">
                            <small className="text-xs font-semibold text-sky-500 p-2">
                                Tiba Di
                            </small>
                            <input type="text" id={`arrived_location-${myProp.jadwal.id}`}
                                value={arrived_location}
                                onChange={e => setArrivedLocation(e.target.value)}
                                className="w-full p-1 outline-none hover:border-b hover:border-b-sky-500"
                                required={true} />
                        </div>

                        <div className="my-2 border rounded-md">
                            <small className="text-xs font-semibold text-sky-500 p-2">
                                Waktu Kedatangan
                            </small> <br />
                            <DatePicker
                                showTimeInput = {true}
                                className="w-full p-1 outline-none hover:border-b hover:border-b-sky-500"
                                id={`arrived_time-${myProp.jadwal.id}`}
                                selected={new Date(arrived_time)}
                                dateFormat={`dd MMMM yyyy HH:mm`}
                                onChange={date => setArrivedTime(date || new Date())} />
                        </div>

                        <div className="my-2 border rounded-md">
                            <small className="text-xs font-semibold text-sky-500 p-2">
                                Price
                            </small>
                            <input type="number" id={`price-${myProp.jadwal.id}`}
                                value={price}
                                onChange={e => setPrice(Number(e.target.value))}
                                className="w-full p-1 outline-none hover:border-b hover:border-b-sky-500"
                                required={true} />
                        </div>



                    </div>

                    {/* modal footer */}
                    <div className="w-full p-3 rounded-b-lg flex items-center justify-end gap-2">
                        <button
                            type="button" onClick={() => closeModal()}
                            className="px-4 py-2 rounded-md bg-slate-700 hover:bg-slate-600 text-white">
                            Gak Yakin
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-md bg-sky-700 hover:bg-sky-600 text-white">
                            Yakin
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    )


}
export default EditSchedule