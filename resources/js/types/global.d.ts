import type { AxiosInstance } from "axios";
import type Echo from "laravel-echo";
import type Pusher from "pusher-js";

declare global {
	interface Window {
		axios: AxiosInstance;
		Echo: Echo<"reverb">;
		Pusher: typeof Pusher;
		showOpenFilePicker?: (options?: {
			multiple?: boolean;
			types?: {
				description: string;
				accept: Record<string, string[]>;
			}[];
		}) => Promise<FileSystemFileHandle[]>;
	}
}

export {};
