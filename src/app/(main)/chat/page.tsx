// This is the main entry for the Chat page and metadata, server-side only
import type { Metadata } from 'next';
import ChatPageClient from './ChatPageClient'; // Import the client-side component
import { NO_INDEX_PAGE } from '@/constants/seo.constants';

export const metadata: Metadata = {
	title: 'Чат',
	...NO_INDEX_PAGE,
};

export default function ChatPage() {
	return <ChatPageClient />;
}
