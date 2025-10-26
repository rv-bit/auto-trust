import { motion } from "motion/react";
import React, { forwardRef, useCallback, useEffect, useId } from "react";

import { Textarea } from "@/components/ui/textarea";

import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MessageInputProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onSubmit' | 'onChange'> {
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
		<div className="dark:bg-sidebar/70 w-full rounded-[27px] bg-white/40 pl-0 pr-1.5 py-1.5 shadow-2xl">
			<div className="flex w-full items-end justify-center gap-2">
				<div className="flex size-full justify-center p-2 py-1 pr-0">
					<Textarea
						ref={ref}
						id={id}
						disabled={disabled}
						maxLength={props.maxLength}
						rows={1}
						placeholder="Type a message"
						value={value}
						onKeyDown={onHandleSubmit}
						onChange={onHandleOnChangeEvent}
						className="max-h-60 min-h-fit w-full resize-none overflow-y-auto border-none bg-transparent p-0 pb-0.5 pl-3 shadow-none focus-visible:ring-0 active:ring-0 disabled:cursor-not-allowed dark:bg-transparent"
					/>
				</div>

				<div className="items-end">
					<Button
						disabled={disabled}
						data-slot="input-button-submit"
						onClick={onSubmit}
						tooltip={{
							content: "Send",
							side: "top",
						}}
						className="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary hover:bg-primary/90 text-primary-foreground flex size-8 cursor-pointer items-center justify-center rounded-3xl text-sm font-medium whitespace-nowrap transition-all outline-none hover:scale-110 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
					>
						{!loading ? (
							<motion.span key="show-button" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }} className="mr-0.5">
								<Send size={24} />
							</motion.span>
						) : (
							<motion.span key="show-icon" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }} className="mr-px mb-1">
								<span className="loading loading-spinner loading-xs" />
							</motion.span>
						)}
					</Button>
				</div>
			</div>
		</div>
	);
});

MessageInput.displayName = "MessageInput";

export default MessageInput;
