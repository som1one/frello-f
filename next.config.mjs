/* eslint-env node */
import path from 'path'

/** @type {import('next').NextConfig} */
const nextConfig = {
	sassOptions: {
		includePaths: [path.join(process.cwd(), 'styles')]
	},
	env: {
		SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL
	}
}

export default nextConfig
