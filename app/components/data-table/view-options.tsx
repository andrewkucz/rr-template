import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import type { Table } from "@tanstack/react-table";
import { DropdownMenu as BaseDropdownMenu } from "radix-ui";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

type DataTableViewOptionsProps<TData> = {
	table: Table<TData>;
};

export function DataTableViewOptions<TData>({
	table,
}: DataTableViewOptionsProps<TData>) {
	return (
		<DropdownMenu modal={false}>
			<BaseDropdownMenu.Trigger asChild>
				<Button
					variant="outline"
					size="sm"
					className="ms-auto hidden h-8 lg:flex"
				>
					<MixerHorizontalIcon className="size-4" />
					View
				</Button>
			</BaseDropdownMenu.Trigger>
			<DropdownMenuContent align="end" className="w-37.5">
				<DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{table
					.getAllColumns()
					.filter(
						(column) =>
							typeof column.accessorFn !== "undefined" && column.getCanHide(),
					)
					.map((column) => {
						return (
							<DropdownMenuCheckboxItem
								key={column.id}
								className="capitalize"
								checked={column.getIsVisible()}
								onCheckedChange={(value) => column.toggleVisibility(!!value)}
							>
								{column.id}
							</DropdownMenuCheckboxItem>
						);
					})}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
