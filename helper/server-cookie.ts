/** cookie
 * cookie: tempat penyimpanan pada browser
 * biasanya untuk menyimpan data sesi user
 * session
 */

import Cookies from "js-cookie"
import { cookies } from "next/headers"


export const getServerCookie = async (
    key: string
): Promise<string> => {
    return (
        await cookies()).get(key)?.value || ""

}

