import { useUserStore } from "./useUser";
import { useUpdateUserStore } from "./useFirebaseStore";
export const autoUpdateStudyTime = () => {
  const userStore = useUserStore();
  const date = new Date();
  // const dataTest = ref([30, 40, 30, 70, 5]);

  let currentTime = 0;
  const timeArray: any = localStorage.getItem("currentTimeArray");
  const currentTimeArray =
    timeArray != null
      ? JSON.parse(timeArray)
      : {
          timeDay: date.toLocaleDateString(),
          timeList: [],
        };
  // setTimeout(() => {
  //   const initialValue = 0;
  //   const sumTimeOfAllDay = currentTimeArray.value?.timeList.reduce(
  //     (accumulator: any, currentValue: any) => accumulator + currentValue,
  //     initialValue
  //   );
  //   userStore.studyTime.shift();
  //   userStore.studyTime.push(sumTimeOfAllDay);
  // }, 2000);
  function datediff(first: any, second: any) {
    console.log(Math.round((second - first) / (1000 * 60 * 60 * 24)));
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
  }
  function parseDate(str: any) {
    var mdy = str.split("/");
    return new Date(mdy[2], mdy[0] - 1, mdy[1]);
  }
  // datediff(parseDate("12/27/2023"), parseDate("1/1/2024"));

  const whenChangedDay = () => {
    if (date.toLocaleDateString() !== currentTimeArray.timeDay) {
      console.log("OTHER DAY");
      setTimeout(() => {
        const initialValue = 0;
        const timeArray: any = localStorage.getItem("currentTimeArray");
        console.log(JSON.parse(timeArray).timeList);
        const sumTimeOfAllDay = JSON.parse(timeArray).timeList.reduce(
          (accumulator: any, currentValue: any) => accumulator + currentValue,
          initialValue
        );
        if (
          datediff(
            parseDate(currentTimeArray.timeDay),
            parseDate(date.toLocaleDateString())
          ) > 1 &&
          datediff(
            parseDate(currentTimeArray.timeDay),
            parseDate(date.toLocaleDateString())
          ) <= 4
        ) {
          for (
            let i = 1;
            i < datediff(parseDate("12/27/2023"), parseDate("1/1/2024"));
            i++
          ) {
            userStore.studyTime.shift();
            userStore.studyTime.push(0);
          }
        } else if (
          datediff(
            parseDate(currentTimeArray.timeDay),
            parseDate(date.toLocaleDateString())
          ) > 4
        ) {
          userStore.studyTime = [0, 0, 0, 0, 0];
        } else if (
          datediff(
            parseDate(currentTimeArray.timeDay),
            parseDate(date.toLocaleDateString())
          ) <= 1
        ) {
          console.log(sumTimeOfAllDay);
          console.log(userStore.studyTime);
          userStore.studyTime.shift();
          userStore.studyTime.push(sumTimeOfAllDay);
        }

        useUpdateUserStore({
          studyTime: userStore.studyTime,
        });
        // RESET LOCAL STORE WHEN CHANGE THE DAY
        console.log(userStore.studyTime, "studyTime");
        localStorage.removeItem("currentTimeArray");
        localStorage.setItem(
          "currentTimeArray",
          JSON.stringify({
            timeDay: date.toLocaleDateString(),
            timeList: [],
          })
        );
        currentTimeArray.value = {
          timeDay: date.toLocaleDateString(),
          timeList: [],
        };
      }, 2000);
    } else {
      console.log("SAME DAY");
    }
  };
  whenChangedDay();
  setInterval(() => {
    currentTime += 1;
    console.log(timeArray);
    console.log(currentTime);

    // console.log(currentTimeArray);
    // localStorage.removeItem("currentTimeArray");
  }, 10000);

  window.addEventListener("beforeunload", (e: any) => {
    e.preventDefault();
    console.log(currentTime, "HAHA");
    currentTimeArray.timeList.push(currentTime);
    // localStorage.removeItem("currentTimeArray");

    localStorage.setItem("currentTimeArray", JSON.stringify(currentTimeArray));
    console.log(currentTimeArray, "currentTimeArray");
    currentTime = 0;
  });
};
