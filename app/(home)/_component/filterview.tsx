import { ChevronDown, ChevronFirst, ChevronLast, FileDownIcon, Filter, X } from "lucide-react"

export const FilterView = () => {
    return (
        <div className="border-[1px] rounded-xl w-[70%] text-[#757575]">
            <div className="flex justify-between my-5 mx-7">
                <div></div>
                <h2 className="text-[19.7px] font-[600] ">Recently Generated Reports</h2>
                <div className="flex gap-2">
                    <Filter className="border-[2px] h-[28px] w-[28px] border-[#757575] rounded-lg p-[3px] bg-transparent"/>
                    <X className="border-[2px] h-[28px] w-[28px] border-[#757575] rounded-lg p-[3px] bg-transparent"/>
                </div>
            </div>

            <div className="bg-slate-100 flex mt-4 text-[16px] font-[500] py-1">
                <p className="w-[12rem] ml-7">Date</p>
                <p className="w-[50rem]">Report</p>
                <p className="mr-7">Download</p>
            </div>

            <div className="h-[60vh] border-b-[1px] text-[16px] flex flex-col gap-6 mt-5">
                <div className="flex font-[500]">
                    <div className="w-[12rem] ml-7">
                        <p>22.07.2021</p>
                        <p className="text-[13px]">16:02 PM</p>
                    </div>
                    <p className="w-[50rem]">APP_URL_USAGE_(Exclude_Half_Days_3_6_2021_3_31_2021.csv)</p>
                    <FileDownIcon className="mr-[3.4rem]" size={28}/> 
                </div>
            </div>

            <div className="flex py-4 gap-2 text-[15px] justify-center items-center">
                <div className="flex gap-1 items-center">
                    <ChevronFirst />
                    <p>Prev</p>
                </div>
                <div className="flex border-[1px] rounded-lg py-[3px] px-3">
                    <p>1</p>
                </div>
                <div className="flex border-[1px] rounded-lg py-[3px] px-3">
                    <p>2</p>
                </div>
                <div className="flex border-[1px] rounded-lg py-[3px] px-3">
                    <p>3</p>
                </div>
                <div className="flex border-[1px] rounded-lg py-[3px] px-3">
                    <p>4</p>
                </div>
                <div className="flex border-[1px] rounded-lg py-[3px] p-3">
                    <p>5</p>
                </div>
                <div className="flex gap-1 items-center">
                    <p>Next</p>
                    <ChevronLast />
                </div>
                <div className="flex ml-10 gap-2 items-center">
                    <p>Rows per page</p>
                    <div className="flex border-[1px] rounded-lg py-[3px] px-2">
                        <p>10</p>
                        <ChevronDown/>
                    </div>
                </div>
            </div>
        </div>
    )
}