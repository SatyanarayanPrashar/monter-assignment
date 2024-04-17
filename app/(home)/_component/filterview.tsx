"use client"

import { cn } from "@/lib/utils";
import axios from "axios";
import { ChevronDown, ChevronFirst, ChevronLast, FileDownIcon, Filter, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

interface Report {
    title: string;
}

export const FilterView = () => {
    const [content, setContent] = useState<Report[]>([]);
    const [loading, setLoading] = useState(false);
    const [pgNumber, setPgNumber] = useState(1);
    const [pgSize, setPgSize] = useState(6);
    const [dropDownVisible, setDropDownVisibility] = useState(false);
    const isMobile = useMediaQuery("(max-width: 768px)");
    
    useEffect(() => {
        if (!pgSize && !pgNumber) {
            fetchContent(pgNumber, pgSize);
        } else {
            fetchContent(pgNumber, pgSize);
        }
    }, [pgNumber, pgSize]);

    const fetchContent = async (pgNumber: number, pgSize: number) => {
        setLoading(true);
        const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=5b9496671e244ce6990752f8138f18bb&page=${pgNumber}&pageSize=${pgSize}`;

        try {
            const response = await axios.get(url);
            setContent(response.data.articles)
            setLoading(false);
        } catch (error) {
            console.error('Error fetching initial data:', error);
            setLoading(false);
        }
    };

    const handleSelectPageSize = (size: number) => {
        setPgSize(size);
        setDropDownVisibility(false);
    };
    const handlePageChange = (pageNumber: number) => {
        setPgNumber(pageNumber);
    };

    const renderPaginationButton = (pageNumber: number, label: number ) => {
        return (
            <div
                key={pageNumber}
                className={`flex border-[1px] rounded-lg py-[3px] px-3 ${pgNumber === pageNumber ? 'bg-orange-500 text-white' : ''}`}
                onClick={() => handlePageChange(pageNumber)}
                role="button"
            >
                <p>{label}</p>
            </div>
        );
    };

    return (
        <div className={cn("border-[1px] rounded-xl w-[70%] text-[#757575]", isMobile && "w-[100%] mx-[20px]")}>
            <div className={cn("flex justify-between my-5 mx-7", " mx-1")}>
                <div className={isMobile ? "hidden" : " block"}></div>
                <h2 className="text-[19.7px] font-[600] ">Recently Generated Reports</h2>
                <div className={cn("flex gap-2 mr-7", isMobile && "mr-0")}>
                    <Filter className="border-[2px] h-[28px] w-[28px] border-[#757575] rounded-lg p-[3px] bg-transparent"/>
                    <X className="border-[2px] h-[28px] w-[28px] border-[#757575] rounded-lg p-[3px] bg-transparent"/>
                </div>
            </div>

            <div className={"bg-slate-100 flex mt-4 text-[15px] font-[500] py-1"}>
                <p className={cn("w-[12rem] ml-7", isMobile && "ml-1 mr-[35px]")}>Date</p>
                <p className={cn("w-[57rem]", isMobile && "w-[50rem]")}>Report</p>
                <p className={cn("mr-7", isMobile && "mr-1")}>Download</p>
            </div>

            <div className="h-[60vh] border-b-[1px]">
                {loading ? (
                    <div className="h-full flex items-center justify-center">
                        <p>Loading...</p>
                    </div>
                ) : (
                    <div className="h-[60vh] border-b-[1px] text-[15px] flex flex-col overflow-y-auto">
                        {content.map((report, index) => (
                            <div className="flex font-[500] pt-5">
                                <div className={cn("w-[12rem] ml-7", isMobile && "w-[5rem] ml-1 mr-[20px]")}>
                                    <p>22.07.2021</p>
                                    <p className="text-[13px]">16:02 PM</p>
                                </div>
                                <p className={cn("w-[50rem] mr-[7rem] overflow-hidden whitespace-nowrap overflow-ellipsis", isMobile && "w-[20rem] mr-[3rem]")}>{report.title}</p>
                                <FileDownIcon className={cn("mr-[3.4rem] h-[28px] w-[28px]", isMobile && "mr-5")} /> 
                            </div>
                        ))}
                        {loading && <p>Loading...</p>}
                    </div>
                )}
            </div>

            <div className={cn(
                "flex py-4 gap-2 text-[15px] justify-center items-center",
                isMobile && "flex flex-col"
            )}>
                <div className="flex py-4 gap-2 text-[15px] justify-center items-center">
                    <button className="flex gap-1 items-center" role="button" onClick={() => handlePageChange(pgNumber - 1)} disabled={pgNumber - 1 < 1}>
                        <ChevronFirst />
                        <p>Prev</p>
                    </button>
                    {Array.from({ length: 5 }, (_, index) => renderPaginationButton(index + 1, index + 1))}
                    <button className="flex gap-1 items-center" role="button" onClick={() => handlePageChange(pgNumber + 1)} disabled={pgNumber + 1 > 5}>
                        <p>Next</p>
                        <ChevronLast />
                    </button>
                </div>

                <div className="flex ml-10 gap-2 items-center" role="button" onClick={() => setDropDownVisibility(!dropDownVisible)}>
                    <p>Rows per page</p>
                    <div className="flex border-[1px] rounded-lg py-[3px] px-2 items-center">
                        {dropDownVisible && (
                            <div className="flex flex-col absolute bg-white border rounded-lg ml-[-8.5px]">
                                {[...Array(9)].map((_, index) => (
                                    <div
                                        key={index}
                                        className={`py-2 px-4 cursor-pointer ${pgSize === index + 1 ? 'bg-orange-500 text-white' : ''}`}
                                        onClick={() => handleSelectPageSize(index + 1)}
                                    >
                                        {index + 1}
                                    </div>
                                ))}
                            </div>
                        )}
                        <p>{pgSize}</p>
                        <ChevronDown size={17} />
                    </div>
                </div>
            </div>
        </div>
    )
}