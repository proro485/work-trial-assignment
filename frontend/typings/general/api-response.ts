export type Recognition = {
	id: number;
	team_id: string;
	team_name: string;
	giver_id: string;
	receiver_id: string[];
	message: string;
	value?: string;
	claps: number;
	img?: string;
	channel_id?: string;
	slack_ts?: string;
	public: boolean;
	date_posted?: string;
	total_claps: number;
	anonymous: boolean;
	giver_alias: string;
	approved?: ["pending", "true", "false"];
	ai_answer?: string;
	moderator_id?: string;
	receiver_names: string[];
	claps_display?: string;
	user_group_id?: number;
};

export type APIResponse<Data = { recognitions: Recognition[] }> =
	| {
			success: true;
			message?: string;
			data: Data;
			code: number;
	  }
	| {
			success: false;
			error: string;
			type?: string;
			code: number;
			data?: unknown;
	  };

export type APIFailureResponse = Extract<APIResponse, { success: false }>;

export type AsyncAPIResponse<Data = void> = Promise<APIResponse<Data>>;
