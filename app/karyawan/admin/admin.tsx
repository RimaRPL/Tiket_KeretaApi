"use client"


import { AdminType } from "../types"
import EditAdmin from "./editAdmin"
import DropAdmin from "./dropAdmin"
import ResetPassword from "./resetPassword"

type props = {
    item: AdminType
}
const Admin = (myProp: props) => {
    return (
        <div className="w-full flex flex-wrap my-2 border border-gray-100 rounded-md  bg-sky-50 hover:shadow-md transition-all duration-200">
            
            <div className="w-full p-2 md:w-4/12 flex flex-col">
                <small className="text-sm font-medium text-blue-500">
                    Nik
                </small>
                <span>
                    {myProp.item.nik}
                </span>
            </div>
            
            <div className="w-full p-2 md:w-4/12 flex flex-col">
                <small className="text-sm font-medium text-blue-500">
                    Nama Admin
                </small>
                <span>
                    {myProp.item.name}
                </span>
            </div>

            <div className="w-full p-2 md:w-4/12 flex flex-col">
                <small className="text-sm font-medium text-blue-500">
                    Username
                </small>
                <span>
                    {myProp.item.user_details.username}
                </span>
            </div>

            <div className="w-full p-2 md:w-4/12 flex flex-col">
                <small className="text-sm font-medium text-blue-500">
                    Alamat
                </small>
                <span>
                    {myProp.item.address}
                </span>
            </div>

            <div className="w-full p-2 md:w-4/12 flex flex-col">
                <small className="text-sm font-medium text-blue-500">
                    Phone
                </small>
                <span>
                    {myProp.item.phone}
                </span>
            </div>

            <div className="w-full p-2 md:w-2/12 flex flex-col">
                <small className="text-sm font-medium text-blue-500">
                    Opsi
                </small>
                <div className="flex gap-2 items-center">
                    <EditAdmin
                        admin={myProp.item} />
                    <DropAdmin
                        admin={myProp.item} />
                    <ResetPassword
                        admin={myProp.item} />
                </div>
            </div>
        </div>
    )
}
export default Admin