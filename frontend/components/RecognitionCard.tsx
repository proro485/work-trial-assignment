import { Card, Image, Mark, Text } from "@mantine/core";
import * as emoji from "node-emoji";
import React from "react";
import { Recognition } from "typings/general";

interface RecognitionCardProps {
	recognition: Recognition;
}

const RecognitionCard = ({ recognition }: RecognitionCardProps) => {
	const { img, message, value, claps_display, receiver_names, date_posted, giver_alias } = recognition;

	const date = new Date(date_posted || Date.now());
	const formattedDate = `${date.toLocaleTimeString("en-US", {
		hour: "numeric",
		minute: "2-digit",
	})} · ${date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;

	const colors = ["#FDE68A", "#FAD0C3", "#C7CEEA", "#C6F6D5", "#F9D5E5", "#FED7B7"];

	const formattedReceiverNames = receiver_names.map((name, index) => (
		<React.Fragment key={name}>
			{index > 0 && index < receiver_names.length - 1 ? ", " : ""}
			{index === receiver_names.length - 1 && receiver_names.length > 1 ? (
				<Text size="sm" display="inline">
					{" and "}
				</Text>
			) : (
				""
			)}
			<Mark
				style={{ backgroundColor: colors[index % colors.length] }}
				sx={(theme) => ({
					color: theme.colors.blue[8],
				})}
				className="whitespace-nowrap text-sm font-medium"
			>
				@{name}
			</Mark>
		</React.Fragment>
	));

	return (
		<Card shadow="md" withBorder p="lg" className="space-y-3 rounded-xl" radius="md">
			{img && (
				<Card.Section className="pb-1">
					<Image src={img} />
				</Card.Section>
			)}
			<div>
				{formattedReceiverNames}
				<Text size="sm" display="inline">
					{` have been recognized for `}
				</Text>
				<Text size="sm" display="inline" className="whitespace-nowrap font-semibold">
					{value && emoji.emojify(value)}
				</Text>
				<Text size="sm" display="inline">
					{` by ${giver_alias}`}
				</Text>
			</div>
			<Text size="sm" className="border-l-4 border-zinc-200 pl-2">
				{message}
			</Text>
			{claps_display && (
				<Text
					size="sm"
					className="italic"
					sx={(theme) => ({
						color: theme.colors.gray[8],
					})}
				>
					{emoji.emojify(claps_display)}
				</Text>
			)}
			<Text size="sm">{formattedDate}</Text>
		</Card>
	);
};

export default RecognitionCard;
