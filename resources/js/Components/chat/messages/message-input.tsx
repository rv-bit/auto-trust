import React from "@inertiajs/react";
import { useRef, useEffect, useState, useCallback } from "react";

import { Textarea } from "@/components/ui/textarea";

export default function MessageInput({
    value,
    onSend,
    onChange,
}: {
    value: string;
    onSend: () => void;
    onChange: (e: React.MouseEvent) => void;
}) {
    const input = useRef<HTMLTextAreaElement | null>(null);

    const onHandleSubmit = (e: React.KeyboardEventHandler<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			onSend();
		}
	};

    const onHandleOnChangeEvent = (e: React.ChangeEventHandler<HTMLTextAreaElement> | undefined) => {
		setTimeout(() => {
			adjustHeight();
		}, 10);

		onChange(e);
	};

    const adjustHeight = useCallback(() => {
        const timeout = setTimeout(() => {
            if (!input.current) return;
            input.current.style.height = 'auto';
            input.current.style.height = input.current.scrollHeight + 1 + "px";
        }, 100)

        return () => {
            clearTimeout(timeout)
        }
    }, [])

    useEffect(() => {
        adjustHeight();
        return () => {}
    }, [input])

    return (
        <Textarea 
            ref={input}
            value={value}
            rows={1}
            placeholder="Type a message"
            onKeyDown={onHandleSubmit}
            onChange={(e: React.MouseEvent) => onHandleOnChangeEvent(e)}
            className="max-h-40 overflow-y-auto resize-none rounded-r-none w-full"
        />
    )
}