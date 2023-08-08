import { Card, Text } from "@mantine/core";
import Image from "next/image";
import * as emoji from "node-emoji";
import { Recognition } from "typings/general";

interface RecognitionCardProps {
	recognition: Recognition;
}

const RecognitionCard = ({ recognition }: RecognitionCardProps) => {
	const { img, message, value, claps_display, receiver_names, date_posted, team_name, giver_alias } = recognition;

	return (
		<Card shadow="sm" className="w-full rounded-md bg-gray-200">
			{img && (
				<div className="relative h-60 w-full">
					<Image src={img} objectFit="cover" layout="fill" />
				</div>
			)}
			<div className="p-2">
				<Text size="sm" weight={700}>
					Receivers:
				</Text>
				<Text size="sm" className="mb-3">
					{receiver_names.join(", ")}
				</Text>
				<Text size="sm" weight={700}>
					Message:
				</Text>
				<Text size="sm" className="mb-3">
					{message}
				</Text>
				<Text size="sm" weight={700}>
					Given by:
				</Text>
				<Text size="sm" className="mb-3">
					{giver_alias}
				</Text>
				<Text size="sm" weight={700}>
					Team Name:
				</Text>
				<Text size="sm" className="mb-3">
					{team_name}
				</Text>
				{value && (
					<>
						<Text size="sm" weight={700}>
							Value:
						</Text>
						<Text size="sm" className="mb-2">
							{emoji.emojify(value)}
						</Text>
					</>
				)}
				{claps_display && (
					<>
						<Text size="sm" weight={700}>
							Claps:
						</Text>
						<Text size="sm" className="mb-3">
							{emoji.emojify(claps_display)}
						</Text>
					</>
				)}
				<Text size="sm" weight={700}>
					Posted on:
				</Text>
				<Text size="sm">{new Date(date_posted || Date.now()).toLocaleString()}</Text>
			</div>
		</Card>
	);
};

export default RecognitionCard;
