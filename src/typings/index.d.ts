declare global {
	interface Error {
		response?: {
			data?: string;
		};
	}
}

export {};
