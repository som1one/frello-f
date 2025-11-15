"use client"; // Ensure this file is treated as a client-side component

import { QueryClient, QueryClientProvider } from 'react-query';

import styles from './ChatPage.module.scss';
import { NewChat } from '@/app/components/screens/app/chat/NewChat';

// Define queryClient
const queryClient = new QueryClient();

export default function ChatPageClient() {
	return (
		<QueryClientProvider client={queryClient}>
			<div className={styles.container}>
				<NewChat/>
			</div>
		</QueryClientProvider>
	);
}
