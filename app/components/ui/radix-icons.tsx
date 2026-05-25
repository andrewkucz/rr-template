import {
	ArrowDown,
	ArrowUp,
	ArrowUpDown,
	Check,
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
	CircleEllipsis,
	CirclePlus,
	EyeOff,
	MoreHorizontal,
	SlidersHorizontal,
	X,
} from "lucide-react";
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function ArrowDownIcon(props: IconProps) {
	return <ArrowDown {...props} />;
}

export function ArrowUpIcon(props: IconProps) {
	return <ArrowUp {...props} />;
}

export function CaretSortIcon(props: IconProps) {
	return <ArrowUpDown {...props} />;
}

export function CheckIcon(props: IconProps) {
	return <Check {...props} />;
}

export function ChevronDownIcon(props: IconProps) {
	return <ChevronDown {...props} />;
}

export function ChevronLeftIcon(props: IconProps) {
	return <ChevronLeft {...props} />;
}

export function ChevronRightIcon(props: IconProps) {
	return <ChevronRight {...props} />;
}

export function Cross2Icon(props: IconProps) {
	return <X {...props} />;
}

export function DotsHorizontalIcon(props: IconProps) {
	return <MoreHorizontal {...props} />;
}

export function DoubleArrowLeftIcon(props: IconProps) {
	return <ChevronsLeft {...props} />;
}

export function DoubleArrowRightIcon(props: IconProps) {
	return <ChevronsRight {...props} />;
}

export function EyeNoneIcon(props: IconProps) {
	return <EyeOff {...props} />;
}

export function MixerHorizontalIcon(props: IconProps) {
	return <SlidersHorizontal {...props} />;
}

export function PlusCircledIcon(props: IconProps) {
	return <CirclePlus {...props} />;
}

export function CircleEllipsisIcon(props: IconProps) {
	return <CircleEllipsis {...props} />;
}
