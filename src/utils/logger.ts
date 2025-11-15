export const logger = {
	log: (message: string, ...args: any[]) => {
		if (process.env.NODE_ENV !== 'production') {
			console.log(`[LOG] ${message}`, ...args)
		}
	},
	error: (message: string, ...args: any[]) => {
		console.error(`[ERROR] ${message}`, ...args)
	}
}
