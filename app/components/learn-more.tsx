import { CircleQuestionMark } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type LearnMoreProps = React.ComponentProps<typeof Popover> & {
	children: React.ReactNode;
	contentProps?: React.ComponentProps<typeof PopoverContent>;
	triggerProps?: React.ComponentProps<typeof PopoverTrigger>;
};

export function LearnMore({
	children,
	contentProps,
	triggerProps,
	...props
}: LearnMoreProps) {
	return (
		<Popover {...props}>
			<PopoverTrigger
				{...triggerProps}
				render={<Button variant="outline" size="icon" />}
				className={cn("size-5 rounded-full", triggerProps?.className)}
			>
				<span className="sr-only">Learn more</span>
				<CircleQuestionMark className="size-4 [&>circle]:hidden" />
			</PopoverTrigger>
			<PopoverContent
				side="top"
				align="start"
				{...contentProps}
				className={cn("text-sm text-muted-foreground", contentProps?.className)}
			>
				{children}
			</PopoverContent>
		</Popover>
	);
}
