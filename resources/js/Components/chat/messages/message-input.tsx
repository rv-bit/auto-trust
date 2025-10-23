import React, { useCallback, useEffect, useRef } from "react";

import { Textarea } from "@/components/ui/textarea";

export default function MessageInput({
	value,
	disabled,
	onSend,
	onChange,
}: {
	value: string;
	disabled: boolean;
	onSend: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
	const input = useRef<HTMLTextAreaElement | null>(null);

	const onHandleSubmit = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			onSend(e);
		}
	};

	const onHandleOnChangeEvent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setTimeout(() => {
			adjustHeight();
		}, 10);

		onChange(e);
	};

	const adjustHeight = useCallback(() => {
		const timeout = setTimeout(() => {
			if (!input.current) return;
			input.current.style.height = "auto";
			input.current.style.height = input.current.scrollHeight + 1 + "px";
		}, 100);

		return () => {
			clearTimeout(timeout);
		};
	}, []);

	useEffect(() => {
		adjustHeight();
		return () => {};
	}, [input]);

	return (
		<Textarea
			ref={input}
			disabled={disabled}
			value={value}
			rows={1}
			placeholder="Type a message"
			onKeyDown={onHandleSubmit}
			onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onHandleOnChangeEvent(e)}
			className="max-h-40 w-full resize-none overflow-y-auto rounded-r-none"
		/>
	);
}
