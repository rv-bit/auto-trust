import { motion } from "motion/react";
import React, { forwardRef, useCallback, useEffect, useId } from "react";

import { Textarea } from "@/components/ui/textarea";

import { Send } from "lucide-react";

interface MessageInputProps {
	value: string;
	disabled: boolean;
	loading: boolean;
	onSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
	onSend: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const MessageInput = forwardRef<HTMLTextAreaElement, MessageInputProps>(({ value, disabled, loading, onSubmit, onSend, onChange, ...props }, ref) => {
	const id = useId();

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
			if (!ref || typeof ref === "function") return;
			if (!ref.current) return;

			ref.current.style.height = "auto";
			ref.current.style.height = ref.current.scrollHeight + 1 + "px";
		}, 100);

		return () => {
			clearTimeout(timeout);
		};
	}, [ref]);

	useEffect(() => {
		adjustHeight();
	}, [adjustHeight]);

	return (
		<div className="w-full *:not-first:mt-2">
			<div className="flex w-full items-center justify-center gap-2">
				<div className="size-full p-2">
					<Textarea
						ref={ref}
						disabled={disabled}
						id={id}
						value={value}
						rows={1}
						placeholder="Type a message"
						onKeyDown={onHandleSubmit}
						onChange={onHandleOnChangeEvent}
						className="max-h-40 w-full resize-none overflow-y-auto rounded-tr-xl rounded-tl-xl rounded-br-2xl rounded-bl-2xl border-none p-5 dark:bg-sidebar/40 shadow-2xl focus-visible:ring-0 active:ring-0 disabled:cursor-not-allowed"
					/>
				</div>

				<motion.button
					disabled={disabled}
					data-slot="input-button-submit"
					layoutId={`input-button-submit-${id}`}
					transition={{ type: "spring", stiffness: 300, damping: 20 }}
					onClick={onSubmit}
					className="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary hover:bg-primary/90 text-primary-foreground flex size-10 cursor-pointer items-center justify-center rounded-full text-sm font-medium whitespace-nowrap transition-colors outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
				>
					{!loading ? (
						<motion.span key="show-button" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }} className="mr-px">
							<Send className="size-4" />
						</motion.span>
					) : (
						<motion.span key="show-icon" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }} className="mr-px mb-1">
							<span className="loading loading-spinner loading-xs" />
						</motion.span>
					)}
				</motion.button>
			</div>
		</div>
	);
});

MessageInput.displayName = "MessageInput";

export default MessageInput;
