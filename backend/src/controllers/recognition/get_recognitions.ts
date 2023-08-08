import { recognitions } from "@prisma/client";
import prisma from "prisma_client";
import { Controller } from "typings/express";

type RequestParams = {};
type RequestBody = {};
type RequestQuery = {
	team_id: string;
	search: string;
	startDate: string;
	endDate: string;
	value: string;
	page: string;
	limit: string;
};
type ResponseData = {
	recognitions: recognitions[];
};

export const get_recognitions: Controller<RequestParams, ResponseData, RequestBody, RequestQuery> = async (
	req,
	res
) => {
	try {
		const team_id = req.query.team_id;
		const page = parseInt(req.query.page);
		const limit = parseInt(req.query.limit);
		const skip = (page - 1) * limit;
		const search = req.query.search;
		const startDate = parseInt(req.query.startDate);
		const endDate = parseInt(req.query.endDate);
		const value = req.query.value;

		const where: any = {
			team_id,
		};

		if (search) {
			where.OR = [
				{ giver_alias: { contains: search, mode: "insensitive" } },
				{ message: { contains: search, mode: "insensitive" } },
				{ receiver_names: { has: search } },
			];
		}

		if (value) {
			where.value = { equals: value };
		}

		if (startDate) {
			where.date_posted = {
				gte: new Date(startDate),
			};
		}

		if (endDate) {
			where.date_posted = {
				...where.date_posted,
				lte: new Date(endDate),
			};
		}

		const recognitions = await prisma.recognitions.findMany({
			where,
			skip,
			take: limit,
		});

		res.status(200).json({
			success: true,
			code: 200,
			data: {
				recognitions,
			},
		});
	} catch (err) {
		console.log("ERROR IN GET RECOGNITIONS");
		console.log({ err });
		res.status(500).json({
			success: false,
			code: 500,
			error: "Internal Server Error",
		});
	}
};
