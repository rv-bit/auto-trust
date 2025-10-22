import { usePage } from "@inertiajs/react";
import { useMemo, useEffect, useState, useCallback } from "react";

import { Button } from "@/components/ui/button";

import MessageInput from "./message-input"

export default function MessageActions() {
    const [newMessage, setNewMessage] = useState<string>('');
    const [inputErrorMessage, setInputErrorMessage] = useState<string>('');
    const [messageEditing, setMessageEditing] = useState<boolean>(false);

    return (
        <div className="flex flex-wrap items-start border-t border-slate-700 dark:border-slate-300 py-3">
            <div className="order-1 flex-none md:order-2 md:flex-1 p-2">
               
               <Button className="group border-tequila-200 bg-rajah-200 hover:bg-rajah-200 hover:inset-ring-rajah-200 relative w-full overflow-hidden rounded-none border-2 px-3 py-6 inset-ring-2 inset-ring-black transition-shadow delay-75 duration-300">
                    <div className="absolute -left-16 h-[100px] w-10 -rotate-45 bg-gradient-to-r from-white/10 via-white/50 to-white/10 blur-sm duration-700 group-hover:left-[150%] group-hover:delay-200 group-hover:duration-700" />
                    <span className="font-bold text-black uppercase">Submit</span>
                </Button>

                <MessageInput />
            </div>
        </div>
    )
}