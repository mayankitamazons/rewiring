import APIBaseURL from "../Environment.js/Environment";

const API_URL = {
  //LOGIN
  LOGIN_WITH_EMAIL: APIBaseURL + "/auth/login",

  //USER
  ALL_USERS: APIBaseURL + "/user/all?",
  GET_USER_BY_ID: APIBaseURL + "/user",
  ADD_USER: APIBaseURL + "/auth/signup",
  UPDATE_USER: APIBaseURL + "/user",

  //QUESTION
  QUESTIONS_LIST_WITH_FILTER: APIBaseURL + "/question/list?",
  MULTI_CHOICE_QUESTION_CREATE: APIBaseURL + "/question",
  GET_QUESTOINS_BY_ID: APIBaseURL + "/question",

  //Challenges
  LIST_CHALLENGES: APIBaseURL + "/challenge/list",
  GET_CHALLENGE_BY_ID: APIBaseURL + "/challenge",
  ADD_CHALLENGE: APIBaseURL + "/challenge/",
  UPDATE_CHALLENGE_BY_ID: APIBaseURL + "/challenge/",

  //Problem filter
  Problem_filter: APIBaseURL + "/problem/problemlist",

  //COMMON DELETE API
  common_delete_operation: APIBaseURL + "/delete",

  //SOUND
  Sound_Listing: APIBaseURL + "/sound/soundlist",
  GET_SOUND_BY_ID: APIBaseURL + "/sound",
  Add_Sound: APIBaseURL + "/sound/",
  Sound_UPDATE_BY_ID: APIBaseURL + "/sound/",

  //FILE UPLOAD
  Multi_file_upload: APIBaseURL + "/upload",

  //COMMON DOCUMENT COUNT
  COMMON_DOCUMENT_COUNT: APIBaseURL + "/",

  //COMMUNITY
  COMMUNITY_LIST: APIBaseURL + "/community?",
  COMMUNITY_ADD: APIBaseURL + "/community/",
  COMMUNITY_UPDATE: APIBaseURL + "/community/",

  //PAGES/CONTENT
  GET_ALL_PAGES: APIBaseURL + "/page?",
  ADD_PAGE: APIBaseURL + "/page",
  UPDATA_PAGE: APIBaseURL + "/page/",

  //FAQ/HELP
  ADD_HELP: APIBaseURL + "/faq",
  GET_API_HELP: APIBaseURL + "/faq",
  UPDATE_HELP: APIBaseURL + "/faq/",

  //MEDITATION
ADD_MEDITATION: APIBaseURL + '/meditation',
MEDITATION_FILTER: APIBaseURL + '/problem/problemlist',
GET_MEDITATION_BY_ID: APIBaseURL + '/problem',
UPDATE_MEDITATION: APIBaseURL + '/problem',

};



export default API_URL;
