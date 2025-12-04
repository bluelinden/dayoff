import { DurableObject } from "cloudflare:workers";
import { drizzle, type DrizzleSqliteDODatabase } from 'drizzle-orm/durable-sqlite';

const FCPS_ICAL_URL = "webcal://app.tandem.co/US/VA/Fairfax-County-Public-Schools/?type=export&action=ical&export_type=key_dates&year=2025&page=2";
const FCPS_ALERTS_URL = "https://www.fcps.edu/alert_msg_feed?crawler=dayoff.school&timestamp=";
function generateAlertsUrl() { return (FCPS_ALERTS_URL + ((Date.now() - new Date(new Date().getFullYear(), 0, 1).getTime()) / 1000).toFixed(0)) };
function generateIcalUrl() { return (FCPS_ICAL_URL + ((Date.now() - new Date(new Date().getFullYear(), 0, 1).getTime()) / 1000).toFixed(0)) };


enum SchoolStatus {
	NORMAL = "NORMAL",
	CANCELLED = "CANCELLED",
	EARLY = "EARLY",
	LATE = "LATE",
}

export async function isSchoolCancelledAi(input: string, env: Env): Promise<SchoolStatus | null> {

	const messages = [
		{ role: "system", content: "The user wants to know whether regular public schools are operating as normal today, or whether they have a two-hour delay, early ending, or are cancelled. Respond with either 'NORMAL', 'CANCELLED', 'EARLY', or 'LATE' based on the input message." },
		{
			role: "user",
			content: input,
		},
	];
	const response = await env.AI.run("@hf/nousresearch/hermes-2-pro-mistral-7b", { messages });

	if (!response.response) {
		return null;
	}
	switch (response.response.trim().toUpperCase()) {
		case "NORMAL":
			return SchoolStatus.NORMAL;
		case "CANCELLED":
			return SchoolStatus.CANCELLED;
		case "EARLY":
			return SchoolStatus.EARLY;
		case "LATE":
			return SchoolStatus.LATE;
		default:
			return null;
	}
}

export class DayOffProcessor extends DurableObject {
	storage: DurableObjectStorage;
	db: DrizzleSqliteDODatabase;
	constructor(ctx: DurableObjectState, env: Env) {
		// Required, as we're extending the base class.
		super(ctx, env)
		this.storage = ctx.storage;
		this.db = drizzle(this.storage, { logger: false });
		this.env = env;
	}
};
