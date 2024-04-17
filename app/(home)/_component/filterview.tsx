"use client"

import { cn } from "@/lib/utils";
import axios from "axios";
import { ChevronDown, ChevronFirst, ChevronLast, FileDownIcon, Filter, X } from "lucide-react";
import { useEffect, useState } from "react";

interface Article {
    source: { id: string; name: string };
    author: string | null;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
  }

export const FilterView = () => {
    const [content, setContent] = useState<Article[]>([]);
    const [loading, setLoading] = useState(false);
    const [pgNumber, setPgNumber] = useState(1);
    const [pgSize, setPgSize] = useState(3);
    const [dropDownVisible, setDropDownVisibility] = useState(false)
    
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
            <div className="h-[60vh] border-b-[1px]">
                {loading ? <p>Loading...</p> : (
                    <div className="h-[60vh] border-b-[1px] text-[16px] flex flex-col overflow-y-auto">
                        {content.map((article, index) => (
                            <div className="flex font-[500] pt-5">
                                <div className="w-[12rem] ml-7">
                                    <p>22.07.2021</p>
                                    <p className="text-[13px]">16:02 PM</p>
                                </div>
                                {/* <p className="w-[50rem]">APP_URL_USAGE_(Exclude_Half_Days)_3_6_2021_3_31_2021.csv</p> */}
                                <p className="w-[50rem]  mr-[7rem]">{article.title}</p>
                                <FileDownIcon className="mr-[3.4rem]" size={28}/> 
                            </div>
                        ))}
                        {loading && <p>Loading...</p>}
                    </div>
                )}
            </div>

            <div className="flex py-4 gap-2 text-[15px] justify-center items-center">
                
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
                    <div className={`flex border-[1px] rounded-lg py-[3px] px-2 items-center`}>
                        {dropDownVisible && (
                            <div className="flex flex-col absolute bg-white border rounded-lg mt-2">
                                {[...Array(10)].map((_, index) => (
                                    <div
                                        key={index}
                                        className={`py-2 px-4 cursor-pointer ${pgSize === index + 1 ? 'bg-purple-500 text-white' : ''}`}
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