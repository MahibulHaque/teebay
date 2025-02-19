import { prisma } from '../lib/prisma';

interface ICreateUser {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	address: string;
	phone: string;
}

export const createNewUser = async ({
	email,
	password,
	firstName,
	lastName,
	address,
	phone,
}: ICreateUser) => {
	return prisma.user.create({
		data: {
			email,
			password,
			firstName,
			lastName,
			address,
			phone,
		},
	});
};

export const findUserWithEmail = async (email: string) => {
	return prisma.user.findUnique({
		where: {
			email: email,
		},
	});
};


export const findUserWithId = async(userId:string)=>{
    return prisma.user.findUnique({
        where:{
            id:userId
        }
    })
}