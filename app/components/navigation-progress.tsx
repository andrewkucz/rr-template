import { useEffect, useState } from "react";
import { useNavigation } from "react-router";

export function NavigationProgress() {
	const navigation = useNavigation();
	const [progress, setProgress] = useState(0);
	const isLoading = navigation.state !== "idle";

	useEffect(() => {
		if (isLoading) {
			setProgress(80);
		} else {
			setProgress(100);
			const timeout = window.setTimeout(() => setProgress(0), 150);
			return () => window.clearTimeout(timeout);
		}
	}, [isLoading]);

	return (
		<div
			aria-hidden="true"
			className="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 bg-muted-foreground/80 transition-[width,opacity] duration-200"
			style={{
				width: `${progress}%`,
				opacity: progress === 0 ? 0 : 1,
			}}
		/>
	);
}
