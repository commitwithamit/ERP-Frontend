import { BsBuilding, BsPersonGear } from "react-icons/bs";
import { RiKey2Line } from "react-icons/ri";

import AttendancePieChart from "./AttendancePieChart";

export default function ExtraDetails() {
    return (
        <div className="col w-[50%] flex flex-col justify-between gap-6">
            <div className="flex flex-wrap gap-6">
                {/* role */}
                <div className="shadow-box p-3 pr-4 flex gap-2">
                    <span className="bg-amber-800 text-secondary p-2 rounded-md">
                        <BsPersonGear className="text-secondary" />
                    </span>
                    <span className="flex flex-col" style={{ lineHeight: "16px" }}>
                        <em className="font-medium text-xs">Role</em>
                        Frontend Developer
                    </span>
                </div>
                {/* Department */}
                <div className="shadow-box p-3 pr-4 flex gap-2">
                    <span className="bg-blue-800 text-secondary p-2 rounded-md">
                        <BsBuilding className="text-secondary" />
                    </span>
                    <span className="flex flex-col" style={{ lineHeight: "16px" }}>
                        <em className="font-medium text-xs">Department</em>
                        UI Design
                    </span>
                </div>
                {/* permission */}
                <div className="shadow-box p-3 pr-4 flex gap-2">
                    <span className="bg-fuchsia-900 text-secondary p-2 rounded-md">
                        <RiKey2Line className="text-secondary" />
                    </span>
                    <span className="flex flex-col" style={{ lineHeight: "16px" }}>
                        <em className="font-medium text-xs">Permissions</em>
                        Admin
                    </span>
                </div>
            </div>

            <div className="flex justify-center items-center shadow-box p-0">
                <AttendancePieChart />
            </div>
        </div>
    )
}
