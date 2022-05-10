import { getAllProjects, getCommentEngagementByContent, getCommentsGroupedByQuestionReport } from '../services/strateegia-api';
const users = JSON.parse(localStorage.getItem("users") || '');


export {users}