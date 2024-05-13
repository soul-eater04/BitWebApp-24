import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { HiOutlineLogout } from "react-icons/hi";
import { HiOutlineViewGrid  } from "react-icons/hi";
import { HiOutlineSave   } from "react-icons/hi";
import { HiOutlineDocumentAdd  } from "react-icons/hi";

import { motion } from "framer-motion";
import { IoIosArrowBack } from "react-icons/io";

const linkclasses = 'flex items-center gap-6 font-light p-2.5 hover:bg-neutral-700 hover:no-underline active:bg-neutral rounded-sm text-base';
const additionalLinks = [
   
    { text: "User-Form", icon: <HiOutlineDocumentAdd />,to:"/db/user-form"
}, 
{ text: "Academic-Form", icon: <HiOutlineDocumentAdd />,to:"/db/academic-form"
}, { text: "Award-Form", icon: <HiOutlineDocumentAdd />,to:"/db/award-form"
}, { text: "Exam-Form", icon: <HiOutlineDocumentAdd />,to:"/db/exam-form"
}, { text: "Higher Education-Form", icon: <HiOutlineDocumentAdd />,to:"/db/higher-education"
}, { text: "Placement-Form", icon: <HiOutlineDocumentAdd />,to:"/db/placement-one"
}, { text: "Project-Form", icon: <HiOutlineDocumentAdd />,to:"/db/project-form"
}, { text: "Internship-Form", icon: <HiOutlineDocumentAdd />,to:"/db/internship-form"
}, 
   
];
export default function Sidebar() {

    const Sidebar_animation = {
        open: {
            width: "15rem",
            transition: {
                damping: 40,
            },
        },
        closed: {
            width: "4rem",
            transition: {
                damping: 40,
            },
        },
    };
    const [isOpen, setIsOpen] = useState(true);
    return (
        <aside>
            <motion.div
                variants={Sidebar_animation}
                animate={isOpen ? "open" : "closed"}
                className='relative left-0 top-0 flex h-screen flex-col overflow-y-scroll overflow-x-hidden lg:overflow-y-scroll z-50 bg-yellow-400 p-3 text-white'
                style={{ scrollbarWidth: "none" }}
            >
                <div className='flex gap-2 px-1 py-3'>
                <img className="" src="/static/images/Birla_Institute_of_Technology_Mesra.png" alt="" />
                    <span className='px-1 ml-1 text-sm text-neutral-100'>BITWEB APP</span>
                </div>
                <div className='whitespace-pre flex-1 py-[1rem] text-[0.9rem] flex flex-col gap-0.5'>
    <Link className="text-zinc-800 mx-auto border-neutral-700" to="/">Home</Link>
    
    <div className={classNames('text-red-500 mt-[2rem] cursor-pointer border-t border-neutral-700', linkclasses)}>
        <span className="text-xl">
            <HiOutlineLogout />
        </span>
        Logout
    </div>
    
    <div onClick={() => setIsOpen(!isOpen)} className={classNames('text-red-500 cursor-pointer border-t border-neutral-700', linkclasses)}>
        <span className="text-xl">
            <IoIosArrowBack />
        </span>
        Collapse 
    </div>
  
    {additionalLinks.map((link, index) => (
    <Link to={link.to} key={index} className={classNames('cursor-pointer border-t text-zinc-800 hover:text-white border-neutral-700', linkclasses)}>
        <span className="text-xl">{link.icon}</span>
        {link.text}
    </Link>
))}

</div>

  
   
                
            </motion.div>
        </aside> 
    );
}