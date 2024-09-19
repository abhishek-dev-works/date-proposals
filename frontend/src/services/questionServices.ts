import axios, { AxiosRequestConfig } from "axios";


const apiConfig: AxiosRequestConfig = {
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
    headers: {
      Accept: 'Application/json',
      'Content-Type': 'Application/json',
    },
};
const baseAxiosInstance = axios.create(apiConfig);

const baseApiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const addNewQuestion = async (name: string, question: string) => {
    try {
        const response = await baseAxiosInstance.post(`${baseApiUrl}/api/question/create`, { question, name });
        return response.data.data;
    } catch (error) {
        console.error('There was an error creating the question!', error);
        return null;
    }
}

export const addNewAnswer = async (id: string, answer: boolean, hoverOnNo: number) => {
    try {
        const response = await baseAxiosInstance.post(`${baseApiUrl}/api/question/submit`, { id, answer, hoverOnNo });
        return response.data.data;
    } catch (error) {
        console.error('There was an error creating the answer!', error);
        return null;
    }
}

export const getAnswer = async (id: string) => {
    try {
        const response = await baseAxiosInstance.get(`${baseApiUrl}/api/question/${id}`);
        return response.data.data;
    } catch (error) {
        console.error('There was an error fetching the answer!', error);
        return null;
    }
}