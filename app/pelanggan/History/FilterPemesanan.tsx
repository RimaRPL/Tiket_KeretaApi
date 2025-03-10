"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
    start_date : string;
    end_date : string;
}

const FilterPemesanan = (myProp : Props) => {
    const [start_date, setStartDate] = useState<string>("")
    const [end_date, setEndDate] = useState<string>("")
    const router = useRouter()

    const handleSearch = () => {
        if (
            start_date !== "" &&
            end_date !== ""
        ){
            router.push(`/pelanggan/History?start_date=${start_date}&end_date=${end_date}`)
        }
    }

    // digunakan untuk update data saat komponen ini dimuat ulang
        useEffect(() => {
            setStartDate(myProp.start_date)
            setEndDate(myProp.end_date)
        },[myProp])
    
        return (
            <div className="w-full my-5 flex flex-wrap items-center">
                <div className="w-full md:w-1/2 p-3">
                    <strong className="font-semibold text-white">
                        Tanggal Awal
                    </strong><br />
                    <input type="date" id={`start_date`}
                        className="w-full border p-2 rounded-md" 
                        value={start_date}
                        onChange={e=> setStartDate(e.target.value)}/>
                </div>
    
                <div className="w-full md:w-1/2 p-3">
                    <strong className="font-semibold text-white">
                        Tanggal Akhir
                    </strong><br />
                    <input type="date" id={`end_date`}
                        className="w-full border p-2 rounded-md"
                        value={end_date}
                        onChange={e=> setEndDate(e.target.value)} />
                </div>
    
                <button type="button" onClick={() => handleSearch()}
                    className="mx-3 px-4 py-2 rounded-md bg-orange-600 hover:bg-orange-500 text-white">
                        
                    Filter
                </button>
            </div>
        )
}
export default FilterPemesanan