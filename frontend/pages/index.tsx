import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import Navbar from "components/Navbar";
import RecognitionCard from "components/RecognitionCard";
import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import Masonry from "react-masonry-css";
import { APIResponse } from "typings/general";

const RecognitionWall: NextPage = () => {
	const [query, setQuery] = useState({
		search: "",
		startDate: "",
		endDate: "",
		value: "",
	});

	const {
		data: recognitions,
		isLoading,
		isSuccess,
		isError,
		fetchNextPage,
	} = useInfiniteQuery(
		["recognitions", query],
		async ({ pageParam = 1 }) => {
			const res = await fetch(
				`http://localhost:8000/api/recognition?team_id=T01HP7H5HME&page=${pageParam}&limit=20&search=${query.search}&startDate=${query.startDate}&endDate=${query.endDate}&value=${query.value}`,
			);
			const data: APIResponse = await res.json();

			if (!data.success) {
				throw new Error(data.error);
			}

			return data.data.recognitions;
		},
		{
			getNextPageParam: (_, pages) => {
				return pages.length + 1;
			},
		},
	);

	const lastPostRef = useRef<HTMLElement>(null);
	const { ref, entry } = useIntersection({
		root: lastPostRef.current,
		threshold: 1,
	});

	useEffect(() => {
		if (entry?.isIntersecting) fetchNextPage();
	}, [entry]);

	const breakpointColumnsObj = {
		default: 4,
		1100: 3,
		700: 2,
		500: 1,
	};

	return (
		<div>
			<Navbar query={query} setQuery={setQuery} />
			<section className="flex h-screen w-full justify-center p-4 pt-24">
				<div className="max-w-7xl">
					{isLoading && <div className="flex items-center justify-center">Loading...</div>}
					{isSuccess && (
						<Masonry
							breakpointCols={breakpointColumnsObj}
							className="my-masonry-grid"
							columnClassName="my-masonry-grid_column"
						>
							{recognitions.pages.map((page, i) => {
								return page.map((recognition, j) => {
									if (recognitions.pages.length === i + 1 && page.length === j + 1) {
										return (
											<div key={recognition.id} ref={ref}>
												<RecognitionCard recognition={recognition} />
											</div>
										);
									}
									return (
										<div key={recognition.id}>
											<RecognitionCard recognition={recognition} />
										</div>
									);
								});
							})}
						</Masonry>
					)}
					{isError && <div>Error</div>}
				</div>
			</section>
		</div>
	);
};

export default RecognitionWall;
