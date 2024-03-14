import { useUserStore } from "./useUser";
import { useUpdateUserStore } from "./useFirebaseStore";
export const autoUpdateStudyTime = () => {
  const userStore = useUserStore();
  const date = new Date();
  let currentTime = 0;
  const idUser: any = localStorage.getItem("idUser");
  // DATA TimeArray IS DATA WHEN USER RELOAD OF LEAVE WILL BE SAVE HERE!
  const timeArray: any = localStorage.getItem(`currentTimeArray-${idUser}`);
  // IF NEW DAY ,TIMEARRAY WILL RESET (timeArray === NULL) AND CHANGE TO NEW LIST
  let currentTimeArray =
    timeArray != null
      ? JSON.parse(timeArray)
      : {
          timeDay: date.toLocaleDateString("en-US"),
          timeList: [],
        };
  // THIS FUNCTION HELP TO COUNT HOW MANY DAYS BETWEEN 2 DIFFERENT DAYS
  function datediff(first: any, second: any) {
    console.log(Math.round((second - first) / (1000 * 60 * 60 * 24)));
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
  }
  function parseDate(str: any) {
    var mdy = str.split("/");
    return new Date(mdy[2], mdy[0] - 1, mdy[1]);
  }
  // WHHEN USER ACCESS TO WEBSITE, THIS FUNCTION WILL CHECK FOR IF THE DAY SAVED IN LOCALSTORAGE IS DIFFERENT OR NOT
  const whenChangedDay = () => {
    // IF DEFFERENT DAY => AUTO GENERATE PAST STUDYTIME IN LOCALSTORE TO DATABASE
    if (date.toLocaleDateString("en-US") !== currentTimeArray.timeDay) {
      // HOW MANY DAY BETWWEN THE LAST ACCESS TO WEBSITE
      const countDaysBetweenTwoDays = datediff(
        parseDate(currentTimeArray.timeDay),
        parseDate(date.toLocaleDateString("en-US"))
      );
      const initialValue = 0;
      const timeArray: any = localStorage.getItem(`currentTimeArray-${idUser}`);
      // SUM OF THE PAST STUDY TIME (SAVED IN LOCALSTORE)
      const sumTimeOfAllDay = JSON.parse(timeArray).timeList.reduce(
        (accumulator: any, currentValue: any) => accumulator + currentValue,
        initialValue
      );
      // IF USER UNACCESS FOR A LONG TIME
      if (countDaysBetweenTwoDays > 1 && countDaysBetweenTwoDays <= 4) {
        // AND ADD STUDYTIME OF THE ACCESSED DAYS TO THE LIST
        userStore.studyTime.shift();
        userStore.studyTime.push(sumTimeOfAllDay);
        // THESE UNCCESSED DAYS WILL BE REPLACE = 0 STUDYTIME
        for (let i = 1; i < countDaysBetweenTwoDays; i++) {
          userStore.studyTime.shift();
          userStore.studyTime.push(0);
        }
        useUpdateUserStore({
          streak: 0,
          studyTime: userStore.studyTime,
        }, idUser);
      } else if (countDaysBetweenTwoDays > 4) {
        // THESE UNCCESSED DAYS (IF LARGER > 4 DAYS) WILL BE REPLACE = [0, 0, 0, 0, 0] STUDYTIME

        userStore.studyTime = [0, 0, 0, 0, 0];
        useUpdateUserStore({
          streak: 0,
          studyTime: userStore.studyTime,
        }, idUser);
      } else if (countDaysBetweenTwoDays <= 1) {
        // IF YOU HAD LEARNED YESTERDAY AND TODAY YOU ALSO ACCESS
        userStore.studyTime.shift();
        userStore.studyTime.push(sumTimeOfAllDay);
        const streak = userStore.user.streak + 1;
        userStore.user.streak += 1;
        console.log("countDaysBetweenTwoDays = 1", streak);
        useUpdateUserStore({
          studyTime: userStore.studyTime,
          streak: streak,
        }, idUser);
      }
      console.log(userStore.studyTime, "USERSTORE");
      setTimeout(() => {
        // RESET LOCAL STORE WHEN CHANGE THE DAY (NEW DAY)
        localStorage.removeItem(`currentTimeArray-${idUser}`);
        localStorage.setItem(
          `currentTimeArray-${idUser}`,
          JSON.stringify({
            timeDay: date.toLocaleDateString("en-US"),
            timeList: [],
          })
        );
        currentTimeArray = {
          timeDay: date.toLocaleDateString("en-US"),
          timeList: [],
        };
      }, 2000);
    } else {
      console.log("SAME DAY");
    }
  };
  whenChangedDay();
  // COUNT THE TIME WHEN USER IN WEBVIEW
  setInterval(() => {
    currentTime += 1;
  }, 60000);
  // WHENEVER LOAD OR LEAVE THE PAGE => DATA OF STUDY TIME WILL BE SAVE TO LOCAL STORAGE
  window.addEventListener("beforeunload", (e: any) => {
    e.stopImmediatePropagation();
    if (currentTime > 0) {
      currentTimeArray.timeList.push(currentTime);
    }
    localStorage.setItem(
      `currentTimeArray-${idUser}`,
      JSON.stringify(currentTimeArray)
    );
    currentTime = 0;
    return "";
  });
};
