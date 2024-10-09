"use client";

import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function HomePage() {
    return <div className="flex bg-neutral-950 items-center justify-center h-screen"><Loader2 className="size-16 animate-spin text-muted-foreground" />asdasdasdasd</div>;
}