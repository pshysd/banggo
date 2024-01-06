interface IUser {
	id: number;
	email: string;
	nickname: string;
	contact: string;
}

interface ICounseling {
	id: number;
	title: string;
	category: number;
	description: string;
	AIAnswer: string;
	createdAt: Date;
}

export type { IUser, ICounseling };
