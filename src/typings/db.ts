interface IUser {
	id: string;
	email: string;
	nickname: string;
	contact: string;
}

interface ICategory {
	id: number;
	name: string;
}

interface ICounseling {
	id: number;
	title: string;
	category: number;
	problems?: IProblem[];
	solutions?: ISolution[];
	AIAnswer: string;
	createdAt: string;
}

interface IProblem {}

interface ISolution {}
interface IQuestion {
	id: number;
	title: string;
	content: string;
	views: number;
}

export type { IUser, ICategory, ICounseling, IQuestion };
