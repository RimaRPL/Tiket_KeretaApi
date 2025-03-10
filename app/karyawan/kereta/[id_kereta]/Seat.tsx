import { KursiType } from "../../types"
import DropKursi from "./dropSeat"
import EditKursi from "./editSeat"

type props = {
    item: KursiType
}
const Seat = (myProp: props) => {
    return(
        <div className="size-20 rounded-md flex flex-col items-center justify-center bg-sky-700">
            <span className="text-white font-semibold">
                {myProp.item.seat_number}
            </span>

            <div className="rounded-md gap-3 flex flex-wrap justify-center items-center">
                <div className="flex gap-1">
                <EditKursi kursi={myProp.item} />
                <DropKursi kursi={myProp.item} />
                </div>

            </div>
        </div>
        
    )
}
export default Seat