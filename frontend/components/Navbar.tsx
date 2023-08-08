import { Burger, Button, Container, Header, Input, Paper, Select, Text, Transition } from "@mantine/core";
import { DateRangePicker } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import * as emoji from "node-emoji";
import { Dispatch, SetStateAction, useState } from "react";

interface NavbarProps {
	query: {
		search: string;
		startDate: string;
		endDate: string;
		value: string;
	};
	setQuery: Dispatch<
		SetStateAction<{
			search: string;
			startDate: string;
			endDate: string;
			value: string;
		}>
	>;
}

const Navbar = ({ query, setQuery }: NavbarProps) => {
	const [opened, { toggle }] = useDisclosure(false);
	const [search, setSearch] = useState("");
	const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
	const [value, setValue] = useState<string | null>("All");

	const handleSearch = () => {
		if (dateRange[0]) {
			dateRange[0].setHours(0, 0, 0, 0);
		}

		if (dateRange[1]) {
			dateRange[1].setHours(23, 59, 59, 999);
		}

		setQuery({
			...query,
			search,
			startDate: dateRange[0] ? `${dateRange[0]?.getTime()}` : "",
			endDate: dateRange[1] ? `${dateRange[1]?.getTime()}` : "",
			value: value || "",
		});
	};

	const handleReset = () => {
		setQuery({ search: "", startDate: "", endDate: "", value: "" });
		setSearch("");
		setDateRange([null, null]);
		setValue("");
	};

	return (
		<Header height={80} withBorder fixed top={0}>
			<Container className="flex h-20 items-center justify-between" size="xl">
				<Text size="xl" weight="bold">
					Wall of Recognitions
				</Text>
				<div className="hidden items-end justify-center space-x-4 lg:flex">
					<Input.Wrapper label="Search">
						<Input
							placeholder="Search by name or message"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
					</Input.Wrapper>
					<DateRangePicker
						value={dateRange}
						onChange={setDateRange}
						allowSingleDateInRange
						label="Date Range"
						dropdownPosition="bottom-start"
						dropdownType="popover"
					/>
					<Select
						label="Company Value"
						dropdownPosition="bottom"
						placeholder="Pick one"
						value={value}
						onChange={setValue}
						data={[
							{ value: ":heart: Empathy", label: emoji.emojify(":heart: Empathy") },
							{
								value: ":woman-tipping-hand: Courtesy",
								label: emoji.emojify(":woman-tipping-hand: Courtesy"),
							},
							{ value: ":sunflower: Thriving", label: emoji.emojify(":sunflower: Thriving") },
							{ value: ":hammer: Craftsmanship", label: emoji.emojify(":hammer: Craftsmanship") },
							{
								value: ":man-gesturing-ok: Playfulness",
								label: emoji.emojify(":man-gesturing-ok: Playfulness"),
							},
							{
								value: ":raised_hands: Solidarity",
								label: emoji.emojify(":raised_hands: Solidarity"),
							},
						]}
					/>
					<div className="flex space-x-4">
						<Button onClick={handleSearch}>Search</Button>
						<Button
							onClick={handleReset}
							variant="outline"
							display={
								query.search === "" &&
								query.startDate === "" &&
								query.endDate === "" &&
								query.value === ""
									? "none"
									: "flex"
							}
						>
							Reset Filters
						</Button>
					</div>
				</div>
				<Burger opened={opened} onClick={toggle} className="lg:hidden" size="sm" />
				<Transition transition="pop-top-right" duration={200} mounted={opened}>
					{(styles) => (
						<Paper
							className="absolute left-0 right-0 top-20 h-[100vh] space-y-2 overflow-hidden p-4"
							withBorder
							style={styles}
						>
							<Input.Wrapper label="Search">
								<Input
									placeholder="Search by name or message"
									value={search}
									onChange={(e) => setSearch(e.target.value)}
								/>
							</Input.Wrapper>
							<DateRangePicker
								value={dateRange}
								onChange={setDateRange}
								label="Date Range"
								allowSingleDateInRange
								dropdownPosition="bottom-start"
								dropdownType="popover"
							/>
							<Select
								label="Company Value"
								dropdownPosition="bottom"
								placeholder="Pick one"
								value={value}
								onChange={setValue}
								data={[
									{ value: ":heart: Empathy", label: emoji.emojify(":heart: Empathy") },
									{
										value: ":woman-tipping-hand: Courtesy",
										label: emoji.emojify(":woman-tipping-hand: Courtesy"),
									},
									{ value: ":sunflower: Thriving", label: emoji.emojify(":sunflower: Thriving") },
									{ value: ":hammer: Craftsmanship", label: emoji.emojify(":hammer: Craftsmanship") },
									{
										value: ":man-gesturing-ok: Playfulness",
										label: emoji.emojify(":man-gesturing-ok: Playfulness"),
									},
									{
										value: ":raised_hands: Solidarity",
										label: emoji.emojify(":raised_hands: Solidarity"),
									},
								]}
							/>
							<div className="flex space-x-4">
								<Button
									onClick={() => {
										handleSearch();
										toggle();
									}}
								>
									Search
								</Button>
								<Button
									onClick={() => {
										handleReset();
										toggle();
									}}
									display={
										query.search === "" &&
										query.startDate === "" &&
										query.endDate === "" &&
										query.value === ""
											? "none"
											: "flex"
									}
								>
									Reset Filters
								</Button>
							</div>
						</Paper>
					)}
				</Transition>
			</Container>
		</Header>
	);
};

export default Navbar;
