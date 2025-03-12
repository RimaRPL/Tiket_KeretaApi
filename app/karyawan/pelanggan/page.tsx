export const dynamic = "force-dynamic";
//function to get all data kereta 
import { getServerCookie } from "@/helper/server-cookie"
import { UserType } from "../types"
import { axiosInstance } from "@/helper/api"
import AddUser from "./addUser"
import User from "./user"

const getUser = 
    async (): Promise<UserType[]> => {
        try {
            // get token from cookie
            const TOKEN = await getServerCookie(`token`)
            const url = `/customer`
            // hit endpoint
            const response: any =
            await axiosInstance
            .get(url, {
                headers: {
                    authorization:`Bearer ${TOKEN}`
                }
            })
            if(response.data.success == true){
                return response.data.data
            }
            return[]
        } catch (error) {
            console.log(error)
            return[]
        }

}

const UserPage = async () => {
    // call function to load data kereta from backend
    // await karena data get kereta bertipe promise

    const dataUser = await getUser()
    return(
        <div className="w-full p-5 bg-white">
            <h1 className="text-xl font-semibold">Data User</h1>
            <span className="text-sm text-slate-400">
                Halaman ini memuat daftar Admin yang tersedia 
            </span>

            <div className="my-3">
                <AddUser/>
                {/* mapping data kereta */}
                {
                    dataUser.map((user, index) => (
                        <User
                            item={user}
                            key={`user-${index}`}
                        />
                    ))
                }
            </div>
            
        </div>
    )

}
export default UserPage
